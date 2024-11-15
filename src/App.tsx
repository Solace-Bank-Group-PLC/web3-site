import React, { useState } from 'react';
import { Web3Provider } from './contexts/Web3Context';
import WalletIntegration from './components/WalletIntegration';
import NetworkSwitcher from './components/NetworkSwitcher';
import TransactionButton from './components/TransactionButton';

// Use type for function components
type AppProps = Record<string, never>; // Empty props object type

const App: React.FC<AppProps> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleTransaction = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Example transaction
      // Replace with your actual transaction logic
      throw new Error('Transaction not implemented');
    } catch (error) {
      // Add error handling
      console.error('Transaction failed:', error);
      throw error; // Re-throw if you want to handle it in the UI
    } finally {
      setIsLoading(false);
    }
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
          <TransactionButton 
            onClick={handleTransaction}
            // Add aria-label for accessibility
            aria-label="Send blockchain transaction"
          >
            Send Transaction
          </TransactionButton>
        </main>
      </div>
    </Web3Provider>
  );
};

export default App;