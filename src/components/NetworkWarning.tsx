import React from 'react';
import { Alert } from 'antd';
import { useWeb3 } from '../contexts/Web3Context';

const NetworkWarning: React.FC = () => {
  const { chainId } = useWeb3();
  const requiredChainId = process.env.VITE_REQUIRED_CHAIN_ID || '1';

  if (!chainId || chainId.toString() !== requiredChainId) {
    return (
      <Alert
        message="Wrong Network"
        description={`Please connect to ${
          requiredChainId === '1' ? 'Ethereum Mainnet' : 'the required network'
        }`}
        type="warning"
        showIcon
        banner
      />
    );
  }

  return null;
};

export default NetworkWarning; 