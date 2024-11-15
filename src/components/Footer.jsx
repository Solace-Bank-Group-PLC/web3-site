import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Solace Bank Group PLC</h3>
            <p>Leading the future of banking with Web3 technology</p>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><Link to="/3d-tour">Virtual Bank Tour</Link></li>
              <li><Link to="/wallet-integration">Web3 Wallet</Link></li>
              <li><Link to="/ai-assistant">AI Assistant</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/regulatory">Regulatory Information</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: contact@solacebankgroup.com</p>
            <p>Support: 24/7 Available</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Solace Bank Group PLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
