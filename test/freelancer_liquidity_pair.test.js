
const FreelancerMockToken = artifacts.require("FreelancerMockToken");
const FreelancerLiquidityPair = artifacts.require("FreelancerLiquidityPair");

contract("FreelancerLiquidityPair", (accounts) => {
  const [provider, trader, recipient] = accounts;
  const tokens = (n) => web3.utils.toWei(n, "ether");

  let tokenA;
  let tokenB;
  let pair;

  beforeEach(async () => {
    tokenA = await FreelancerMockToken.new("Token A", "TKA");
    tokenB = await FreelancerMockToken.new("Token B", "TKB");
    pair = await FreelancerLiquidityPair.new();

    const ordered = [tokenA.address, tokenB.address].sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );

    await pair.initialize(ordered[0], ordered[1]);

    await tokenA.mint(provider, tokens("10000"));
    await tokenB.mint(provider, tokens("20000"));
    await tokenA.mint(trader, tokens("1000"));
    await tokenB.mint(trader, tokens("1000"));
  });

  async function addInitialLiquidity(amountA, amountB) {
    await tokenA.transfer(pair.address, tokens(amountA), {
      from: provider,
    });
    await tokenB.transfer(pair.address, tokens(amountB), {
      from: provider,
    });
    await pair.mint(provider, { from: provider });
  }

  async function expectRevert(promise, reason) {
    try {
      await promise;
      assert.fail(`Expected transaction to revert: ${reason}`);
    } catch (error) {
      assert(
        error.message.includes(reason),
        `Expected "${reason}", got: ${error.message}`
      );
    }
  }

  it("mints LP tokens and locks minimum liquidity", async () => {
    await addInitialLiquidity("1000", "4000");

    assert.equal(
      (await pair.balanceOf(provider)).toString(),
      "1999999999999999999000"
    );

    assert.equal(
      (await pair.balanceOf(
        "0x000000000000000000000000000000000000dEaD"
      )).toString(),
      "1000"
    );

    const reserves = await pair.getReserves();

    const expectedReserve0 =
      tokenA.address.toLowerCase() < tokenB.address.toLowerCase()
        ? tokens("1000")
        : tokens("4000");

    const expectedReserve1 =
      tokenA.address.toLowerCase() < tokenB.address.toLowerCase()
        ? tokens("4000")
        : tokens("1000");

    assert.equal(reserves[0].toString(), expectedReserve0);
    assert.equal(reserves[1].toString(), expectedReserve1);
  });

  it("rejects swaps without input", async () => {
    await addInitialLiquidity("1000", "2000");

    await expectRevert(
      pair.swap(0, tokens("10"), trader, { from: trader }),
      "INSUFFICIENT_INPUT_AMOUNT"
    );
  });

  it("executes a swap with the 0.3% fee", async () => {
    await addInitialLiquidity("1000", "2000");

    const token0Address = (await pair.token0()).toLowerCase();
    const inputTokenIs0 =
      tokenA.address.toLowerCase() === token0Address;

    // Always sell Token A and receive Token B.
    const inputToken = tokenA;
    const outputToken = tokenB;

    const reserveIn = BigInt(
      inputTokenIs0 ? tokens("1000") : tokens("2000")
    );

    const reserveOut = BigInt(
      inputTokenIs0 ? tokens("2000") : tokens("1000")
    );

    const amountIn = BigInt(tokens("100"));
    const amountInWithFee = amountIn * 997n;

    const amountOut =
      (amountInWithFee * reserveOut) /
      (reserveIn * 1000n + amountInWithFee);

    const balanceBefore = BigInt(
      await outputToken.balanceOf(trader)
    );

    await inputToken.transfer(pair.address, amountIn.toString(), {
      from: trader,
    });

    // The pair expects outputs in token0/token1 order.
    const amount0Out = inputTokenIs0 ? "0" : amountOut.toString();
    const amount1Out = inputTokenIs0 ? amountOut.toString() : "0";

    await pair.swap(amount0Out, amount1Out, trader, {
      from: trader,
    });

    const balanceAfter = BigInt(
      await outputToken.balanceOf(trader)
    );

    assert.equal(
      (balanceAfter - balanceBefore).toString(),
      amountOut.toString(),
      "Trader should receive the expected Token B output"
    );
  });

  it("returns proportional tokens when LP tokens are burned", async () => {
    await addInitialLiquidity("1000", "2000");

    const lpBalance = BigInt(await pair.balanceOf(provider));
    const liquidityToBurn = lpBalance / 2n;

    await pair.transfer(pair.address, liquidityToBurn.toString(), {
      from: provider,
    });

    const beforeA = BigInt(await tokenA.balanceOf(recipient));
    const beforeB = BigInt(await tokenB.balanceOf(recipient));

    await pair.burn(recipient, { from: provider });

    const afterA = BigInt(await tokenA.balanceOf(recipient));
    const afterB = BigInt(await tokenB.balanceOf(recipient));

    assert(afterA > beforeA, "Recipient should receive Token A");
    assert(afterB > beforeB, "Recipient should receive Token B");
  });
});
