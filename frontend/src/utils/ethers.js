import {
  BrowserProvider,
  Contract,
  formatEther,
  parseEther
} from "ethers";

let appKitProvider = null;

export const setAppKitProvider = (provider) => {
  appKitProvider = provider;
};

const getBrowserProvider = () => {
  if (!appKitProvider) {
    throw new Error("Please connect your wallet using Reown.");
  }

  return new BrowserProvider(appKitProvider);
};

export const getProvider = () => getBrowserProvider();

export const getConnectedAccount = async () => {
  const provider = getBrowserProvider();
  const accounts = await provider.send("eth_accounts", []);
  return accounts[0] || "";
};

/**
 * Get a deployed Truffle contract.
 * Pass addressOverride when the contract is dynamically created
 * or when using multiple deployments of the same contract type.
 */
export const getContract = async (artifact, addressOverride) => {
  const provider = getBrowserProvider();
  const network = await provider.getNetwork();
  const networkId = await provider.send("net_version", []);

  const deployedNetwork = artifact.networks?.[networkId];
  const address = addressOverride || deployedNetwork?.address;

  if (!address) {
    throw new Error(
      `No deployment address found for ${artifact.contractName || "contract"} on network ${networkId}. ` +
      "Run the migrations and copy the updated artifacts, or configure the contract address."
    );
  }

  const signer = await provider.getSigner();

  return new Contract(address, artifact.abi, signer);
};

export { formatEther, parseEther };