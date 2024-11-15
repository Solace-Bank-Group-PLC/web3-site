import { BrowserProvider, Contract } from 'ethers';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
      on: (eventName: string, handler: (...args: any[]) => void) => void;
      removeListener: (eventName: string, handler: (...args: any[]) => void) => void;
    };
  }
}

export interface Web3Error extends Error {
  code?: string | number;
  reason?: string;
  transaction?: any;
}

export interface Web3Service {
  provider: BrowserProvider | null;
  contract: Contract | null;
  connect(): Promise<void>;
  disconnect(): void;
  getBalance(address: string): Promise<string>;
  sendTransaction(to: string, amount: string): Promise<string>;
  handleTransactionError(error: Web3Error): void;
  retryTransaction(tx: any, maxAttempts?: number): Promise<string>;
}

export interface TransactionResult {
  hash: string;
  from: string;
  to: string;
  value: string;
  status: 'pending' | 'confirmed' | 'failed';
  error?: Web3Error;
}

export function useWeb3Subscription(provider: BrowserProvider) {
  const subscriptions = useRef<any[]>([]);

  useEffect(() => {
    const sub1 = provider.on('block', (blockNumber) => {
      // Handle new block
    });

    const sub2 = provider.on('pending', (tx) => {
      // Handle pending transaction
    });

    subscriptions.current.push(sub1, sub2);

    return () => {
      subscriptions.current.forEach(sub => {
        provider.removeListener(sub.event, sub.listener);
      });
      subscriptions.current = [];
    };
  }, [provider]);
} 