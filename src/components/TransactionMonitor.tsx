import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { useTransactionHistory } from '../hooks/useTransactionHistory';
import { formatEther } from 'ethers/lib/utils';
import { shortenAddress } from '../utils/address';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

const TransactionMonitor: React.FC = () => {
  const { address } = useWeb3();
  const { transactions, loading, error } = useTransactionHistory(address, {
    maxTransactions: 10,
    autoWatch: true
  });
  const [pendingTxs, setPendingTxs] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!transactions) return;

    // Filter and sort transactions
    const pending = transactions
      .filter(tx => tx.status === 'pending')
      .sort((a, b) => b.timestamp - a.timestamp);

    setPendingTxs(pending);
  }, [transactions]);

  if (loading) {
    return <div className="loading">Loading transactions...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="transaction-monitor">
      <h3>Pending Transactions</h3>
      <div className="pending-transactions">
        {pendingTxs.length === 0 ? (
          <p>No pending transactions</p>
        ) : (
          pendingTxs.map(tx => (
            <div key={tx.hash} className="transaction-card">
              <div className="transaction-header">
                <span className="status pending">Pending</span>
                <span className="timestamp">
                  {new Date(tx.timestamp * 1000).toLocaleString()}
                </span>
              </div>
              <div className="transaction-details">
                <div className="detail-row">
                  <span>From:</span>
                  <span>{shortenAddress(tx.from)}</span>
                </div>
                <div className="detail-row">
                  <span>To:</span>
                  <span>{shortenAddress(tx.to)}</span>
                </div>
                <div className="detail-row">
                  <span>Value:</span>
                  <span>{formatEther(tx.value)} ETH</span>
                </div>
              </div>
              <div className="transaction-footer">
                <a 
                  href={`https://etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Etherscan
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionMonitor; 