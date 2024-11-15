export const NETWORKS = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  137: 'Polygon Mainnet',
  80001: 'Mumbai Testnet'
} as const;

export type NetworkId = keyof typeof NETWORKS;

export const getNetworkName = (chainId: number): string => {
  return NETWORKS[chainId as NetworkId] || 'Unknown Network';
};

export const isValidNetwork = (chainId: number): chainId is NetworkId => {
  return chainId in NETWORKS;
}; 