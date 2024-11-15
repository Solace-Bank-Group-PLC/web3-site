import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';

const WalletIntegration: React.FC = () => {
  const { 
    account, 
    chainId, 
    connect, 
    disconnect, 
    isConnecting, 
    error 
  } = useWeb3();

  return (
    <div className="wallet-integration">
      <h2>Web3 Wallet Integration</h2>
      
      {error && (
        <div className="error-message">
          {error.message}
        </div>
      )}

      {account ? (
        <div className="wallet-info">
          <p>Connected Account: {account}</p>
          <p>Chain ID: {chainId}</p>
          <button 
            onClick={disconnect}
            className="disconnect-button"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button 
          onClick={connect}
          disabled={isConnecting}
          className="connect-button"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
};

export default WalletIntegration;