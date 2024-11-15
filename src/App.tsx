import React from 'react';
import { Web3Provider } from './contexts/Web3Context';
import WalletIntegration from './components/WalletIntegration';
import NetworkSwitcher from './components/NetworkSwitcher';
import TransactionButton from './components/TransactionButton';

const App: React.FC = () => {
  const handleTransaction = async () => {
    // Example transaction
    // Replace with your actual transaction logic
    throw new Error('Transaction not implemented');
  };

  return (
    <Web3Provider>
      <div className="app">
        <header className="app-header">
          <h1>Web3 DApp</h1>
          <div className="header-actions">
            <NetworkSwitcher />
            <WalletIntegration />
          </div>
        </header>
        
        <main className="app-main">
          <TransactionButton onClick={handleTransaction}>
            Send Transaction
          </TransactionButton>
        </main>
      </div>
    </Web3Provider>
  );
};

export default App;