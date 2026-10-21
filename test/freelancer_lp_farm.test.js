const FreelancerMockToken = artifacts.require("FreelancerMockToken");
const FreelancerLPFarm = artifacts.require("FreelancerLPFarm");

contract("FreelancerLPFarm", (accounts) => {
  const [owner, alice, bob, nonOwner] = accounts;

  const tokens = (amount) => web3.utils.toWei(amount.toString(), "ether");

  async function expectRevert(promise, reason) {
    try {
      await promise;
      assert.fail(`Expected revert containing: ${reason}`);
    } catch (error) {
      assert(
        error.message.includes(reason),
        `Expected "${reason}", received "${error.message}"`
      );
    }
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

  let lpToken;
  let rewardToken;
  let farm;

  beforeEach(async () => {
    lpToken = await FreelancerMockToken.new("LP Token", "FLP", {
      from: owner,
    });

    rewardToken = await FreelancerMockToken.new("Reward Token", "RWD", {
      from: owner,
    });

    farm = await FreelancerLPFarm.new(
      lpToken.address,
      rewardToken.address,
      "0",
      { from: owner }
    );

    await lpToken.mint(alice, tokens(1000), { from: owner });
    await lpToken.mint(bob, tokens(1000), { from: owner });
    await rewardToken.mint(owner, tokens(10000), { from: owner });
  });

  it("deploys with the correct token addresses", async () => {
    assert.equal(await farm.lpToken(), lpToken.address);
    assert.equal(await farm.rewardToken(), rewardToken.address);
    assert.equal((await farm.totalStaked()).toString(), "0");
  });

  it("rejects zero-address and identical-token deployments", async () => {
    await expectRevert(
      FreelancerLPFarm.new(
        "0x0000000000000000000000000000000000000000",
        rewardToken.address,
        "0",
        { from: owner }
      ),
      "ZERO_LP_TOKEN"
    );

    await expectRevert(
      FreelancerLPFarm.new(
        lpToken.address,
        lpToken.address,
        "0",
        { from: owner }
      ),
      "IDENTICAL_TOKENS"
    );
  });

  it("allows a user to stake LP tokens", async () => {
    await lpToken.approve(farm.address, tokens(100), { from: alice });
    const result = await farm.stake(tokens(100), { from: alice });

    assert.equal(
      (await farm.stakedBalance(alice)).toString(),
      tokens(100)
    );
    assert.equal((await farm.totalStaked()).toString(), tokens(100));
    assert.equal(
      (await lpToken.balanceOf(farm.address)).toString(),
      tokens(100)
    );

    assert.equal(result.logs[0].event, "Staked");
  });

  it("rejects zero stakes and withdrawals", async () => {
    await expectRevert(farm.stake("0", { from: alice }), "ZERO_STAKE");
    await expectRevert(farm.withdraw("0", { from: alice }), "ZERO_WITHDRAWAL");
  });

  it("prevents users from withdrawing more than their stake", async () => {
    await lpToken.approve(farm.address, tokens(50), { from: alice });
    await farm.stake(tokens(50), { from: alice });

    await expectRevert(
      farm.withdraw(tokens(51), { from: alice }),
      "INSUFFICIENT_STAKE"
    );
  });

  it("returns LP tokens when a user withdraws", async () => {
    await lpToken.approve(farm.address, tokens(100), { from: alice });
    await farm.stake(tokens(100), { from: alice });

    await farm.withdraw(tokens(40), { from: alice });

    assert.equal(
      (await farm.stakedBalance(alice)).toString(),
      tokens(60)
    );
    assert.equal((await farm.totalStaked()).toString(), tokens(60));
    assert.equal(
      (await lpToken.balanceOf(alice)).toString(),
      tokens(940)
    );
  });

  it("funds a reward period for the owner", async () => {
    await rewardToken.approve(farm.address, tokens(1000), { from: owner });

    const result = await farm.fundRewardPeriod(tokens(1000), 100, {
      from: owner,
    });

    assert.equal(
      (await rewardToken.balanceOf(farm.address)).toString(),
      tokens(1000)
    );
    assert.equal((await farm.rewardRate()).toString(), tokens(10));
    assert.equal(result.logs[0].event, "RewardPeriodFunded");
  });

  it("prevents non-owners from funding rewards", async () => {
    await rewardToken.approve(farm.address, tokens(1000), { from: owner });

    await expectRevert(
      farm.fundRewardPeriod(tokens(1000), 100, { from: nonOwner }),
      "Ownable: caller is not the owner"
    );
  });

  it("rejects zero reward funding and zero duration", async () => {
    await rewardToken.approve(farm.address, tokens(1000), { from: owner });

    await expectRevert(
      farm.fundRewardPeriod("0", 100, { from: owner }),
      "ZERO_FUNDING"
    );

    await expectRevert(
      farm.fundRewardPeriod(tokens(100), 0, { from: owner }),
      "ZERO_DURATION"
    );
  });

  it("accrues and pays rewards to stakers", async () => {
    await rewardToken.approve(farm.address, tokens(1000), { from: owner });
    await farm.fundRewardPeriod(tokens(1000), 100, { from: owner });

    await lpToken.approve(farm.address, tokens(100), { from: alice });
    await farm.stake(tokens(100), { from: alice });

    await increaseTime(10);

    const earned = await farm.earned(alice);
    assert(
      new web3.utils.BN(earned.toString()).gt(new web3.utils.BN("0")),
      "Expected accrued rewards to be positive"
    );

    const balanceBefore = new web3.utils.BN(
      (await rewardToken.balanceOf(alice)).toString()
    );

    const result = await farm.claimReward({ from: alice });

    const balanceAfter = new web3.utils.BN(
      (await rewardToken.balanceOf(alice)).toString()
    );

    assert(balanceAfter.gt(balanceBefore), "Reward balance should increase");
    assert.equal((await farm.rewards(alice)).toString(), "0");
    assert.equal(result.logs[0].event, "RewardClaimed");
  });

  it("rejects claims when no rewards are available", async () => {
    await expectRevert(
      farm.claimReward({ from: alice }),
      "NO_REWARDS"
    );
  });

  it("allows a user to exit and recover their stake", async () => {
    await rewardToken.approve(farm.address, tokens(1000), { from: owner });
    await farm.fundRewardPeriod(tokens(1000), 100, { from: owner });

    await lpToken.approve(farm.address, tokens(100), { from: alice });
    await farm.stake(tokens(100), { from: alice });

    await increaseTime(5);
    await farm.exit({ from: alice });

    assert.equal((await farm.stakedBalance(alice)).toString(), "0");
    assert.equal((await farm.totalStaked()).toString(), "0");
    assert.equal(
      (await lpToken.balanceOf(alice)).toString(),
      tokens(1000)
    );
  });

  it("does not allow changing the reward rate during an active period", async () => {
    await rewardToken.approve(farm.address, tokens(1000), { from: owner });
    await farm.fundRewardPeriod(tokens(1000), 100, { from: owner });

    await expectRevert(
      farm.setRewardRate(tokens(1), { from: owner }),
      "PERIOD_ACTIVE"
    );
  });
});
