import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Environment3D from '../components/Environment3D';

interface WalletInfo {
  address: string;
  balance: string;
}

const UserDashboard: React.FC = () => {
  const { user, walletAddress } = useAuth();
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletInfo = async () => {
      if (!walletAddress) return;
      
      try {
        // TODO: Implement Web3 wallet balance check
        const mockWalletInfo = {
          address: walletAddress,
          balance: '0.0 ETH'
        };
        
        setWalletInfo(mockWalletInfo);
      } catch (error) {
        console.error('Error fetching wallet info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletInfo();
  }, [walletAddress]);

  return (
    <div className="dashboard-container">
      <Sidebar role="user" />
      <main className="dashboard-content">
        <h1>Welcome, {user?.address}</h1>
        
        <div className="dashboard-grid">
          <div className="dashboard-card wallet-info">
            <h2>Wallet Information</h2>
            {loading ? (
              <p>Loading wallet information...</p>
            ) : walletInfo ? (
              <>
                <p>Address: {walletInfo.address}</p>
                <p>Balance: {walletInfo.balance}</p>
              </>
            ) : (
              <p>No wallet connected</p>
            )}
          </div>

          <div className="dashboard-card">
            <h2>3D Environment</h2>
            <div className="environment-container">
              <Environment3D />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard; 