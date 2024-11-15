import React from 'react';
import { useContractEvent } from '../hooks/useContractEvent';
import { Contract } from 'web3-eth-contract';

interface EventLogProps {
  contract: Contract;
  eventName: string;
  maxEvents?: number;
}

const EventLog: React.FC<EventLogProps> = ({ 
  contract, 
  eventName,
  maxEvents = 50 
}) => {
  const { events, error } = useContractEvent({ contract, eventName });

  const displayEvents = maxEvents ? events.slice(-maxEvents) : events;

  return (
    <div className="event-log">
      <h3>Event Log: {eventName}</h3>
      
      {error && (
        <div className="error-message">
          Failed to load events: {error.message}
        </div>
      )}

      <div className="event-list">
        {displayEvents.map((event, index) => (
          <div key={`${event.id || event.blockNumber}-${index}`} className="event-item">
            <div className="event-header">
              <span className="block-number">
                Block: {event.blockNumber}
              </span>
              <span className="transaction-hash">
                Tx: {event.transactionHash.slice(0, 10)}...
              </span>
            </div>
            <pre className="event-data">
              {JSON.stringify(event.returnValues, null, 2)}
            </pre>
          </div>
        ))}
        
        {displayEvents.length === 0 && (
          <div className="no-events">
            No events found
          </div>
        )}
      </div>
    </div>
  );
};

export default EventLog; 