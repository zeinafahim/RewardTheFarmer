import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';
import { LogIn } from '../../api/LogIn.js';

const Login = ({ onLoginSuccess }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call backend login API
      const data = await LogIn.login(phone, password);

      // Save token & user info
      localStorage.setItem('jwt', data.token);
      onLoginSuccess && onLoginSuccess(data.user);

      // Redirect to Home2
      navigate('/dashboard');

    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-auth-wrapper animate-fade-in">
      <div className="login-split-layout">

        {/* Left Side: Brand Visuals & Atmospheric Content */}
        <section className="login-visual-panel">
          <div className="panel-overlay"></div>
          <img 
            src="https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=1200" 
            alt="Field in sunlight" 
            className="panel-bg-image"
          />
          <div className="panel-content">
            <div className="brand-header">
              <i className="fa-solid fa-seedling brand-icon"></i>
              <h2 className="brand-name">RewardA<span className="brand-accent">Farmer</span></h2>
            </div>
            <div className="panel-text-block">
              <h1 className="panel-headline">Empowering those who feed the nation.</h1>
              <p className="panel-description">
                Log in to access your digital earnings, request equipment microloans, 
                and contribute to a zero-waste agricultural future.
              </p>
            </div>
          </div>
        </section>

        {/* Right Side: Modern Focused Form */}
        <section className="login-form-panel">
          <div className="form-wrapper">
            <header className="form-header">
              <h2 className="form-title">Welcome Back</h2>
              <p className="form-subtitle">Enter your credentials to manage your farm profile</p>
              {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            </header>

            <form onSubmit={handleSubmit} className="auth-form-body">
              <div className="auth-input-group">
                <label className="auth-label">Phone Number</label>
                <div className="input-container">
                  <i className="fa-solid fa-phone input-icon"></i>
                  <input 
                    type="tel"
                    className="auth-input" 
                    placeholder="01xxxxxxxxx" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label className="auth-label">Password</label>
                <div className="input-container">
                  <i className="fa-solid fa-lock input-icon"></i>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="auth-input" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button" 
                    className="toggle-visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <div className="form-utilities">
                <label className="rem-me">
                  <input type="checkbox" />
                  <span>Stay signed in</span>
                </label>
                <a href="#/forgot" className="forgot-link">Recover access</a>
              </div>

              <button type="submit" className="login-action-btn" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                    Authenticating...
                  </span>
                ) : (
                  <>Sign In <i className="fa-solid fa-arrow-right ml-2"></i></>
                )}
              </button>
            </form>

            <footer className="form-footer-nav">
              <p>New to the platform? <a href="#/register" className="register-redirect">Join the Community</a></p>
            </footer>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Login;
