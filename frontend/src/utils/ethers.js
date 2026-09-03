import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';

// Reown AppKit wallet provider
let appKitProvider = null;

// Set the provider received from Reown
export const setAppKitProvider = (provider) => {
  appKitProvider = provider;
};

// Get the ethers BrowserProvider
const getBrowserProvider = () => {
  if (!appKitProvider) {
    throw new Error('Please connect your wallet using Reown.');
  }

  return new BrowserProvider(appKitProvider);
};

// Get the connected wallet account
export const getConnectedAccount = async () => {
  const provider = getBrowserProvider();

  const accounts = await provider.send('eth_accounts', []);

  return accounts[0] || '';
};

// Get contract connected to Reown wallet
export const getContract = async (artifact) => {
  const provider = getBrowserProvider();

  // Get current network
  const network = await provider.getNetwork();

  console.log('Network Name:', network.name);
  console.log('Chain ID:', network.chainId.toString());

  // Truffle network ID
  const networkId = await provider.send('net_version', []);

  console.log('Network ID:', networkId);

  const deployedNetwork = artifact.networks?.[networkId];

  if (!deployedNetwork || !deployedNetwork.address) {
    throw new Error(
      `Contract not deployed on the current network (Network ID: ${networkId}, Chain ID: ${network.chainId})`
    );
  }

  // Get signer from Reown wallet
  const signer = await provider.getSigner();

  // Get wallet address
  const address = await signer.getAddress();

  console.log('Signer Address:', address);

  // Connect contract using Reown signer
  const contract = new Contract(
    deployedNetwork.address,
    artifact.abi,
    signer
  );

  console.log('Contract Address:', deployedNetwork.address);

  return contract;
};

export { formatEther, parseEther };