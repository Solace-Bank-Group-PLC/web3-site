import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../providers/Web3Provider';

const NETWORKS = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  137: 'Polygon Mainnet',
  80001: 'Mumbai Testnet'
};

export const NetworkSwitcher: React.FC = () => {
  const { provider, chainId } = useWeb3();
  const [switching, setSwitching] = useState(false);

  const switchNetwork = async (networkId: number) => {
    if (!provider) return;
    setSwitching(true);
    try {
      await provider.send('wallet_switchEthereumChain', [
        { chainId: `0x${networkId.toString(16)}` }
      ]);
    } catch (error) {
      console.error('Failed to switch network:', error);
    } finally {
      setSwitching(false);
    }
  };

  return (
    <select 
      value={chainId || ''}
      onChange={(e) => switchNetwork(Number(e.target.value))}
      disabled={switching || !provider}
    >
      {Object.entries(NETWORKS).map(([id, name]) => (
        <option key={id} value={id}>{name}</option>
      ))}
    </select>
  );
}; 