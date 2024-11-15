import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { Button, message } from 'antd';

const NetworkSwitcher: React.FC = () => {
  const { provider, chainId } = useWeb3();

  const switchNetwork = async (targetChainId: string) => {
    try {
      if (!window.ethereum) {
        throw new Error('No Web3 provider found');
      }

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChainId }],
      });
    } catch (error) {
      if ((error as any).code === 4902) {
        // Chain not added, prompt to add it
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: targetChainId,
              rpcUrls: ['https://...'], // Add appropriate RPC URL
              chainName: 'Network Name',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18
              }
            }]
          });
        } catch (addError) {
          message.error('Failed to add network');
          console.error(addError);
        }
      } else {
        message.error('Failed to switch network');
        console.error(error);
      }
    }
  };

  return (
    <div className="network-switcher">
      <Button 
        onClick={() => switchNetwork('0x1')}
        type={chainId === 1 ? 'primary' : 'default'}
      >
        Mainnet
      </Button>
      <Button 
        onClick={() => switchNetwork('0x5')}
        type={chainId === 5 ? 'primary' : 'default'}
      >
        Goerli
      </Button>
    </div>
  );
};

export default NetworkSwitcher; 