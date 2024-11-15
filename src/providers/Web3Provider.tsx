import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

export interface Web3ContextType {
  provider: ethers.BrowserProvider | null;
  address: string | null;
  chainId: number | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const Web3Context = createContext<Web3ContextType>({
  provider: null,
  address: null,
  chainId: null,
  connect: async () => {},
  disconnect: () => {}
});

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();
        
        setProvider(provider);
        setAddress(accounts[0]);
        setChainId(Number(network.chainId));
      } catch (error) {
        console.error('Failed to connect:', error);
      }
    }
  };

  const disconnect = () => {
    setProvider(null);
    setAddress(null);
    setChainId(null);
  };

  return (
    <Web3Context.Provider value={{ provider, address, chainId, connect, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);