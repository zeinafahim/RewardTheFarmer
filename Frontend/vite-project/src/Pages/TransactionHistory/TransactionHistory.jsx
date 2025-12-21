
import React from 'react';
import { Link } from 'react-router-dom';
import './TransactionHistory.css';

const TransactionHistory = ({ user }) => {
  const transactions = [
    { id: 'TXN-9021', type: 'Waste Reward', desc: 'Rice Straw - 500kg', amount: 750, status: 'Completed', date: 'Oct 24, 2024', time: '14:20' },
    { id: 'TXN-8812', type: 'Withdrawal', desc: 'Vodafone Cash', amount: -200, status: 'Completed', date: 'Oct 22, 2024', time: '11:05' },
    { id: 'TXN-8700', type: 'Loan Repayment', desc: 'Microloan P1', amount: -500, status: 'Completed', date: 'Oct 15, 2024', time: '09:45' },
    { id: 'TXN-8544', type: 'Waste Reward', desc: 'Corn Stalks - 200kg', amount: 300, status: 'Completed', date: 'Oct 10, 2024', time: '16:30' },
    { id: 'TXN-8421', type: 'Loan Disbursement', desc: 'Equipment Loan', amount: 5000, status: 'Completed', date: 'Oct 01, 2024', time: '13:12' },
  ];

  return (
    <div className="history-page-wrapper">
      <div className="history-container">
        {/* Breadcrumbs */}
        <nav className="history-nav">
          <Link to="/dashboard" className="back-link">
            <i className="fa-solid fa-arrow-left"></i>
            <span>Dashboard</span>
          </Link>
          <span className="separator">/</span>
          <span className="current">Transaction History</span>
        </nav>
        
        <header className="history-header">
          <div className="header-nav">
            <h1>{user.name}'sTransaction History</h1>
          </div>
          
        </header>

        <section className="filter-pills">
          <button className="pill active">All Activity</button>
          <button className="pill">Rewards</button>
          <button className="pill">Withdrawals</button>
          <button className="pill">Loans</button>
        </section>

        <main className="table-card">
          <div className="table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date & Time</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td>
                      <span className="txn-id">{txn.id}</span>
                    </td>
                    <td>
                      <div className="date-box">
                        <span className="date">{txn.date}</span>
                        <span className="time">{txn.time}</span>
                      </div>
                    </td>
                    <td>
                      <div className="type-badge">
                        <i className={`fa-solid ${txn.type.includes('Reward') ? 'fa-leaf text-emerald-500' : txn.type.includes('Loan') ? 'fa-building-columns text-blue-500' : 'fa-wallet text-stone-500'}`}></i>
                        <span>{txn.type}</span>
                      </div>
                    </td>
                    <td>
                      <span className="txn-desc">{txn.desc}</span>
                    </td>
                    <td>
                      <span className={`txn-amount ${txn.amount > 0 ? 'positive' : 'negative'}`}>
                        {txn.amount > 0 ? '+' : ''}{txn.amount.toLocaleString()} EGP
                      </span>
                    </td>
                    <td>
                      <div className="status-indicator">
                        <span className="status-dot"></span>
                        {txn.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <p className="results-count">Showing {transactions.length} of 42 transactions</p>
            <div className="pagination">
              <button disabled><i className="fa-solid fa-angle-left"></i></button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button><i className="fa-solid fa-angle-right"></i></button>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default TransactionHistory;
