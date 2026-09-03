import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';

// 1. window.ethereum
// 2. BrowserProvider
const getBrowserProvider = () => {
  if (!window.ethereum) {
    throw new Error('Please install MetaMask');
  }

  return new BrowserProvider(window.ethereum);
};

// 3. Request MetaMask account
export const requestAccounts = async () => {
  const provider = getBrowserProvider();

  const accounts = await provider.send('eth_requestAccounts', []);

  console.log('Connected Account:', accounts[0] || 'No account connected');

  return accounts;
};

// Get already-connected account without triggering MetaMask popup
export const getConnectedAccount = async () => {
  const provider = getBrowserProvider();

  const accounts = await provider.send('eth_accounts', []);

  return accounts[0] || '';
};

export const getContract = async (artifact) => {
  const provider = getBrowserProvider();

  // 6. getNetwork()
  const network = await provider.getNetwork();

  console.log('Network Name:', network.name);
  console.log('Chain ID:', network.chainId.toString());

  const networkId = await provider.send("net_version", []);
  const deployedNetwork = artifact.networks?.[networkId];

  if (!deployedNetwork || !deployedNetwork.address) {
    throw new Error(
      `Contract not deployed on the current network (Chain ID: ${networkId})`
    );
  }

  // 4. getSigner()
  const signer = await provider.getSigner();

  // 5. getAddress()
  const address = await signer.getAddress();

  console.log('Signer Address:', address);

  // 8. Contract(address, ABI, signer)
  const contract = new Contract(
    deployedNetwork.address,
    artifact.abi,
    signer
  );

  console.log('Contract Address:', deployedNetwork.address);

  return contract;
};

export { formatEther, parseEther };