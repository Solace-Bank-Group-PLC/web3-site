import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import TransactionService from '../services/TransactionService';
import { ethers } from 'ethers';

interface TransactionFormProps {
  onSuccess?: (txHash: string) => void;
  onError?: (error: Error) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSuccess, onError }) => {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { provider } = useWeb3();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!ethers.isAddress(to)) throw new Error('Invalid address');
      if (!provider) throw new Error('No provider available');

      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(amount)
      });

      await tx.wait();
      onSuccess?.(tx.hash);
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Transaction failed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-group">
        <label htmlFor="to">To Address:</label>
        <input
          id="to"
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="0x..."
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount (ETH):</label>
        <input
          id="amount"
          type="number"
          step="0.000000000000000001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Transaction'}
      </button>
    </form>
  );
};

export default TransactionForm; 