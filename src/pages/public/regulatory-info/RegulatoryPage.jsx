import React from 'react';

const RegulatoryPage = () => {
  return (
    <div className="container">
      <h1>Regulatory Information</h1>
      <section className="regulatory-section">
        <h2>Banking License</h2>
        <p>Solace Bank Group PLC is authorized by the Financial Conduct Authority and regulated by the Prudential Regulation Authority.</p>
        
        <h2>Deposit Protection</h2>
        <p>Your eligible deposits are protected up to £85,000 by the Financial Services Compensation Scheme (FSCS).</p>
        
        <h2>Web3 Compliance</h2>
        <p>Our Web3 operations comply with:</p>
        <ul>
          <li>Financial Action Task Force (FATF) guidelines</li>
          <li>Anti-Money Laundering (AML) regulations</li>
          <li>Know Your Customer (KYC) requirements</li>
        </ul>
        
        <h2>Data Protection</h2>
        <p>We are registered with the Information Commissioner's Office and comply with GDPR requirements.</p>
      </section>
    </div>
  );
};

export default RegulatoryPage;
