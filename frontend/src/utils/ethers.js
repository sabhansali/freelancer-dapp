import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';

const getBrowserProvider = () => {
  if (!window.ethereum) {
    throw new Error('Please install MetaMask');
  }

  return new BrowserProvider(window.ethereum);
};

export const requestAccounts = async () => {
  const provider = getBrowserProvider();
  return provider.send('eth_requestAccounts', []);
};

export const getConnectedAccount = async () => {
  const accounts = await requestAccounts();
  return accounts[0] || '';
};

export const getContract = async (artifact) => {
  const provider = getBrowserProvider();
  const networkId = await provider.send('net_version', []);
  const deployedNetwork = artifact.networks?.[networkId];

  if (!deployedNetwork || !deployedNetwork.address) {
    throw new Error('Contract not deployed on the current network');
  }

  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  return new Contract(deployedNetwork.address, artifact.abi, signer);
};

export { formatEther, parseEther };