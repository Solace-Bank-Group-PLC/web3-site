import React from 'react';
import { useWalletConnection } from '../hooks/useWalletConnection';
import { getNetworkName } from '../utils/networks';
import { formatEther } from 'ethers/lib/utils';
import { useBalance } from '../hooks/useBalance';

const WalletDetails: React.FC = () => {
  const { isConnected, address, chainId } = useWalletConnection();
  const { balance, loading: balanceLoading } = useBalance(address);

  if (!isConnected || !address) {
    return null;
  }

  return (
    <div className="wallet-details">
      <div className="wallet-info">
        <h3>Wallet Information</h3>
        <div className="info-row">
          <span>Address:</span>
          <span>{address}</span>
        </div>
        <div className="info-row">
          <span>Network:</span>
          <span>{chainId ? getNetworkName(chainId) : 'Unknown'}</span>
        </div>
        <div className="info-row">
          <span>Balance:</span>
          <span>
            {balanceLoading ? (
              'Loading...'
            ) : (
              `${formatEther(balance || '0')} ETH`
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletDetails; 