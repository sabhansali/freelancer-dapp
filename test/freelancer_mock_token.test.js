
const FreelancerMockToken = artifacts.require("FreelancerMockToken");

contract("FreelancerMockToken", (accounts) => {
  const [owner, trader, recipient] = accounts;

  const tokens = (n) => web3.utils.toWei(n, "ether");

  let token;

  beforeEach(async () => {
    token = await FreelancerMockToken.new(
      "Freelancer USD Mock",
      "USD-MOCK"
    );

    await token.mint(trader, tokens("500"));
  });

  it("mints test tokens", async () => {
    assert.equal(
      (await token.balanceOf(trader)).toString(),
      tokens("500")
    );
  });

  it("transfers tokens and reduces allowance", async () => {
    await token.approve(recipient, tokens("100"), {
      from: trader
    });

    await token.transferFrom(
      trader,
      recipient,
      tokens("40"),
      { from: recipient }
    );

    assert.equal(
      (await token.balanceOf(recipient)).toString(),
      tokens("40")
    );

    assert.equal(
      (await token.allowance(trader, recipient)).toString(),
      tokens("60")
    );
  });

  it("reverts when transferFrom exceeds allowance", async () => {
    await token.approve(recipient, tokens("100"), {
      from: trader
    });

    try {
      await token.transferFrom(
        trader,
        recipient,
        tokens("200"),
        { from: recipient }
      );

      assert.fail("Expected transferFrom to revert");
    } catch (error) {
      assert(
        error.message.includes("revert"),
        `Unexpected error: ${error.message}`
      );
    }

    assert.equal(
      (await token.balanceOf(trader)).toString(),
      tokens("500")
    );
  });
});
