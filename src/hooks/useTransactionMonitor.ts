import { useState, useEffect, useCallback } from 'react';
import TransactionMonitorService from '../services/TransactionMonitorService';

interface TransactionStatus {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  confirmations: number;
  receipt?: any;
  error?: Error;
}

export const useTransactionMonitor = (hash?: string) => {
  const [status, setStatus] = useState<TransactionStatus | null>(null);

  const handleUpdate = useCallback((update: TransactionStatus) => {
    setStatus(update);
  }, []);

  useEffect(() => {
    if (!hash) return;

    const service = TransactionMonitorService.getInstance();
    service.onTransactionUpdate(handleUpdate);
    service.monitorTransaction(hash);

    return () => {
      service.removeTransactionListener(handleUpdate);
    };
  }, [hash, handleUpdate]);

  return status;
}; 