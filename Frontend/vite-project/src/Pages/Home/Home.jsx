
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=2000" 
          className="hero-bg"
          alt="Lush green farmland"
        />
        <div className="container hero-content">
          <div className="hero-text-box">
            <span className="badge">Revolutionizing Agriculture</span>
            <h1 className="hero-title">
              Nurture the Earth, <br/>
              <span className="text-emerald-400">Harvest Rewards.</span>
            </h1>
            <p className="hero-subtitle">
              The all-in-one platform for modern farmers. Turn agricultural waste into digital currency, access instant microloans, and grow your future.
            </p>
            <div className="hero-actions">
              <a href="#/register" className="btn btn-primary">
                Join our Community <i className="fa-solid fa-arrow-right ml-2"></i>
              </a>
              <a href="#/login" className="btn btn-glass">
                Partner Sign In
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Statistics Bar */}
        <section className="stats-bar">
          <div className="container stats-grid">
            <div className="stat-item">
              <span className="stat-number">5K+</span>
              <span className="stat-label">Active Farmers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12K</span>
              <span className="stat-label">Tons Recycled</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">EGP 2M</span>
              <span className="stat-label">Rewards Paid</span>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="about" className="section process-section">
          <div className="container">
            <div className="section-header">
              
              <h2 className="section-title">Three Simple Steps to Success</h2>
            </div>
            <div className="process-grid">
              <div className="process-card">
                <div className="process-icon bg-emerald-100 text-emerald-600">
                  <i className="fa-solid fa-user-plus"></i>
                </div>
                <h3>1. Register</h3>
                <p>Create your profile as a farmer or collector in less than 2 minutes.</p>
              </div>
              <div className="process-card">
                <div className="process-icon bg-amber-100 text-amber-600">
                  <i className="fa-solid fa-truck-pickup"></i>
                </div>
                <h3>2. Deliver Waste</h3>
                <p>Schedule a pickup for your crop waste like straw or stalks.</p>
              </div>
              <div className="process-card">
                <div className="process-icon bg-blue-100 text-blue-600">
                  <i className="fa-solid fa-coins"></i>
                </div>
                <h3>3. Earn & Grow</h3>
                <p>Receive rewards in your e-wallet instantly or apply for microloans.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About / Impact Section */}
        <section className="section impact-section bg-stone-50">
          <div className="container impact-grid">
            <div className="impact-image-box">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" 
                className="impact-img" 
                alt="Farmer working" 
              />
              
            </div>
            <div className="impact-content">
              <h2 className="section-title">About</h2>
              <p className="text-lead">
                Farmers struggle with accumulating agricultural waste that has little value and limited recycling access. Our solution is a digital platform that connects them directly to recycling facilities, turning their waste into income while giving them easy financial tools to support their farming needs. 
              </p>
              <div className="impact-content">
      
     
    </div>
              
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <div className="section-header text-center">
             
              <h2 className="section-title">We're Here to Help You Thrive</h2>
              <p className="section-desc">Our support team is available 24/7 to assist with your requests.</p>
            </div>
            <div className="contact-grid">
              <div className="contact-info-card">
                <div className="contact-icon bg-emerald-600"><i className="fa-solid fa-phone"></i></div>
                <h4>Call Support</h4>
                <p>+20 123 456 7890</p>
              </div>
              <div className="contact-info-card">
                <div className="contact-icon bg-amber-500"><i className="fa-solid fa-envelope"></i></div>
                <h4>Email Support</h4>
                <p>help@rewardafarmer.com</p>
              </div>
              <div className="contact-info-card">
                <div className="contact-icon bg-stone-800"><i className="fa-solid fa-location-dot"></i></div>
                <h4>Main Office</h4>
                <p>Agricultural Plaza, Dokki, Cairo</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <h3>RewardA<span>Farmer</span></h3>
            <p>Building a sustainable future for agriculture in Egypt.</p>
          </div>
          <div className="footer-links">
            <a href="#/">Privacy Policy</a>
            <a href="#/">Terms of Service</a>
            <a href="#/">FAQ</a>
          </div>
          <p className="copyright">&copy; 2024 Reward A Farmer. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
