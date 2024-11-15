import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { ethers } from 'ethers';

interface Web3StatusProps {
  showBalance?: boolean;
}

const Web3Status: React.FC<Web3StatusProps> = ({ showBalance = true }) => {
  const { account, chainId, provider } = useWeb3();
  const [balance, setBalance] = useState<string>('0');
  const [network, setNetwork] = useState<string>('');

  useEffect(() => {
    const fetchBalance = async () => {
      if (provider && account) {
        try {
          const balance = await provider.getBalance(account);
          setBalance(ethers.formatEther(balance));
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    const fetchNetwork = async () => {
      if (provider) {
        try {
          const network = await provider.getNetwork();
          setNetwork(network.name);
        } catch (error) {
          console.error('Error fetching network:', error);
        }
      }
    };

    fetchBalance();
    fetchNetwork();
  }, [provider, account]);

  if (!account) {
    return <div>Not connected</div>;
  }

  return (
    <div className="web3-status">
      <div className="account">
        Connected: {account.substring(0, 6)}...{account.substring(38)}
      </div>
      {showBalance && (
        <div className="balance">
          Balance: {parseFloat(balance).toFixed(4)} ETH
        </div>
      )}
      <div className="network">
        Network: {network} (Chain ID: {chainId})
      </div>
    </div>
  );
};

export default Web3Status; 