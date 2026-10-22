const MockFeed = artifacts.require("MockFeed");
const SafePriceConsumer = artifacts.require("SafePriceConsumer");

contract("SafePriceConsumer", () => {
  const decimals = 8;
  const price = web3.utils.toBN("200000000000");
  let feed;
  let consumer;

  const expectRevert = async (operation, message) => {
    try {
      await operation();
      assert.fail("Expected transaction to revert");
    } catch (error) {
      assert(
        error.message.includes(message),
        `Expected ${message}, received: ${error.message}`
      );
    }
  };

  beforeEach(async () => {
    feed = await MockFeed.new(decimals, "ETH / USD");
    consumer = await SafePriceConsumer.new(feed.address, 3600);
  });

  it("reads a fresh positive price and feed metadata", async () => {
    await feed.setFresh(price);

    const result = await consumer.safePrice();
    assert.equal(result.price.toString(), price.toString());
    assert.isTrue(result.updatedAt.toNumber() > 0);
    assert.equal((await consumer.feedDecimals()).toString(), "8");
    assert.equal(await consumer.feedDescription(), "ETH / USD");
  });

  it("rejects zero and negative prices", async () => {
    await feed.setFresh(0);
    await expectRevert(() => consumer.safePrice(), "INVALID_PRICE");

    await feed.setFresh(-1);
    await expectRevert(() => consumer.safePrice(), "INVALID_PRICE");
  });

  it("rejects missing, future, and stale timestamps", async () => {
    await feed.set(200000000000, 0);
    await expectRevert(() => consumer.safePrice(), "MISSING_UPDATE_TIME");

    const latestBlock = await web3.eth.getBlock("latest");
    await feed.set(200000000000, Number(latestBlock.timestamp) + 60);
    await expectRevert(() => consumer.safePrice(), "FUTURE_UPDATE_TIME");

    await feed.set(200000000000, Number(latestBlock.timestamp) - 3601);
    await expectRevert(() => consumer.safePrice(), "STALE_PRICE");
  });

  it("scales valueOf using the feed decimals", async () => {
    await feed.setFresh(price);

    const amount = web3.utils.toBN(web3.utils.toWei("2", "ether"));
    const expected = web3.utils.toBN(web3.utils.toWei("4000", "ether"));
    const actual = await consumer.methods["valueOf(uint256)"](amount);
    assert.equal(actual.toString(), expected.toString());
  });
});
