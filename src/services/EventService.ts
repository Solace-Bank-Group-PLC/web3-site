import { EventEmitter } from 'events';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

class EventService {
  private static instance: EventService;
  private emitter: EventEmitter;
  private web3: Web3 | null = null;
  private contracts: Map<string, Contract> = new Map();

  private constructor() {
    this.emitter = new EventEmitter();
  }

  static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  initialize(provider: any): void {
    this.web3 = new Web3(provider);
  }

  subscribeToEvent(
    contractAddress: string, 
    eventName: string, 
    callback: (error: Error | null, result?: any) => void
  ): void {
    try {
      const contract = this.contracts.get(contractAddress);
      if (!contract) throw new Error('Contract not found');

      contract.events[eventName]((error: Error, result: any) => {
        if (error) {
          callback(error);
        } else {
          callback(null, result);
        }
      });
    } catch (error) {
      console.error('Event subscription failed:', error);
      callback(error as Error);
    }
  }

  unsubscribeFromEvent(contractAddress: string, eventName: string): void {
    try {
      const contract = this.contracts.get(contractAddress);
      if (!contract) throw new Error('Contract not found');

      contract.events[eventName].unsubscribe();
    } catch (error) {
      console.error('Event unsubscription failed:', error);
    }
  }
}

export default EventService; 