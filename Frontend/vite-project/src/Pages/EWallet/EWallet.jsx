import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { eWalletAPI } from "../../api/EWallet.js";
import "./EWallet.css";

const EWallet = ( { user }) => {
  const [wallet, setWallet] = useState({ balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWallet = async () => {
    try {
      const data = await eWalletAPI.getWallet();
      setWallet(data.wallet);
      setTransactions(data.transactions);
    } catch (err) {
      console.error(err.message);
      alert("Failed to load wallet. Check backend.");
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const totalIncome = transactions
    .filter(tx => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter(tx => tx.amount < 0)
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const handleDeposit = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      const res = await eWalletAPI.deposit(Number(amount));
      setWallet(res.wallet);
      setTransactions([res.transaction, ...transactions]);
      setAmount("");
    } catch (err) {
      alert(err.message);
    } finally { setLoading(false); }
  };

  const handleWithdraw = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      const res = await eWalletAPI.withdraw(Number(amount));
      setWallet(res.wallet);
      setTransactions([res.transaction, ...transactions]);
      setAmount("");
    } catch (err) {
      alert(err.message);
    } finally { setLoading(false); }
  };

  const handleSend = async () => {
    if (!amount || !receiverId) return;
    setLoading(true);
    try {
      const res = await eWalletAPI.send(Number(amount), receiverId);
      setWallet(res.senderWallet);
      setTransactions([res.senderTxn, ...transactions]);
      setAmount(""); setReceiverId("");
    } catch (err) {
      alert(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="wallet-page-wrapper">
      <nav className="wallet-nav">
        <Link to="/dashboard" className="back-link"><i className="fa-solid fa-arrow-left"></i> Dashboard</Link>
        <span className="separator">/</span>
        <span className="current">E-Wallet</span>
      </nav>

      <header className="wallet-header responsive-header">
        <div className="header-left">
          <h1>My E-Wallet</h1>
          <p className="subtitle">Manage your agricultural earnings and payments</p>
        </div>
      </header>

      <div className="wallet-grid responsive-grid">
        <main className="wallet-main">
          <section className="balance-hero-card responsive-card">
            <div className="card-top">
              <div className="balance-box">
                <span className="label">Current Balance</span>
                <div className="amount-row">
                  <span className="currency">EGP</span>
                  <h2 className="amount">{Number(wallet.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                </div>
              </div>
            </div>

            <div className="card-bottom">
              <div className="card-actions responsive-actions">
                <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                <button className="action-btn primary" onClick={handleDeposit} disabled={loading}>Deposit</button>
                <button className="action-btn outline" onClick={handleWithdraw} disabled={loading}>Withdraw</button>
              </div>

              <div className="card-actions responsive-actions" style={{ marginTop: "0.5rem" }}>
                <input type="text" placeholder="Phone Number" value={receiverId} onChange={e => setReceiverId(e.target.value)} />
                <button className="action-btn outline" onClick={handleSend} disabled={loading}>Send</button>
              </div>
            </div>
          </section>

          

          <section className="activity-section">
            <div className="section-header">
              <h3>Recent Activity</h3>
              <Link to="/history" className="view-all-link">View All History</Link>
            </div>
            <div className="activity-list responsive-list">
              {transactions.length === 0 && <p></p>}
              {transactions.map(tx => (
                <div key={tx._id} className="activity-item">
                  <div className="item-details">
                    <div className="item-main">
                      <p className="item-name">{tx.type}</p>
                      <p className={`item-amount ${tx.amount > 0 ? "positive" : "negative"}`}>
                        {tx.amount > 0 ? "+" : "-"} EGP {Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="item-sub">
                      <span className="item-date">{new Date(tx.date).toLocaleString()}</span>
                      <span className="item-id">{tx._id}</span>
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
            <button className="add-method-btn"><i className="fa-solid fa-plus"></i> Add New Method</button>
          </div>

          
        </aside>
      </div>
    </div>
  );
};


export default EWallet;
