const SafePriceConsumer = artifacts.require("SafePriceConsumer");

const SEPOLIA_CHAIN_ID = 11155111;
const CHAINLINK_ETH_USD_SEPOLIA =
  "0x694AA1769357215DE4FAC081bf1f309aDC325306";
const MAX_AGE_SECONDS = 5400;

module.exports = async function deploySafePriceConsumer(callback) {
  try {
    const chainId = Number(await web3.eth.getChainId());
    if (chainId !== SEPOLIA_CHAIN_ID) {
      throw new Error(
        `Wrong network: expected Ethereum Sepolia (${SEPOLIA_CHAIN_ID}), got ${chainId}.`
      );
    }

    const accounts = await web3.eth.getAccounts();
    if (!accounts[0]) {
      throw new Error(
        "Truffle Dashboard did not provide a connected MetaMask account."
      );
    }

    const consumer = await SafePriceConsumer.new(
      CHAINLINK_ETH_USD_SEPOLIA,
      MAX_AGE_SECONDS,
      { from: accounts[0] }
    );

    console.log("\nSafePriceConsumer deployed through Truffle Dashboard");
    console.log("Deployer:", accounts[0]);
    console.log("Network: Ethereum Sepolia");
    console.log("Chainlink ETH/USD feed:", CHAINLINK_ETH_USD_SEPOLIA);
    console.log("Max age (seconds):", MAX_AGE_SECONDS);
    console.log("Consumer:", consumer.address);
    console.log(
      "\nSet REACT_APP_PRICE_CONSUMER_SEPOLIA_ADDRESS to the Consumer address."
    );

    callback();
  } catch (error) {
    callback(error);
  }
};
