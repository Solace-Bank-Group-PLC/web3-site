import { ethers } from 'ethers';
import { useWeb3 } from '../providers/Web3Provider';

export const TransactionButton: React.FC<{
  contractAddress: string;
  abi: ethers.InterfaceAbi;
  functionName: string;
  args?: any[];
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}> = ({ contractAddress, abi, functionName, args = [], onSuccess, onError }) => {
  const { provider, address } = useWeb3();

  const handleTransaction = async () => {
    if (!provider || !address) return;

    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract[functionName](...args);
      await tx.wait();
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return (
    <button 
      onClick={handleTransaction}
      disabled={!provider || !address}
    >
      Execute Transaction
    </button>
  );
}; 