import React from 'react';
import { useWeb3 } from '../providers/Web3Provider';

const ConnectWalletButton: React.FC = () => {
  const { account, connect, disconnect, isConnecting, error } = useWeb3();

  const handleClick = () => {
    if (account) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className="wallet-connection">
      <button 
        onClick={handleClick}
        disabled={isConnecting}
        className={`connect-button ${account ? 'connected' : ''}`}
      >
        {isConnecting ? 'Connecting...' : 
         account ? `Connected: ${account.slice(0,6)}...${account.slice(-4)}` : 
         'Connect Wallet'}
      </button>
      
      {error && (
        <div className="error-message">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton; 