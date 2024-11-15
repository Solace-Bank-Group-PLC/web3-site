import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Solace Bank Group PLC</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/3d-tour" className={location.pathname === '/3d-tour' ? 'active' : ''}>
              Virtual Tour
            </Link>
          </li>
          <li>
            <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/regulatory" className={location.pathname === '/regulatory' ? 'active' : ''}>
              Regulatory Info
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
