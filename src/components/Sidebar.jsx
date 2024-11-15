import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ role = 'user' }) => {
  const getMenuItems = () => {
    switch (role) {
      case 'admin':
        return [
          { path: '/admin-dashboard', label: 'Dashboard', icon: '📊' },
          { path: '/admin-dashboard/users', label: 'User Management', icon: '👥' },
          { path: '/admin-dashboard/security', label: 'Security Controls', icon: '🔒' },
          { path: '/admin-dashboard/analytics', label: 'Analytics', icon: '📈' },
          { path: '/admin-dashboard/cms', label: 'CMS', icon: '📝' }
        ];
      case 'employee':
        return [
          { path: '/employee-dashboard', label: 'Dashboard', icon: '📊' },
          { path: '/employee-dashboard/customers', label: 'Customers', icon: '👥' },
          { path: '/employee-dashboard/accounts', label: 'Accounts', icon: '💳' },
          { path: '/employee-dashboard/training', label: 'Training', icon: '📚' }
        ];
      default:
        return [
          { path: '/user-dashboard', label: 'Dashboard', icon: '📊' },
          { path: '/user-dashboard/wallet', label: 'Wallet', icon: '💰' },
          { path: '/user-dashboard/3d-environment', label: '3D Space', icon: '🌐' },
          { path: '/user-dashboard/ai-assistant', label: 'AI Assistant', icon: '🤖' }
        ];
    }
  };

  return (
    <aside className="sidebar">
      <nav>
        {getMenuItems().map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
