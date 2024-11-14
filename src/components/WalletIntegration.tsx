import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const WalletIntegration: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);
        } catch (error) {
          console.error("User denied account access");
        }
      } else if (window.web3) {
        setWeb3(new Web3(window.web3.currentProvider));
      } else {
        console.log('No Web3 detected. Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      }
    };

    getAccount();
  }, [web3]);

  return (
    <div>
      <h2>Web3 Wallet Integration</h2>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <p>Please connect your Web3 wallet</p>
      )}
    </div>
  );
};

export default WalletIntegration;