import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { ethers } from 'ethers';

interface TransactionButtonProps {
  onClick: () => Promise<ethers.ContractTransaction>;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const TransactionButton: React.FC<TransactionButtonProps> = ({
  onClick,
  children,
  className = '',
  disabled = false,
}) => {
  const { account } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!account) {
      setError('Please connect your wallet');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const tx = await onClick();
      await tx.wait();
    } catch (err: any) {
      setError(err.message || 'Transaction failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="transaction-button-container">
      <button
        className={`transaction-button ${className}`}
        onClick={handleClick}
        disabled={disabled || isLoading}
      >
        {isLoading ? 'Processing...' : children}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}; 