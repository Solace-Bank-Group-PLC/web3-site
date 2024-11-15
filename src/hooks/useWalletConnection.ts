import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../providers/Web3Provider';

interface WalletConnectionState {
  isConnecting: boolean;
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  error: Error | null;
}

export const useWalletConnection = () => {
  const { provider, connect, disconnect } = useWeb3();
  const [state, setState] = useState<WalletConnectionState>({
    isConnecting: false,
    isConnected: false,
    address: null,
    chainId: null,
    error: null
  });

  const handleConnect = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isConnecting: true, error: null }));
      
      await connect();
      const signer = provider?.getSigner();
      const address = await signer?.getAddress();
      const network = await provider?.getNetwork();
      
      setState(prev => ({
        ...prev,
        isConnecting: false,
        isConnected: true,
        address: address || null,
        chainId: network?.chainId || null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error as Error
      }));
    }
  }, [connect, provider]);

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
      setState({
        isConnecting: false,
        isConnected: false,
        address: null,
        chainId: null,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error as Error
      }));
    }
  }, [disconnect]);

  useEffect(() => {
    if (provider) {
      provider.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setState(prev => ({
            ...prev,
            address: accounts[0],
            isConnected: true
          }));
        } else {
          handleDisconnect();
        }
      });

      provider.on('chainChanged', (chainId: number) => {
        setState(prev => ({
          ...prev,
          chainId
        }));
      });

      provider.on('disconnect', () => {
        handleDisconnect();
      });
    }

    return () => {
      if (provider) {
        provider.removeAllListeners();
      }
    };
  }, [provider, handleDisconnect]);

  return {
    ...state,
    connect: handleConnect,
    disconnect: handleDisconnect
  };
}; 