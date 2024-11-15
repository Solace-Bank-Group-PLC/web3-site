import { Transaction } from 'web3-core';
import { EventEmitter } from 'events';
import Web3 from 'web3';

interface TransactionHistoryOptions {
  maxTransactions?: number;
  fromBlock?: number | 'latest';
  toBlock?: number | 'latest';
}

class TransactionHistoryService {
  private web3: Web3;
  private emitter: EventEmitter;
  private cache: Map<string, Transaction[]>;

  constructor(web3: Web3) {
    this.web3 = web3;
    this.emitter = new EventEmitter();
    this.cache = new Map();
  }

  async getTransactionHistory(
    address: string, 
    options: TransactionHistoryOptions = {}
  ): Promise<Transaction[]> {
    const {
      maxTransactions = 50,
      fromBlock = 0,
      toBlock = 'latest'
    } = options;

    try {
      const latestBlock = await this.web3.eth.getBlockNumber();
      const endBlock = toBlock === 'latest' ? latestBlock : toBlock;
      const transactions: Transaction[] = [];

      for (let i = endBlock; i >= fromBlock && transactions.length < maxTransactions; i--) {
        const block = await this.web3.eth.getBlock(i, true);
        if (block && block.transactions) {
          const relevantTxs = block.transactions.filter(tx => 
            tx.from.toLowerCase() === address.toLowerCase() || 
            tx.to?.toLowerCase() === address.toLowerCase()
          );
          transactions.push(...relevantTxs);
        }
      }

      this.cache.set(address, transactions);
      return transactions.slice(0, maxTransactions);
    } catch (error) {
      console.error('Failed to fetch transaction history:', error);
      throw error;
    }
  }

  async watchAddress(address: string): Promise<void> {
    const subscription = this.web3.eth.subscribe('newBlockHeaders', async (error, block) => {
      if (error) {
        console.error('Subscription error:', error);
        return;
      }

      try {
        const fullBlock = await this.web3.eth.getBlock(block.number, true);
        if (fullBlock && fullBlock.transactions) {
          const relevantTxs = fullBlock.transactions.filter(tx =>
            tx.from.toLowerCase() === address.toLowerCase() ||
            tx.to?.toLowerCase() === address.toLowerCase()
          );

          if (relevantTxs.length > 0) {
            this.emitter.emit('new-transactions', {
              address,
              transactions: relevantTxs
            });
          }
        }
      } catch (error) {
        console.error('Error processing new block:', error);
      }
    });

    this.emitter.on('stop-watching', () => {
      subscription.unsubscribe();
    });
  }

  stopWatching(): void {
    this.emitter.emit('stop-watching');
  }

  onNewTransactions(callback: (data: { address: string; transactions: Transaction[] }) => void): void {
    this.emitter.on('new-transactions', callback);
  }

  offNewTransactions(callback: (data: { address: string; transactions: Transaction[] }) => void): void {
    this.emitter.off('new-transactions', callback);
  }
}

export default TransactionHistoryService; 