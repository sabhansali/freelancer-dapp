
const FreelancerMockToken = artifacts.require("FreelancerMockToken");
const FreelancerDEXFactory = artifacts.require("FreelancerDEXFactory");
const FreelancerLiquidityPair = artifacts.require("FreelancerLiquidityPair");

contract("FreelancerDEXFactory", (accounts) => {
  const [owner, other] = accounts;

  let tokenA;
  let tokenB;
  let factory;

  beforeEach(async () => {
    tokenA = await FreelancerMockToken.new("Token A", "TKA");
    tokenB = await FreelancerMockToken.new("Token B", "TKB");
    factory = await FreelancerDEXFactory.new();
  });

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

  it("creates and registers a trading pair", async () => {
    await factory.createPair(tokenA.address, tokenB.address);

    const pairAddress = await factory.getPair(
      tokenA.address,
      tokenB.address
    );

    assert.notEqual(
      pairAddress,
      "0x0000000000000000000000000000000000000000"
    );

    assert.equal(
      await factory.getPair(tokenB.address, tokenA.address),
      pairAddress
    );

    assert.equal((await factory.allPairsLength()).toString(), "1");

    const pair = await FreelancerLiquidityPair.at(pairAddress);

    const expectedToken0 =
      tokenA.address.toLowerCase() < tokenB.address.toLowerCase()
        ? tokenA.address
        : tokenB.address;

    const expectedToken1 =
      tokenA.address.toLowerCase() < tokenB.address.toLowerCase()
        ? tokenB.address
        : tokenA.address;

    assert.equal(
      (await pair.token0()).toLowerCase(),
      expectedToken0.toLowerCase()
    );

    assert.equal(
      (await pair.token1()).toLowerCase(),
      expectedToken1.toLowerCase()
    );

    assert.equal(
      (await pair.factory()).toLowerCase(),
      factory.address.toLowerCase()
    );
  });

  it("rejects duplicate pairs in either token order", async () => {
    await factory.createPair(tokenA.address, tokenB.address);

    await expectRevert(
      factory.createPair(tokenA.address, tokenB.address),
      "PAIR_EXISTS"
    );

    await expectRevert(
      factory.createPair(tokenB.address, tokenA.address),
      "PAIR_EXISTS"
    );

    assert.equal((await factory.allPairsLength()).toString(), "1");
  });

  it("rejects identical token addresses", async () => {
    await expectRevert(
      factory.createPair(tokenA.address, tokenA.address),
      "IDENTICAL_ADDRESSES"
    );
  });

  it("rejects the zero address", async () => {
    await expectRevert(
      factory.createPair(
        "0x0000000000000000000000000000000000000000",
        tokenA.address
      ),
      "ZERO_ADDRESS"
    );
  });

  it("allows only the fee setter to update factory settings", async () => {
    await expectRevert(
      factory.setFeeTo(other, { from: other }),
      "FORBIDDEN"
    );

    await factory.setFeeTo(other, { from: owner });

    assert.equal(
      (await factory.feeTo()).toLowerCase(),
      other.toLowerCase()
    );

    await factory.setFeeToSetter(other, { from: owner });

    assert.equal(
      (await factory.feeToSetter()).toLowerCase(),
      other.toLowerCase()
    );
  });
});
