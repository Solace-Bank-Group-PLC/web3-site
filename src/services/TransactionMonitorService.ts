import { TransactionReceipt } from 'web3-core';
import { EventEmitter } from 'events';

interface TransactionStatus {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  confirmations: number;
  receipt?: TransactionReceipt;
  error?: Error;
}

class TransactionMonitorService {
  private static instance: TransactionMonitorService;
  private emitter: EventEmitter;
  private transactions: Map<string, TransactionStatus>;
  private requiredConfirmations: number;

  private constructor() {
    this.emitter = new EventEmitter();
    this.transactions = new Map();
    this.requiredConfirmations = 12; // Default for Ethereum mainnet
  }

  static getInstance(): TransactionMonitorService {
    if (!TransactionMonitorService.instance) {
      TransactionMonitorService.instance = new TransactionMonitorService();
    }
    return TransactionMonitorService.instance;
  }

  setRequiredConfirmations(confirmations: number): void {
    this.requiredConfirmations = confirmations;
  }

  async monitorTransaction(hash: string): Promise<void> {
    try {
      this.transactions.set(hash, {
        hash,
        status: 'pending',
        confirmations: 0
      });

      const web3 = window.web3;
      const receipt = await web3.eth.getTransactionReceipt(hash);

      if (!receipt) {
        this.emitUpdate(hash, 'pending');
        return;
      }

      const status = receipt.status ? 'confirmed' : 'failed';
      this.transactions.set(hash, {
        hash,
        status,
        confirmations: 1,
        receipt
      });

      this.emitUpdate(hash, status);
    } catch (error) {
      this.transactions.set(hash, {
        hash,
        status: 'failed',
        confirmations: 0,
        error: error as Error
      });
      this.emitUpdate(hash, 'failed');
    }
  }

  private emitUpdate(hash: string, status: string): void {
    const transaction = this.transactions.get(hash);
    if (transaction) {
      this.emitter.emit('transactionUpdate', transaction);
    }
  }

  onTransactionUpdate(callback: (status: TransactionStatus) => void): void {
    this.emitter.on('transactionUpdate', callback);
  }

  removeTransactionListener(callback: (status: TransactionStatus) => void): void {
    this.emitter.removeListener('transactionUpdate', callback);
  }
}

export default TransactionMonitorService; 