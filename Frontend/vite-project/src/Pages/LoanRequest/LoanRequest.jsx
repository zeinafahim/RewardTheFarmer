import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoanRequest.css';
import { LoanRequest } from '../../api/LoanRequest.js';

const Loanrequest = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [nationalId, setNationalId] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await LoanRequest.submitLoanRequest({
        name: user.name,
        mobile: user.phone,
        nationalId,
        amount,
        purpose,
      });

      setSuccess(true);
    } catch (error) {
      alert(error.message || 'Failed to submit loan request');
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="loan-success-overlay animate-fade-in">
      <div className="success-modal">
        <div className="success-icon-wrapper bg-blue-100 text-blue-600">
          <i className="fa-solid fa-paper-plane"></i>
        </div>
        <h2>Application Received</h2>
        <p>
          Thank you, {user.name.split(' ')[0]}. Your loan request is being reviewed
          by our scoring engine. You will receive a notification via SMS shortly.
        </p>
        <Link to="/dashboard" className="btn-dashboard">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );

  return (
    <div className="loan-page-wrapper">
      <div className="loan-container">
        <nav className="loan-nav">
          <Link to="/dashboard" className="back-link">
            <i className="fa-solid fa-arrow-left"></i>
            <span>Dashboard</span>
          </Link>
          <span className="separator">/</span>
          <span className="current">Loan Request</span>
        </nav>

        <div className="loan-grid">
          <aside className="loan-info">
            <div className="info-card bg-blue-600 text-white">
              <div className="info-header">
                <i className="fa-solid fa-circle-info"></i>
                <h3>Microloan Program</h3>
              </div>
              <p>
                Apply for up to EGP 20,000 for your seasonal farming needs. Our
                interest rates are tailored for small-scale Egyptian farmers.
              </p>
              <ul className="requirements-list">
                <li><i className="fa-solid fa-check"></i> Valid National ID</li>
                <li><i className="fa-solid fa-check"></i> Active Farm Location</li>
                <li><i className="fa-solid fa-check"></i> 24h Approval Process</li>
              </ul>
            </div>

            <div className="trust-badge">
              <i className="fa-solid fa-shield-halved"></i>
              <span>Secured by Agricultural Bank Protocols</span>
            </div>
          </aside>

          <main className="loan-form-content">
            <div className="form-header">
              <h1>Apply for Funding</h1>
              <p>Complete the form below to initiate your microloan application.</p>
            </div>

            <form onSubmit={handleSubmit} className="loan-form">
              <section className="form-section">
                <h4 className="section-title">Personal Details</h4>

                <div className="form-row">
                  <div className="input-group">
                    <label>Full Name</label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-user"></i>
                      <input type="text" defaultValue={user.name} disabled />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Mobile Number</label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-phone"></i>
                      <input type="text" defaultValue={user.phone} disabled />
                    </div>
                  </div>
                </div>

                <div className="input-group full-width">
                  <label>National ID (14 Digits)</label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-id-card"></i>
                    <input
                      type="text"
                      maxLength={14}
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="form-section">
                <h4 className="section-title">Loan Details</h4>

                <div className="form-row">
                  <div className="input-group">
                    <label>Requested Amount (EGP)</label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-money-bill-1"></i>
                      <input
                        type="number"
                        min="500"
                        max="50000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Purpose of Loan</label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-seedling"></i>
                      <select
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="seeds">Seeds & Fertilizer</option>
                        <option value="equipment">Farm Equipment</option>
                        <option value="livestock">Livestock Feed</option>
                        <option value="irrigation">Irrigation Improvement</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <button type="submit" className="submit-loan-btn" disabled={loading}>
                {loading ? (
                  <>
                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                    {' '}Processing...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Loanrequest;
