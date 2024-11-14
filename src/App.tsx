import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PublicContent from './pages/PublicContent';
import UserDashboard from './pages/UserDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={PublicContent} />
            <Route path="/user-dashboard" component={UserDashboard} />
            <Route path="/employee-dashboard" component={EmployeeDashboard} />
            <Route path="/admin-dashboard" component={AdminDashboard} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;