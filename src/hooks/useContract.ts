import { useState, useEffect } from 'react';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import ContractService from '../services/ContractService';
import { useWeb3 } from '../providers/Web3Provider';

interface UseContractProps {
  address: string;
  abi: AbiItem[];
  name: string;
}

export const useContract = ({ address, abi, name }: UseContractProps) => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { provider } = useWeb3();

  useEffect(() => {
    const initContract = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const contractService = ContractService.getInstance();
        await contractService.initialize(provider);
        
        const loadedContract = await contractService.loadContract(
          address,
          abi,
          name
        );
        
        setContract(loadedContract);
      } catch (err) {
        setError(err as Error);
        console.error('Failed to initialize contract:', err);
      } finally {
        setLoading(false);
      }
    };

    if (provider) {
      initContract();
    }
  }, [address, abi, name, provider]);

  return { contract, loading, error };
}; 