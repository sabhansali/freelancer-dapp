const FreelancerMockToken = artifacts.require("FreelancerMockToken");
const FreelancerDEXFactory = artifacts.require("FreelancerDEXFactory");
const FreelancerDEXRouter = artifacts.require("FreelancerDEXRouter");
const FreelancerLiquidityPair = artifacts.require("FreelancerLiquidityPair");
const FreelancerLPFarm = artifacts.require("FreelancerLPFarm");

contract("Freelancer DEX Integration", (accounts) => {
  const [owner, alice] = accounts;
  const GAS = 500000;

  const toWei = (amount) =>
    web3.utils.toWei(amount.toString(), "ether");

  const deadline = () => Math.floor(Date.now() / 1000) + 3600;

  async function expectRevert(promise, reason) {
    let error;

    try {
      await promise;
    } catch (e) {
      error = e;
    }

    assert(error, "Expected transaction to revert");
    assert(
      error.message.includes(reason),
      `Expected "${reason}", received "${error.message}"`
    );
  }

  async function increaseTime(seconds) {
    await new Promise((resolve, reject) => {
      web3.currentProvider.send(
        {
          jsonrpc: "2.0",
          method: "evm_increaseTime",
          params: [seconds],
          id: Date.now(),
        },
        (error) => (error ? reject(error) : resolve())
      );
    });

    await new Promise((resolve, reject) => {
      web3.currentProvider.send(
        {
          jsonrpc: "2.0",
          method: "evm_mine",
          params: [],
          id: Date.now() + 1,
        },
        (error) => (error ? reject(error) : resolve())
      );
    });
  }

  let tokenA;
  let tokenB;
  let factory;
  let router;
  let pair;
  let farm;

  async function addInitialLiquidity() {
    await tokenA.approve(router.address, toWei(1000), {
      from: owner,
    });

    await tokenB.approve(router.address, toWei(1000), {
      from: owner,
    });

    await router.addLiquidity(
      tokenA.address,
      tokenB.address,
      toWei(1000),
      toWei(1000),
      "0",
      "0",
      owner,
      deadline(),
      { from: owner }
    );

    const pairAddress = await factory.getPair(
      tokenA.address,
      tokenB.address
    );

    pair = await FreelancerLiquidityPair.at(pairAddress);
  }

  beforeEach(async () => {
    tokenA = await FreelancerMockToken.new(
      "Freelancer Token A",
      "FTA",
      { from: owner }
    );

    tokenB = await FreelancerMockToken.new(
      "Freelancer Token B",
      "FTB",
      { from: owner }
    );

    factory = await FreelancerDEXFactory.new({ from: owner });

    router = await FreelancerDEXRouter.new(factory.address, {
      from: owner,
    });

    await tokenA.mint(owner, toWei(100000), { from: owner });
    await tokenB.mint(owner, toWei(100000), { from: owner });
    await tokenA.mint(alice, toWei(100), { from: owner });
    await tokenB.mint(alice, toWei(100), { from: owner });

    await factory.createPair(tokenA.address, tokenB.address, {
      from: owner,
    });

    const pairAddress = await factory.getPair(
      tokenA.address,
      tokenB.address
    );

    pair = await FreelancerLiquidityPair.at(pairAddress);

    // The farm must use the pair's LP token.
    farm = await FreelancerLPFarm.new(
      pairAddress,
      tokenB.address,
      "0",
      { from: owner, gas: 3000000 }
    );
  });

  it("creates a pair and adds initial liquidity", async () => {
    await addInitialLiquidity();

    assert.notEqual(
      pair.address,
      "0x0000000000000000000000000000000000000000"
    );

    const reserves = await pair.getReserves();

    assert.equal(reserves[0].toString(), toWei(1000));
    assert.equal(reserves[1].toString(), toWei(1000));

    assert(
      new web3.utils.BN(
        (await pair.balanceOf(owner)).toString()
      ).gt(new web3.utils.BN("0")),
      "Owner should receive LP tokens"
    );
  });

  it("executes a swap and enforces minimum output", async () => {
    await addInitialLiquidity();

    const path = [tokenA.address, tokenB.address];
    const amountIn = toWei(10);

    const quotedAmounts = await router.getAmountsOut(amountIn, path);
    const quotedOutput = new web3.utils.BN(
      quotedAmounts[1].toString()
    );

    await tokenA.approve(router.address, amountIn, { from: alice });

    const excessiveMinimum = quotedOutput.add(new web3.utils.BN("1"));

    await expectRevert(
      router.swapExactTokensForTokens(
        amountIn,
        excessiveMinimum.toString(),
        path,
        alice,
        deadline(),
        { from: alice }
      ),
      "INSUFFICIENT_OUTPUT_AMOUNT"
    );

    const balanceBefore = new web3.utils.BN(
      (await tokenB.balanceOf(alice)).toString()
    );

    await router.swapExactTokensForTokens(
      amountIn,
      quotedOutput.toString(),
      path,
      alice,
      deadline(),
      { from: alice }
    );

    const balanceAfter = new web3.utils.BN(
      (await tokenB.balanceOf(alice)).toString()
    );

    assert(
      balanceAfter.gt(balanceBefore),
      "Alice should receive Token B"
    );

    assert.equal(
      (await tokenA.balanceOf(alice)).toString(),
      toWei(90)
    );
  });

  it("removes liquidity and returns both tokens", async () => {
    await addInitialLiquidity();

    const liquidity = toWei(100);

    await pair.approve(router.address, liquidity, {
      from: owner,
    });

    const tokenABefore = new web3.utils.BN(
      (await tokenA.balanceOf(owner)).toString()
    );

    const tokenBBefore = new web3.utils.BN(
      (await tokenB.balanceOf(owner)).toString()
    );

    await router.removeLiquidity(
      tokenA.address,
      tokenB.address,
      liquidity,
      "0",
      "0",
      owner,
      deadline(),
      { from: owner }
    );

    const tokenAAfter = new web3.utils.BN(
      (await tokenA.balanceOf(owner)).toString()
    );

    const tokenBAfter = new web3.utils.BN(
      (await tokenB.balanceOf(owner)).toString()
    );

    assert(tokenAAfter.gt(tokenABefore), "Token A should be returned");
    assert(tokenBAfter.gt(tokenBBefore), "Token B should be returned");

    const expectedRemainingLP = new web3.utils.BN(toWei(900)).sub(
      new web3.utils.BN("1000")
    );

    assert.equal(
      (await pair.balanceOf(owner)).toString(),
      expectedRemainingLP.toString()
    );
  });

  it("stakes LP tokens, earns rewards, and claims them", async () => {
    await addInitialLiquidity();

    await tokenB.approve(farm.address, toWei(1000), {
      from: owner,
      gas: GAS,
    });

    await farm.fundRewardPeriod(toWei(1000), 100, {
      from: owner,
      gas: GAS,
    });

    const stakeAmount = toWei(100);

    await pair.approve(farm.address, stakeAmount, {
      from: owner,
      gas: GAS,
    });

    await farm.stake(stakeAmount, {
      from: owner,
      gas: GAS,
    });

    assert.equal(
      (await farm.stakedBalance(owner)).toString(),
      stakeAmount
    );

    await increaseTime(5);

    const earned = new web3.utils.BN(
      (await farm.earned(owner)).toString()
    );

    assert(
      earned.gt(new web3.utils.BN("0")),
      "Rewards should accrue over time"
    );

    const rewardBefore = new web3.utils.BN(
      (await tokenB.balanceOf(owner)).toString()
    );

    await farm.claimReward({
      from: owner,
      gas: GAS,
    });

    const rewardAfter = new web3.utils.BN(
      (await tokenB.balanceOf(owner)).toString()
    );

    assert(
      rewardAfter.gt(rewardBefore),
      "Owner should receive reward tokens"
    );

    assert.equal((await farm.rewards(owner)).toString(), "0");

    await farm.withdraw(stakeAmount, {
      from: owner,
      gas: GAS,
    });

    assert.equal((await farm.stakedBalance(owner)).toString(), "0");
    assert.equal((await farm.totalStaked()).toString(), "0");

    // Withdrawing returns the staked LP tokens to the owner.
    const expectedFinalLP = new web3.utils.BN(toWei(1000)).sub(
      new web3.utils.BN("1000")
    );

    assert.equal(
      (await pair.balanceOf(owner)).toString(),
      expectedFinalLP.toString()
    );
  });
});