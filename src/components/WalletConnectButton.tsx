import React from 'react';
import { Button } from './ui/Button';
import { useWalletConnection } from '../hooks/useWalletConnection';
import { shortenAddress } from '../utils/address';

interface WalletConnectButtonProps {
  className?: string;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ 
  className 
}) => {
  const {
    isConnecting,
    isConnected,
    address,
    error,
    connect,
    disconnect
  } = useWalletConnection();

  if (error) {
    return (
      <Button 
        variant="error"
        className={className}
        onClick={connect}
      >
        Error: {error.message}
      </Button>
    );
  }

  if (isConnecting) {
    return (
      <Button 
        variant="secondary"
        className={className}
        disabled
      >
        Connecting...
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <Button
        variant="primary"
        className={className}
        onClick={disconnect}
      >
        {shortenAddress(address)}
      </Button>
    );
  }

  return (
    <Button
      variant="primary"
      className={className}
      onClick={connect}
    >
      Connect Wallet
    </Button>
  );
};

export default WalletConnectButton; 