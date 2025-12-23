
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TransactionHistory.css';
import { eWalletAPI } from '../../api/EWallet.js';

const TransactionHistory = ({ user }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await eWalletAPI.getWallet();
        setTransactions(data.transactions || []);
      } catch (err) {
        setError(err.message || 'Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const fmtDate = (iso) => ({
    date: new Date(iso).toLocaleDateString(),
    time: new Date(iso).toLocaleTimeString()
  });

  const displayType = (t) => t ? t.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Unknown';

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
                {loading && (
                  <tr><td colSpan="6">Loading transactions...</td></tr>
                )}
                {error && (
                  <tr><td colSpan="6">Error: {error}</td></tr>
                )}
                {!loading && !error && transactions.length === 0 && (
                  <tr><td colSpan="6">No transactions yet.</td></tr>
                )}
                {!loading && transactions.map((txn) => {
                  const { date, time } = fmtDate(txn.date || txn.createdAt || txn.updatedAt || Date.now());
                  return (
                    <tr key={txn._id}>
                      <td>
                        <span className="txn-id">{txn._id}</span>
                      </td>
                      <td>
                        <div className="date-box">
                          <span className="date">{date}</span>
                          <span className="time">{time}</span>
                        </div>
                      </td>
                      <td>
                        <div className="type-badge">
                          <i className={`fa-solid ${txn.type && txn.type.toLowerCase().includes('reward') ? 'fa-leaf text-emerald-500' : txn.type && txn.type.toLowerCase().includes('loan') ? 'fa-building-columns text-blue-500' : 'fa-wallet text-stone-500'}`}></i>
                          <span>{displayType(txn.type)}</span>
                        </div>
                      </td>
                      <td>
                        <span className="txn-desc">{txn.description || txn.desc || (txn.metadata && txn.metadata.note) || '-'}</span>
                      </td>
                      <td>
                        <span className={`txn-amount ${txn.amount > 0 ? 'positive' : 'negative'}`}>
                          {txn.amount > 0 ? '+' : '-'}{Math.abs(txn.amount).toLocaleString()} EGP
                        </span>
                      </td>
                      <td>
                        <div className="status-indicator">
                          <span className="status-dot"></span>
                          {txn.status ? txn.status.charAt(0).toUpperCase() + txn.status.slice(1) : 'N/A'}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <p className="results-count">Showing {transactions.length} transactions</p>
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
