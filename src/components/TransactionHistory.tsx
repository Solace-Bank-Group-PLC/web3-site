import React from 'react';
import { Table } from 'antd';
import { useTransactionHistory } from '../hooks/useTransactionHistory';
import { ethers } from 'ethers';
import { shortenAddress } from '../utils/address';
import { formatDate } from '../utils/date';

interface TransactionHistoryProps {
  address: string;
  maxTransactions?: number;
}

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ 
  address, 
  maxTransactions = 10 
}) => {
  const { transactions, loading } = useTransactionHistory(address, maxTransactions);

  const columns = [
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
      render: (hash: string) => shortenAddress(hash)
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (from: string) => shortenAddress(from)
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      render: (to: string) => shortenAddress(to)
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value: string) => `${ethers.formatEther(value)} ETH`
    },
    {
      title: 'Date',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: number) => formatDate(timestamp)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }
  ];

  return (
    <Table<Transaction>
      dataSource={transactions}
      columns={columns}
      loading={loading}
      rowKey="hash"
      pagination={{
        pageSize: maxTransactions,
        hideOnSinglePage: true
      }}
    />
  );
};

export default TransactionHistory; 