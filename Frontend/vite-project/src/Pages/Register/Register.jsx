
import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    password: '', 
    role: 'farmer',
    governorate: '',
    village: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => window.location.hash = '#/login', 1800);
  };

  if (success) return (
    <div className="auth-success-wrapper animate-fade-in">
      <div className="success-modal">
        <div className="success-lottie-replacement">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <h2 className="text-3xl font-bold text-stone-900">Seeds Sown!</h2>
        <p className="mt-4 text-stone-500">Your account has been successfully created. We are preparing your dashboard...</p>
        <div className="redirect-loader mt-8">
          <div className="loader-bar"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="auth-page-wrapper register-bg animate-fade-in">
      <div className="auth-split-container">
        {/* Left Side: Branding & Image */}
        <div className="auth-visual-side">
          <div className="visual-overlay"></div>
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200" 
            alt="Farmers in field" 
            className="visual-img"
          />
          <div className="visual-content">
            <div className="visual-logo">
              <i className="fa-solid fa-seedling"></i>
              <span>RewardA<span className="text-white">Farmer</span></span>
            </div>
            <h1 className="visual-title">Join our growing community.</h1>
            <p className="visual-text">Join thousands of farmers turning agricultural waste into prosperity and securing their financial future.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-side">
          <div className="form-container wide-form">
            <header className="form-header">
              <h2 className="form-title">Create Account</h2>
              <p className="form-subtitle">Grow your farm with modern digital tools</p>
            </header>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-grid">
                <div className="form-group col-span-2">
                  <label className="form-label">Full Name</label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-user"></i>
                    <input 
                      type="text"
                      className="form-input" 
                      placeholder="Ahmed Mansour" 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-phone"></i>
                    <input 
                      type="tel"
                      className="form-input" 
                      placeholder="01xxxxxxxxx" 
                      onChange={e => setFormData({...formData, phone: e.target.value})} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Account Role</label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-briefcase"></i>
                    <select 
                      className="form-input appearance-none"
                      onChange={e => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="farmer">Farmer</option>
                      <option value="collector">Collector</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Governorate</label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-map-location-dot"></i>
                    <input 
                      type="text"
                      className="form-input" 
                      placeholder="Giza" 
                      onChange={e => setFormData({...formData, governorate: e.target.value})} 
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Village</label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-house-chimney"></i>
                    <input 
                      type="text"
                      className="form-input" 
                      placeholder="Badrasheen" 
                      onChange={e => setFormData({...formData, village: e.target.value})} 
                      required
                    />
                  </div>
                </div>

                <div className="form-group col-span-2">
                  <label className="form-label">Create Password</label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-lock"></i>
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder="Min. 8 characters" 
                      onChange={e => setFormData({...formData, password: e.target.value})} 
                      required 
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn">
                Complete Registration
              </button>
            </form>

            <footer className="form-footer">
              <p>Already have an account? <a href="#/login" className="auth-link">Log In</a></p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
