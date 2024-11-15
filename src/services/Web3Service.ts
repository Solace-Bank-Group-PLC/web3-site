import { ethers, BrowserProvider } from 'ethers';

class Web3Service {
  private static instance: Web3Service;
  private provider: BrowserProvider | null = null;

  private constructor() {}

  static getInstance(): Web3Service {
    if (!Web3Service.instance) {
      Web3Service.instance = new Web3Service();
    }
    return Web3Service.instance;
  }

  async initialize(): Promise<boolean> {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      return true;
    }
    return false;
  }

  async getAccount(): Promise<string | null> {
    try {
      const signer = await this.provider?.getSigner();
      return signer?.address || null;
    } catch (error) {
      console.error('Error getting account:', error);
      return null;
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      const balance = await this.provider?.getBalance(address);
      return balance ? ethers.formatEther(balance) : '0';
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  }

  async sendTransaction(to: string, amount: string): Promise<string> {
    try {
      const tx = await this.contract?.sendTransaction({
        to,
        value: amount
      });
      return tx.hash;
    } catch (error) {
      if (error.code === 'INSUFFICIENT_FUNDS') {
        throw new Error('Insufficient balance to complete transaction');
      }
      if (error.code === 'NETWORK_ERROR') {
        return this.retryTransaction({ to, amount });
      }
      throw error;
    }
  }

  async retryTransaction(tx: any, maxAttempts = 3): Promise<string> {
    let attempts = 0;
    while (attempts < maxAttempts) {
      try {
        const result = await this.sendTransaction(tx.to, tx.amount);
        return result;
      } catch (error) {
        attempts++;
        if (attempts === maxAttempts) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
      }
    }
    throw new Error('Max retry attempts reached');
  }
}

export default Web3Service; 