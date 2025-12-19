
import React from 'react';
import { Link } from 'react-router-dom';
import './Home2.css';

const Home2 = ({ user }) => {
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const dashboardActions = [
    { 
      id: 'loan', 
      name: 'Loan Request', 
      icon: 'fa-hand-holding-dollar', 
      color: 'blue', 
      desc: 'Get funding for seeds, tools, or livestock.', 
      link: '/loan-request',
      tag: 'Financial Aid'
    },
    { 
      id: 'waste', 
      name: 'Waste Delivery', 
      icon: 'fa-truck-field', 
      color: 'emerald', 
      desc: 'Schedule collection for agricultural waste.', 
      link: '/waste-delivery',
      tag: 'Sustainability'
    },
    { 
      id: 'wallet', 
      name: 'E-Wallet', 
      icon: 'fa-wallet', 
      color: 'amber', 
      desc: 'Check your balance and withdraw earnings.', 
      link: '/wallet',
      tag: 'Management'
    },
    { 
      id: 'history', 
      name: 'Transactions', 
      icon: 'fa-clock-rotate-left', 
      color: 'purple', 
      desc: 'Review your full earning and spending history.', 
      link: '/history',
      tag: 'Reports'
    },
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        
        {/* Header Section */}
        <header className="dashboard-header">
          <div className="header-text">
            <h1 className="greeting">{getTimeGreeting()}, {user.name.split(' ')[0]}!</h1>
            <p className="location-tag">
              <i className="fa-solid fa-location-dot"></i> {user.village}, {user.governorate}
            </p>
          </div>
          
        </header>

        {/* Overview Grid */}
        <section className="overview-section">
          <div className="balance-card">
            <div className="card-inner">
              <div className="balance-info">
                <span className="label">Total Wallet Balance</span>
                <h2 className="amount">EGP {user.walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
              </div>
              <div className="balance-icon">
                <i className="fa-solid fa-scale-balanced"></i>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/wallet" className="footer-link">View Wallet Details <i className="fa-solid fa-chevron-right"></i></Link>
            </div>
          </div>

          <div className="mini-stats">
            <div className="stat-tile">
              <span className="stat-label">Total Waste Requests</span>
              <span className="stat-value">2</span>
            </div>
            <div className="stat-tile">
              <span className="stat-label">Total Earned</span>
              <span className="stat-value text-emerald-600">EGP 4,250</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="actions-section">
          <div className="section-title-group">
            <h2 className="section-title">Farm Services</h2>
            <p className="section-subtitle">Manage your daily agricultural tasks and finances.</p>
          </div>

          <div className="actions-grid">
            {dashboardActions.map((action) => (
              <Link key={action.id} to={action.link} className={`action-card-wrapper action-${action.color}`}>
                <div className="action-card">
                  <div className="action-header">
                    <div className="action-icon">
                      <i className={`fa-solid ${action.icon}`}></i>
                    </div>
                    <span className="action-tag">{action.tag}</span>
                  </div>
                  <div className="action-content">
                    <h3 className="action-name">{action.name}</h3>
                    <p className="action-desc">{action.desc}</p>
                  </div>
                  <div className="action-arrow">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Tip Section for Laptop Space */}
        <footer className="dashboard-footer-tip">
          <div className="tip-box">
            <div className="tip-icon">
              <i className="fa-solid fa-lightbulb"></i>
            </div>
            <div className="tip-content">
              <h4>Quick Tip</h4>
              <p>Delivering rice straw early in the season can earn you a 5% bonus reward on your wallet!</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Home2;
