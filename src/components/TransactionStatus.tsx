import React from 'react';
import { useTransactionMonitor } from '../hooks/useTransactionMonitor';

interface TransactionStatusProps {
  hash: string;
  onConfirmed?: () => void;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({ 
  hash, 
  onConfirmed 
}) => {
  const status = useTransactionMonitor(hash);

  React.useEffect(() => {
    if (status?.status === 'confirmed' && onConfirmed) {
      onConfirmed();
    }
  }, [status, onConfirmed]);

  if (!status) {
    return null;
  }

  return (
    <div className="transaction-status">
      <div className={`status-indicator ${status.status}`}>
        {status.status === 'pending' && (
          <>
            <span className="spinner"></span>
            Transaction Pending
          </>
        )}
        {status.status === 'confirmed' && (
          <>
            <span className="check">✓</span>
            Transaction Confirmed
          </>
        )}
        {status.status === 'failed' && (
          <>
            <span className="error">✕</span>
            Transaction Failed
            {status.error && (
              <div className="error-message">
                {status.error.message}
              </div>
            )}
          </>
        )}
      </div>

      <div className="transaction-details">
        <a 
          href={`https://etherscan.io/tx/${hash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Etherscan
        </a>
      </div>
    </div>
  );
};

export default TransactionStatus; 