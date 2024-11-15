import { useEffect, useRef } from 'react';

export function useWeb3Subscription(provider: BrowserProvider) {
  const subscriptions = useRef<any[]>([]);

  useEffect(() => {
    const sub1 = provider.on('block', (blockNumber) => {
      // Handle new block
    });

    const sub2 = provider.on('pending', (tx) => {
      // Handle pending transaction
    });

    subscriptions.current.push(sub1, sub2);

    return () => {
      subscriptions.current.forEach(sub => {
        provider.removeListener(sub.event, sub.listener);
      });
      subscriptions.current = [];
    };
  }, [provider]);
}