import {
  BrowserProvider,
  Contract,
  formatEther,
  parseEther
} from 'ethers';

let appKitProvider = null;

export const setAppKitProvider = (provider) => {
  appKitProvider = provider;
};

const getBrowserProvider = () => {
  if (!appKitProvider) {
    throw new Error(
      'Please connect your wallet using Reown.'
    );
  }

  return new BrowserProvider(
    appKitProvider
  );
};

export const getProvider = () => {
  return getBrowserProvider();
};

export const getConnectedAccount = async () => {
  const provider =
    getBrowserProvider();

  const accounts =
    await provider.send(
      'eth_accounts',
      []
    );

  return accounts[0] || '';
};

export const getContract = async (
  artifact
) => {
  const provider =
    getBrowserProvider();

  const network =
    await provider.getNetwork();

  console.log(
    'Network Name:',
    network.name
  );

  console.log(
    'Chain ID:',
    network.chainId.toString()
  );

  const networkId =
    await provider.send(
      'net_version',
      []
    );

  console.log(
    'Network ID:',
    networkId
  );

  const deployedNetwork =
    artifact.networks?.[networkId];

  if (
    !deployedNetwork ||
    !deployedNetwork.address
  ) {
    throw new Error(
      `Contract not deployed on the current network (Network ID: ${networkId}, Chain ID: ${network.chainId})`
    );
  }

  const signer =
    await provider.getSigner();

  const address =
    await signer.getAddress();

  console.log(
    'Signer Address:',
    address
  );

  const contract =
    new Contract(
      deployedNetwork.address,
      artifact.abi,
      signer
    );

  console.log(
    'Contract Address:',
    deployedNetwork.address
  );

  return contract;
};

export {
  formatEther,
  parseEther
};