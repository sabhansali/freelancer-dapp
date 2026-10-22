import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { defineChain } from '@reown/appkit/networks';

const projectId = process.env.REACT_APP_REOWN_PROJECT_ID;

// Ganache network
const ganache = defineChain({
  id: 1337,
  caipNetworkId: 'eip155:1337',
  chainNamespace: 'eip155',
  name: 'Ganache Local',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:7545']
    }
  },
  blockExplorers: {
    default: {
      name: 'Ganache',
      url: 'http://127.0.0.1:7545'
    }
  }
});

const sepolia = defineChain({
  id: 11155111,
  caipNetworkId: 'eip155:11155111',
  chainNamespace: 'eip155',
  name: 'Ethereum Sepolia',
  nativeCurrency: {
    name: 'Sepolia Ether',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: [process.env.REACT_APP_SEPOLIA_RPC_URL || 'https://rpc.sepolia.org']
    }
  },
  blockExplorers: {
    default: {
      name: 'Sepolia Etherscan',
      url: 'https://sepolia.etherscan.io'
    }
  }
});

const metadata = {
  name: 'Freelancer Escrow DApp',
  description: 'Secure freelance payments using blockchain escrow',
  url: window.location.origin,
  icons: []
};

const ethersAdapter = new EthersAdapter();

export const appKit = createAppKit({
  adapters: [ethersAdapter],
  networks: [ganache, sepolia],
  defaultNetwork: ganache,
  metadata,
  projectId,
  features: {
    analytics: false
  }
});