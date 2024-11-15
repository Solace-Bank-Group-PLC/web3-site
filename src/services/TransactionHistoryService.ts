import { ethers } from 'ethers';

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

export class TransactionHistoryService {
  private provider: ethers.BrowserProvider;
  
  constructor(provider: ethers.BrowserProvider) {
    this.provider = provider;
  }

  async getTransactions(address: string, limit: number = 10): Promise<Transaction[]> {
    try {
      const blockNumber = await this.provider.getBlockNumber();
      const block = await this.provider.getBlock(blockNumber);
      
      if (!block) throw new Error('Block not found');

      const transactions = await Promise.all(
        block.transactions.slice(0, limit).map(async (txHash) => {
          const tx = await this.provider.getTransaction(txHash);
          const receipt = await this.provider.getTransactionReceipt(txHash);
          
          if (!tx || !receipt) throw new Error('Transaction not found');

          return {
            hash: tx.hash,
            from: tx.from,
            to: tx.to || '',
            value: ethers.formatEther(tx.value),
            timestamp: block.timestamp,
            status: receipt.status ? 'confirmed' : 'failed'
          };
        })
      );

      return transactions;
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return [];
    }
  }
} 