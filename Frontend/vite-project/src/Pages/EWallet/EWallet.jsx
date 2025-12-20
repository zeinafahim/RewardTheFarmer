import React from "react";
import { Link } from "react-router-dom";
import "./EWallet.css";

const EWallet = ({ user }) => {
  if (!user) {
    return (
      <div className="wallet-page-wrapper">
        <div className="wallet-loading">
          <h2>Loading your wallet...</h2>
        </div>
      </div>
    );
  }

  const transactions = [
    {
      type: "Waste Reward",
      amount: 350,
      date: "Today, 2:45 PM",
      icon: "fa-leaf",
      color: "emerald",
      status: "Completed",
      id: "#WR-9921",
    },
    {
      type: "Loan Disbursement",
      amount: 5000,
      date: "Oct 22, 11:30 AM",
      icon: "fa-hand-holding-dollar",
      color: "blue",
      status: "Completed",
      id: "#LD-8812",
    },
    {
      type: "Withdrawal",
      amount: -200,
      date: "Oct 20, 09:15 AM",
      icon: "fa-arrow-up-right-from-square",
      color: "rose",
      status: "Completed",
      id: "#WD-7701",
    },
  ];

  return (
    <div className="wallet-page-wrapper">
      <div className="wallet-container">

        {/* Breadcrumb */}
        <nav className="wallet-nav">
          <Link to="/dashboard" className="back-link">
            <i className="fa-solid fa-arrow-left"></i> Dashboard
          </Link>
          <span className="separator">/</span>
          <span className="current">E-Wallet</span>
        </nav>

        {/* Header */}
        <header className="wallet-header responsive-header">
          <div className="header-left">
            <h1>My E-Wallet</h1>
            <p className="subtitle">
              Manage your agricultural earnings and payments
            </p>
          </div>
          <div className="header-right desktop-only">
            <button className="btn-secondary-outline">
              <i className="fa-solid fa-file-invoice-dollar"></i> Tax Report
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <div className="wallet-grid responsive-grid">

          {/* Left / Main Section */}
          <main className="wallet-main">

            {/* Balance Card */}
            <section className="balance-hero-card responsive-card">
              <div className="card-top">
                <div className="balance-box">
                  <span className="label">Current Balance</span>
                  <div className="amount-row">
                    <span className="currency">EGP</span>
                    <h2 className="amount">
                      {Number(user.walletBalance || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </h2>
                  </div>
                </div>
                <div className="chip-icon">
                  <i className="fa-solid fa-sim-card"></i>
                </div>
              </div>

              <div className="card-bottom">
                <div className="card-actions responsive-actions">
                  <button className="action-btn primary">
                    <i className="fa-solid fa-circle-plus"></i> Deposit
                  </button>
                  <button className="action-btn outline">
                    <i className="fa-solid fa-paper-plane"></i> Send
                  </button>
                  <button className="action-btn outline">
                    <i className="fa-solid fa-money-bill-transfer"></i> Withdraw
                  </button>
                </div>
              </div>

              <div className="card-pattern"></div>
            </section>

            {/* Stats Summary */}
            <section className="stats-summary responsive-summary">
              <div className="summary-card">
                <div className="icon-circle bg-emerald-50 text-emerald-600">
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
                <div className="summary-info">
                  <span className="label">Total Income</span>
                  <p className="value">+ EGP 12,450.00</p>
                </div>
              </div>

              <div className="summary-card">
                <div className="icon-circle bg-rose-50 text-rose-600">
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div className="summary-info">
                  <span className="label">Total Expenses</span>
                  <p className="value">- EGP 2,100.00</p>
                </div>
              </div>
            </section>

            {/* Recent Activity */}
            <section className="activity-section">
              <div className="section-header">
                <h3>Recent Activity</h3>
                <Link to="/history" className="view-all-link">View All History</Link>
              </div>

              <div className="activity-list responsive-list">
                {transactions.map((txn, i) => (
                  <div key={i} className="activity-item">
                    <div className={`icon-box bg-${txn.color}-100 text-${txn.color}-600`}>
                      <i className={`fa-solid ${txn.icon}`}></i>
                    </div>

                    <div className="item-details">
                      <div className="item-main">
                        <p className="item-name">{txn.type}</p>
                        <p className={`item-amount ${txn.amount > 0 ? "positive" : "negative"}`}>
                          {txn.amount > 0 ? "+" : ""}{txn.amount.toLocaleString()} EGP
                        </p>
                      </div>
                      <div className="item-sub">
                        <span className="item-date">{txn.date}</span>
                        <span className="item-id">{txn.id}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Right Sidebar */}
          <aside className="wallet-sidebar desktop-only">
            <div className="payment-methods-card">
              <h3>Payment Methods</h3>

              <div className="method-item active">
                <div className="method-icon bg-blue-600">
                  <i className="fa-solid fa-wallet text-white"></i>
                </div>
                <div className="method-info">
                  <p className="name">Vodafone Cash</p>
                  <p className="detail">Primary Account</p>
                </div>
                <i className="fa-solid fa-circle-check text-emerald-500"></i>
              </div>

              <button className="add-method-btn">
                <i className="fa-solid fa-plus"></i> Add New Method
              </button>
            </div>

            <div className="referral-box">
              <div className="referral-content">
                <h4>Invite a Farmer</h4>
                <p>Earn EGP 50 for every neighbor you bring to the platform.</p>
                <button className="btn-refer">Get Link</button>
              </div>
              <div className="referral-img">
                <i className="fa-solid fa-users-viewfinder"></i>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EWallet;
