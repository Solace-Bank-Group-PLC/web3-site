import React from 'react';
import { Alert, Spin } from 'antd';
import { useWeb3 } from '../providers/Web3Provider';

interface TransactionNotificationProps {
  hash?: string;
  loading?: boolean;
  error?: string | null;
  success?: boolean;
}

const TransactionNotification: React.FC<TransactionNotificationProps> = ({
  hash,
  loading,
  error,
  success
}) => {
  if (loading) {
    return (
      <div className="notification-container">
        <Spin />
        <p>Transaction in progress...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Transaction Failed"
        description={error}
        type="error"
        showIcon
        closable
      />
    );
  }

  if (success && hash) {
    return (
      <Alert
        message="Transaction Successful"
        description={
          <span>
            Transaction hash: {hash}
            <a 
              href={`https://etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Etherscan
            </a>
          </span>
        }
        type="success"
        showIcon
        closable
      />
    );
  }

  return null;
};

export default TransactionNotification; 