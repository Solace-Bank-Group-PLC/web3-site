import { Contract } from 'web3-eth-contract';
import { EventEmitter } from 'events';

interface EventSubscription {
  contract: Contract;
  eventName: string;
  callback: (error: Error | null, event?: any) => void;
}

class EventListenerService {
  private static instance: EventListenerService;
  private emitter: EventEmitter;
  private subscriptions: Map<string, EventSubscription>;

  private constructor() {
    this.emitter = new EventEmitter();
    this.subscriptions = new Map();
  }

  static getInstance(): EventListenerService {
    if (!EventListenerService.instance) {
      EventListenerService.instance = new EventListenerService();
    }
    return EventListenerService.instance;
  }

  subscribeToContractEvent(
    contract: Contract,
    eventName: string,
    callback: (error: Error | null, event?: any) => void
  ): string {
    const subscriptionId = `${contract.options.address}-${eventName}-${Date.now()}`;
    
    try {
      contract.events[eventName]((error: Error, event: any) => {
        if (error) {
          callback(error);
        } else {
          callback(null, event);
        }
      });

      this.subscriptions.set(subscriptionId, {
        contract,
        eventName,
        callback
      });

      return subscriptionId;
    } catch (error) {
      console.error('Failed to subscribe to event:', error);
      throw error;
    }
  }

  unsubscribeFromEvent(subscriptionId: string): void {
    const subscription = this.subscriptions.get(subscriptionId);
    if (subscription) {
      const { contract, eventName } = subscription;
      contract.events[eventName].unsubscribe();
      this.subscriptions.delete(subscriptionId);
    }
  }

  unsubscribeAll(): void {
    this.subscriptions.forEach((subscription, id) => {
      this.unsubscribeFromEvent(id);
    });
  }
}

export default EventListenerService; 