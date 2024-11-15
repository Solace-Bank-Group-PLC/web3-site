import { useState, useEffect } from 'react';
import { Contract } from 'web3-eth-contract';
import EventListenerService from '../services/EventListenerService';

interface UseContractEventProps {
  contract: Contract | null;
  eventName: string;
}

export const useContractEvent = ({ contract, eventName }: UseContractEventProps) => {
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!contract) return;

    let subscriptionId: string;
    const eventService = EventListenerService.getInstance();

    try {
      subscriptionId = eventService.subscribeToContractEvent(
        contract,
        eventName,
        (err, event) => {
          if (err) {
            setError(err);
          } else if (event) {
            setEvents(prev => [...prev, event]);
          }
        }
      );
    } catch (err) {
      setError(err as Error);
    }

    return () => {
      if (subscriptionId) {
        eventService.unsubscribeFromEvent(subscriptionId);
      }
    };
  }, [contract, eventName]);

  return { events, error };
}; 