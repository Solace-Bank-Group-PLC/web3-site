import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';
import { useWeb3 } from '../providers/Web3Provider';
import LoadingSpinner from './LoadingSpinner';
import ContractService from '../services/ContractService';

interface ContractInteractionProps {
  address: string;
  abi: any[];
  name: string;
}

const ContractInteraction: React.FC<ContractInteractionProps> = ({
  address,
  abi,
  name
}) => {
  const { account } = useWeb3();
  const { contract, loading, error } = useContract({ address, abi, name });
  const [result, setResult] = useState<any>(null);
  const [methodName, setMethodName] = useState('');
  const [args, setArgs] = useState<string[]>([]);

  const handleCall = async () => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      const contractService = ContractService.getInstance();
      const response = await contractService.callContractMethod(
        name,
        methodName,
        ...args
      );
      
      setResult(response);
    } catch (err) {
      console.error('Contract call failed:', err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error.message}</div>;

  return (
    <div className="contract-interaction">
      <h2>Contract Interaction</h2>
      <div className="interaction-form">
        <input
          type="text"
          placeholder="Method name"
          value={methodName}
          onChange={(e) => setMethodName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Arguments (comma separated)"
          onChange={(e) => setArgs(e.target.value.split(','))}
        />
        <button 
          onClick={handleCall}
          disabled={!account || !methodName}
        >
          Call Method
        </button>
      </div>
      
      {result && (
        <div className="result">
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ContractInteraction; 