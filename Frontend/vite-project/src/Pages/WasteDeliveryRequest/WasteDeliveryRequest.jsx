
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './WasteDeliveryRequest.css';

const WasteDelivery = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) return (
    <div className="waste-success-overlay animate-fade-in">
      <div className="success-modal">
        <div className="success-icon-wrapper bg-emerald-100 text-emerald-600">
          <i className="fa-solid fa-truck-fast"></i>
        </div>
        <h2>Request Confirmed</h2>
        <p>Excellent work, {user.name.split(' ')[0]}! A collection specialist will arrive at your location in the next 24-48 hours. Please ensure the waste is bundled for easy loading.</p>
        <Link to="/dashboard" className="btn-dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );

  return (
    <div className="waste-page-wrapper">
      <div className="waste-container">
        {/* Nav */}
        <nav className="waste-nav">
          <Link to="/dashboard" className="back-link">
            <i className="fa-solid fa-arrow-left"></i>
            <span>Dashboard</span>
          </Link>
          <span className="separator">/</span>
          <span className="current">Waste Delivery</span>
        </nav>

        <div className="waste-grid">
          {/* Main Form Content */}
          <main className="waste-form-content">
            <div className="form-header">
              <h1>Schedule a Collection</h1>
              <p>Turn your agricultural leftovers into income. We accept various types of crop waste.</p>
            </div>

            <form onSubmit={handleSubmit} className="waste-form">
              <section className="form-section">
                <h4 className="section-title">Waste Specifications</h4>
                <div className="form-row">
                  <div className="input-group">
                    <label>Waste Type</label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-leaf"></i>
                      <select required>
                        <option value="">Select Type</option>
                        <option>Rice Straw (EGP 1.5/kg)</option>
                        <option>Corn Stalks (EGP 1.2/kg)</option>
                        <option>Sugarcane Bagasse (EGP 1.8/kg)</option>
                        <option>Cotton Stalks (EGP 2.0/kg)</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Estimated Weight (Kg)</label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-weight-hanging"></i>
                      <input type="number" placeholder="500" min="50" step="10" required />
                    </div>
                  </div>
                </div>
              </section>

              <section className="form-section">
                <h4 className="section-title">Logistics & Location</h4>
                <div className="input-group full-width">
                  <label>Pickup Location</label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-location-dot"></i>
                    <input 
                      type="text" 
                      placeholder="Detailed address or GPS landmarks" 
                      defaultValue={`${user.village}, ${user.governorate}`} 
                      required 
                    />
                  </div>
                </div>
                <div className="input-group full-width mt-4">
                  <label>Special Instructions</label>
                  <div className="input-wrapper align-top">
                    <i className="fa-solid fa-comment-dots mt-3"></i>
                    <textarea 
                      placeholder="e.g. Near the north irrigation canal, gate code 1234..." 
                      rows={3}
                    ></textarea>
                  </div>
                </div>
              </section>

              <button type="submit" className="submit-waste-btn" disabled={loading}>
                {loading ? (
                  <><i className="fa-solid fa-circle-notch animate-spin"></i> Processing...</>
                ) : (
                  'Confirm Collection Request'
                )}
              </button>
            </form>
          </main>

          {/* Info Sidebar */}
          <aside className="waste-info">
            <div className="pricing-card">
              <h3 className="card-title">Current Pricing</h3>
              <div className="pricing-list">
                <div className="price-item">
                  <span>Rice Straw</span>
                  <span className="price">EGP 1.5</span>
                </div>
                <div className="price-item">
                  <span>Sugarcane</span>
                  <span className="price">EGP 1.8</span>
                </div>
              </div>
              <p className="pricing-note">*Prices are subject to verification after actual weighing.</p>
            </div>

            <div className="benefit-card bg-emerald-600 text-white">
              <h3>Why Recycle?</h3>
              <p>Recycling crop waste prevents open burning, improves local air quality, and puts money back in your pocket.</p>
              <div className="eco-badge">
                <i className="fa-solid fa-earth-africa"></i>
                <span>Environmental Impact +12%</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default WasteDelivery;
