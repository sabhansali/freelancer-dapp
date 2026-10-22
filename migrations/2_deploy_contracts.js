const FreelancerRegistry = artifacts.require("FreelancerRegistry");
const TaskEscrow = artifacts.require("TaskEscrow");
const FreelancerToken = artifacts.require("FreelancerToken");
const FreelancerVault = artifacts.require("FreelancerVault");
const SimpleAMM = artifacts.require("SimpleAMM");
const FRLStaking = artifacts.require("FRLStaking");
const FRLYieldFarm = artifacts.require("FRLYieldFarm");

const FreelancerMockToken = artifacts.require("FreelancerMockToken");
const FreelancerDEXFactory = artifacts.require("FreelancerDEXFactory");
const FreelancerDEXRouter = artifacts.require("FreelancerDEXRouter");
const FreelancerLPFarm = artifacts.require("FreelancerLPFarm");
const MockFeed = artifacts.require("MockFeed");
const SafePriceConsumer = artifacts.require("SafePriceConsumer");

module.exports = async function (deployer, network, accounts) {
  const toWei = (amount) => web3.utils.toWei(amount.toString(), "ether");

  // --------------------------------------------------
  // 1. Deploy existing freelancer dApp contracts
  // --------------------------------------------------

  await deployer.deploy(FreelancerRegistry);
  const registry = await FreelancerRegistry.deployed();

  await deployer.deploy(TaskEscrow, registry.address);

  await deployer.deploy(FreelancerToken);
  const token = await FreelancerToken.deployed();

  await deployer.deploy(FreelancerVault, token.address);

  // Seed the deployer's account with FRL tokens.
  await token.mint(accounts[0], toWei("10000"));

  await deployer.deploy(SimpleAMM, token.address);
  const amm = await SimpleAMM.deployed();

  await deployer.deploy(FRLStaking, token.address);

  await deployer.deploy(FRLYieldFarm, amm.address, token.address);

  // --------------------------------------------------
  // 2. Deploy the DEX test tokens
  // --------------------------------------------------

  await deployer.deploy(
    FreelancerMockToken,
    "Freelancer Token A",
    "FTA"
  );
  const tokenA = await FreelancerMockToken.deployed();

  // Save the first token's address before deploying the
  // same contract artifact for Token B.
  const tokenAAddress = tokenA.address;

  await deployer.deploy(
    FreelancerMockToken,
    "Freelancer Token B",
    "FTB"
  );
  const tokenB = await FreelancerMockToken.deployed();

  const tokenBAddress = tokenB.address;

  // --------------------------------------------------
  // 3. Deploy the DEX factory and router
  // --------------------------------------------------

  await deployer.deploy(FreelancerDEXFactory);
  const factory = await FreelancerDEXFactory.deployed();

  await deployer.deploy(
    FreelancerDEXRouter,
    factory.address
  );
  const router = await FreelancerDEXRouter.deployed();

  // --------------------------------------------------
  // 4. Mint test tokens to the deployer's account
  // --------------------------------------------------

  await tokenA.mint(accounts[0], toWei("100000"));
  await tokenB.mint(accounts[0], toWei("100000"));

  // --------------------------------------------------
  // 5. Approve tokens and create the initial liquidity pool
  // --------------------------------------------------

  await tokenA.approve(router.address, toWei("1000"));
  await tokenB.approve(router.address, toWei("1000"));

  const deadline = Math.floor(Date.now() / 1000) + 3600;

  await router.addLiquidity(
    tokenAAddress,
    tokenBAddress,
    toWei("1000"),
    toWei("1000"),
    "0",
    "0",
    accounts[0],
    deadline
  );

  // Retrieve the LP pair created by the router.
  const pairAddress = await factory.getPair(
    tokenAAddress,
    tokenBAddress
  );

  if (
    !pairAddress ||
    pairAddress === "0x0000000000000000000000000000000000000000"
  ) {
    throw new Error(
      "DEX pair was not created. Check FreelancerDEXRouter.addLiquidity()."
    );
  }

  // --------------------------------------------------
  // 6. Deploy the LP farm using the actual LP token
  // --------------------------------------------------

  await deployer.deploy(
    FreelancerLPFarm,
    pairAddress,
    tokenBAddress,
    "0"
  );
  const lpFarm = await FreelancerLPFarm.deployed();

  // Fund the farm's seven-day reward period with Token B.
  await tokenB.approve(lpFarm.address, toWei("10000"));

  await lpFarm.fundRewardPeriod(
    toWei("10000"),
    7 * 24 * 60 * 60
  );

  // --------------------------------------------------
  // 7. Deploy the price consumer for the selected network
  // --------------------------------------------------

  let priceConsumer;
  let mockFeed;
  let oracleMaxAge;

  if (network === "development" || network === "ganache") {
    oracleMaxAge = 3600;
    await deployer.deploy(MockFeed, 8, "ETH / USD (simulated local feed)");
    mockFeed = await MockFeed.deployed();
    await mockFeed.setFresh("200000000000");
    await deployer.deploy(SafePriceConsumer, mockFeed.address, oracleMaxAge);
    priceConsumer = await SafePriceConsumer.deployed();
  } else if (network === "sepolia") {
    const feedAddress = process.env.CHAINLINK_ETH_USD_SEPOLIA_FEED;
    oracleMaxAge = Number(
      process.env.CHAINLINK_ETH_USD_MAX_AGE_SECONDS || "5400"
    );

    if (!feedAddress) {
      throw new Error(
        "Set CHAINLINK_ETH_USD_SEPOLIA_FEED before deploying to Sepolia."
      );
    }

    await deployer.deploy(SafePriceConsumer, feedAddress, oracleMaxAge);
    priceConsumer = await SafePriceConsumer.deployed();
  }

  // --------------------------------------------------
  // 8. Print deployment addresses for frontend configuration
  // --------------------------------------------------

  console.log("\n========================================");
  console.log(" FREELANCER DAPP + DEX DEPLOYMENT");
  console.log("========================================");

  console.log("\nExisting dApp:");
  console.log("Registry:", registry.address);
  console.log("FRL Token:", token.address);
  console.log("Simple AMM:", amm.address);

  console.log("\nDEX:");
  console.log("Token A (FTA):", tokenAAddress);
  console.log("Token B (FTB):", tokenBAddress);
  console.log("Factory:", factory.address);
  console.log("Router:", router.address);
  console.log("Pair / LP Token:", pairAddress);
  console.log("LP Farm:", lpFarm.address);

  if (priceConsumer) {
    console.log("\nPrice Oracle:");
    console.log("Consumer:", priceConsumer.address);
    console.log("Feed:", mockFeed ? mockFeed.address : process.env.CHAINLINK_ETH_USD_SEPOLIA_FEED);
    console.log("Max age (seconds):", oracleMaxAge);
    console.log("Source:", mockFeed ? "Simulated local feed" : "Chainlink ETH / USD on Sepolia");
  }

  console.log("\nInitial pool:");
  console.log("Token A deposited: 1000 FTA");
  console.log("Token B deposited: 1000 FTB");
  console.log("Reward funding: 10000 FTB");
  console.log("Reward period: 7 days");

  console.log("\nDeployer account:", accounts[0]);
  console.log("========================================\n");
};