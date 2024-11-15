import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { BrowserProvider } from 'ethers';

class ContractService {
  private static instance: ContractService;
  private web3: Web3 | null = null;
  private contracts: Map<string, Contract> = new Map();
  private readonly provider: BrowserProvider;
  private batchRequests: Array<Promise<any>> = [];

  private constructor() {}

  static getInstance(): ContractService {
    if (!ContractService.instance) {
      ContractService.instance = new ContractService();
    }
    return ContractService.instance;
  }

  async initialize(provider: any): Promise<void> {
    this.web3 = new Web3(provider);
  }

  async loadContract(
    address: string, 
    abi: AbiItem[], 
    name: string
  ): Promise<Contract | null> {
    try {
      if (!this.web3) throw new Error('Web3 not initialized');
      
      const contract = new this.web3.eth.Contract(abi, address);
      this.contracts.set(name, contract);
      return contract;
    } catch (error) {
      console.error(`Failed to load contract ${name}:`, error);
      return null;
    }
  }

  getContract(name: string): Contract | null {
    return this.contracts.get(name) || null;
  }

  async callContractMethod(
    contractName: string,
    methodName: string,
    ...args: any[]
  ): Promise<any> {
    try {
      const contract = this.getContract(contractName);
      if (!contract) throw new Error(`Contract ${contractName} not found`);

      const method = contract.methods[methodName];
      if (!method) throw new Error(`Method ${methodName} not found`);

      return await method(...args).call();
    } catch (error) {
      console.error('Contract call failed:', error);
      throw error;
    }
  }

  async sendContractTransaction(
    contractName: string,
    methodName: string,
    fromAddress: string,
    ...args: any[]
  ): Promise<any> {
    try {
      const contract = this.getContract(contractName);
      if (!contract) throw new Error(`Contract ${contractName} not found`);

      const method = contract.methods[methodName];
      if (!method) throw new Error(`Method ${methodName} not found`);

      return await method(...args).send({ from: fromAddress });
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }

  async batchProcess<T>(requests: Array<Promise<T>>, batchSize = 50): Promise<T[]> {
    const results: T[] = [];
    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch);
      results.push(...batchResults);
    }
    return results;
  }

  async executeWithGas(method: string, params: any[]): Promise<string> {
    const gasEstimate = await this.contract.estimateGas[method](...params);
    const gasLimit = gasEstimate.mul(120).div(100); // Add 20% buffer
    
    return this.contract[method](...params, { gasLimit });
  }
}

export default ContractService; 