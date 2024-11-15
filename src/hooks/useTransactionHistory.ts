import { useState, useEffect, useCallback } from 'react';
import { Transaction } from 'web3-core';
import { useWeb3 } from '../providers/Web3Provider';
import TransactionHistoryService from '../services/TransactionHistoryService';

interface UseTransactionHistoryOptions {
  maxTransactions?: number;
  fromBlock?: number | 'latest';
  toBlock?: number | 'latest';
  autoWatch?: boolean;
}

export const useTransactionHistory = (
  address: string | null,
  options: UseTransactionHistoryOptions = {}
) => {
  const { web3 } = useWeb3();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!web3 || !address) return;

    try {
      setLoading(true);
      setError(null);
      const service = new TransactionHistoryService(web3);
      const history = await service.getTransactionHistory(address, options);
      setTransactions(history);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [web3, address, options]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    if (!web3 || !address || !options.autoWatch) return;

    const service = new TransactionHistoryService(web3);
    
    const handleNewTransactions = (data: { 
      address: string; 
      transactions: Transaction[] 
    }) => {
      if (data.address.toLowerCase() === address.toLowerCase()) {
        setTransactions(prev => [...data.transactions, ...prev]);
      }
    };

    service.onNewTransactions(handleNewTransactions);
    service.watchAddress(address);

    return () => {
      service.offNewTransactions(handleNewTransactions);
      service.stopWatching();
    };
  }, [web3, address, options.autoWatch]);

  return {
    transactions,
    loading,
    error,
    refresh: fetchTransactions
  };
}; 