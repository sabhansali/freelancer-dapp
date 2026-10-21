
const FreelancerMockToken = artifacts.require("FreelancerMockToken");
const FreelancerDEXFactory = artifacts.require("FreelancerDEXFactory");
const FreelancerDEXRouter = artifacts.require("FreelancerDEXRouter");
const FreelancerLiquidityPair = artifacts.require("FreelancerLiquidityPair");

contract("FreelancerDEXRouter", (accounts) => {
  const [owner, trader, recipient] = accounts;
  const tokens = (n) => web3.utils.toWei(n, "ether");

  let tokenA;
  let tokenB;
  let tokenC;
  let factory;
  let router;

  beforeEach(async () => {
    tokenA = await FreelancerMockToken.new("Token A", "TKA");
    tokenB = await FreelancerMockToken.new("Token B", "TKB");
    tokenC = await FreelancerMockToken.new("Token C", "TKC");

    factory = await FreelancerDEXFactory.new();
    router = await FreelancerDEXRouter.new(factory.address);

    for (const token of [tokenA, tokenB, tokenC]) {
      await token.mint(owner, tokens("10000"));
      await token.mint(trader, tokens("1000"));
      await token.approve(router.address, tokens("10000"), {
        from: owner,
      });
      await token.approve(router.address, tokens("1000"), {
        from: trader,
      });
    }
  });

  async function deadlineAfter(seconds = 3600) {
    const block = await web3.eth.getBlock("latest");
    return Number(block.timestamp) + seconds;
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

  async function addPool(tokenX, tokenY, amountX, amountY) {
    await router.addLiquidity(
      tokenX.address,
      tokenY.address,
      tokens(amountX),
      tokens(amountY),
      0,
      0,
      owner,
      await deadlineAfter(),
      { from: owner }
    );

    const pairAddress = await factory.getPair(
      tokenX.address,
      tokenY.address
    );

    return FreelancerLiquidityPair.at(pairAddress);
  }

  it("adds liquidity and creates a pair automatically", async () => {
    const result = await router.addLiquidity(
      tokenA.address,
      tokenB.address,
      tokens("1000"),
      tokens("2000"),
      tokens("1000"),
      tokens("2000"),
      owner,
      await deadlineAfter(),
      { from: owner }
    );

    const pairAddress = await factory.getPair(
      tokenA.address,
      tokenB.address
    );

    assert.notEqual(
      pairAddress,
      "0x0000000000000000000000000000000000000000"
    );

    assert.equal((await factory.allPairsLength()).toString(), "1");

    const pair = await FreelancerLiquidityPair.at(pairAddress);
    assert(
      BigInt(await pair.balanceOf(owner)) > 0n,
      "Provider should receive LP tokens"
    );

    assert(result.logs.some((log) => log.event === "Transfer") ||
      BigInt(await pair.balanceOf(owner)) > 0n);
  });

  it("swaps tokens and respects the minimum output", async () => {
    await addPool(tokenA, tokenB, "1000", "2000");

    const path = [tokenA.address, tokenB.address];
    const amounts = await router.getAmountsOut(tokens("100"), path);

    assert(
      BigInt(amounts[1].toString()) > 0n,
      "Expected output should be positive"
    );

    const before = BigInt(await tokenB.balanceOf(trader));

    await router.swapExactTokensForTokens(
      tokens("100"),
      amounts[1].toString(),
      path,
      trader,
      await deadlineAfter(),
      { from: trader }
    );

    const after = BigInt(await tokenB.balanceOf(trader));

    assert.equal(
      (after - before).toString(),
      amounts[1].toString()
    );

    await expectRevert(
      router.swapExactTokensForTokens(
        tokens("10"),
        tokens("10000"),
        path,
        trader,
        await deadlineAfter(),
        { from: trader }
      ),
      "INSUFFICIENT_OUTPUT_AMOUNT"
    );
  });

  it("removes liquidity and returns both tokens", async () => {
    const pair = await addPool(tokenA, tokenB, "1000", "2000");

    const lpBalance = BigInt(await pair.balanceOf(owner));
    const liquidity = lpBalance / 2n;

    await pair.approve(router.address, liquidity.toString(), {
      from: owner,
    });

    const beforeA = BigInt(await tokenA.balanceOf(owner));
    const beforeB = BigInt(await tokenB.balanceOf(owner));

    await router.removeLiquidity(
      tokenA.address,
      tokenB.address,
      liquidity.toString(),
      1,
      1,
      owner,
      await deadlineAfter(),
      { from: owner }
    );

    assert(BigInt(await tokenA.balanceOf(owner)) > beforeA);
    assert(BigInt(await tokenB.balanceOf(owner)) > beforeB);
  });

  it("rejects transactions after the deadline", async () => {
    await expectRevert(
      router.addLiquidity(
        tokenA.address,
        tokenB.address,
        tokens("10"),
        tokens("20"),
        0,
        0,
        owner,
        1,
        { from: owner }
      ),
      "EXPIRED"
    );
  });

  it("executes a multi-hop Token A to Token B to Token C swap", async () => {
    await addPool(tokenA, tokenB, "1000", "2000");
    await addPool(tokenB, tokenC, "4000", "500");

    const path = [
      tokenA.address,
      tokenB.address,
      tokenC.address,
    ];

    const amounts = await router.getAmountsOut(tokens("100"), path);
    assert.equal(amounts.length, 3);
    assert(BigInt(amounts[2].toString()) > 0n);

    const beforeC = BigInt(await tokenC.balanceOf(trader));

    await router.swapExactTokensForTokens(
      tokens("100"),
      amounts[2].toString(),
      path,
      trader,
      await deadlineAfter(),
      { from: trader }
    );

    const afterC = BigInt(await tokenC.balanceOf(trader));

    assert.equal(
      (afterC - beforeC).toString(),
      amounts[2].toString()
    );
  });
});
