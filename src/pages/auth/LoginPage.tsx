import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async () => {
    try {
      setError(null);
      await login();
      navigate(from, { replace: true });
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome to Solace Bank</h1>
        <p>Connect your Web3 wallet to continue</p>
        
        <button 
          onClick={handleLogin}
          className="btn btn-primary"
        >
          Connect Wallet
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage; 