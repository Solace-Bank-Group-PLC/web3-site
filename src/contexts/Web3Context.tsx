import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import type { BrowserProvider } from 'ethers';
import { TransactionMonitorService } from '../services/TransactionMonitorService';

interface Web3ContextType {
  provider: BrowserProvider | null;
  account: string | null;
  chainId: number | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  error: Error | null;
  monitorTransaction: (hash: string) => Promise<void>;
  transactions: Map<string, TransactionStatus>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        const network = await web3Provider.getNetwork();
        const accounts = await web3Provider.listAccounts();

        setProvider(web3Provider);
        setChainId(Number(network.chainId));
        setAccount(accounts[0]?.address || null);
      } else {
        throw new Error('No Web3 provider found');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to connect'));
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setProvider(null);
    setAccount(null);
    setChainId(null);
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        setChainId(Number(chainId));
      });

      window.ethereum.on('disconnect', () => {
        disconnect();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
        window.ethereum.removeListener('disconnect', () => {});
      }
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{
        provider,
        account,
        chainId,
        connect,
        disconnect,
        isConnecting,
        error,
        monitorTransaction: async (hash: string) => {
          // Implement transaction monitoring logic
        },
        transactions: new Map<string, TransactionStatus>()
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
