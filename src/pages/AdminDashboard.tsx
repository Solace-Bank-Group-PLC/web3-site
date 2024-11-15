import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalTransactions: number;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<SystemStats | null>(null);

  useEffect(() => {
    // TODO: Implement actual API calls
    const fetchSystemStats = async () => {
      const mockStats = {
        totalUsers: 1250,
        activeUsers: 450,
        totalTransactions: 3789
      };
      setStats(mockStats);
    };

    fetchSystemStats();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar role="admin" />
      <main className="dashboard-content">
        <h1>Admin Dashboard</h1>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>System Statistics</h2>
            {stats ? (
              <div className="stats-grid">
                <div className="stat-item">
                  <h3>Total Users</h3>
                  <p>{stats.totalUsers}</p>
                </div>
                <div className="stat-item">
                  <h3>Active Users</h3>
                  <p>{stats.activeUsers}</p>
                </div>
                <div className="stat-item">
                  <h3>Total Transactions</h3>
                  <p>{stats.totalTransactions}</p>
                </div>
              </div>
            ) : (
              <p>Loading statistics...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 