import { ethers } from 'ethers';

export class ContractService {
  private provider: ethers.BrowserProvider;
  private signer: ethers.Signer | null = null;

  constructor(provider: ethers.BrowserProvider) {
    this.provider = provider;
  }

  async init() {
    this.signer = await this.provider.getSigner();
  }

  async deployContract(
    abi: ethers.InterfaceAbi,
    bytecode: string,
    args: any[] = []
  ): Promise<ethers.Contract> {
    if (!this.signer) await this.init();
    
    const factory = new ethers.ContractFactory(abi, bytecode, this.signer!);
    const contract = await factory.deploy(...args);
    await contract.waitForDeployment();
    
    return contract;
  }

  async getContract(
    address: string,
    abi: ethers.InterfaceAbi
  ): Promise<ethers.Contract> {
    if (!this.signer) await this.init();
    return new ethers.Contract(address, abi, this.signer!);
  }
} 