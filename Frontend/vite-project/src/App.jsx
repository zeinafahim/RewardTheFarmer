import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from "./components/Navbar.jsx";
import Home from "./Pages/Home/Home.jsx";
import Home2 from "./Pages/Home2/Home2.jsx";
import Login from "./Pages/LogIn/LogIn.jsx";
import Register from "./Pages/Register/Register.jsx";
import LoanRequest from "./Pages/LoanRequest/LoanRequest.jsx";
import WasteDelivery from "./Pages/WasteDeliveryRequest/WasteDeliveryRequest.jsx";
import EWallet from "./Pages/EWallet/EWallet.jsx";
import TransactionHistory from "./Pages/TransactionHistory/TransactionHistory.jsx";

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("farmer_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("farmer_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("farmer_user");
  };

console.log("Current User State:", user);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />

          <Route 
            path="/register" 
            element={user ? <Navigate to="/dashboard" /> : <Register onRegisterSuccess={handleLoginSuccess} />} 
        />

          <Route
            path="/dashboard"
            element={user ? <Home2 user={user} /> : <Navigate to="/login" />}
          />

          <Route
            path="/loan-request"
            element={user ? <LoanRequest user={user} /> : <Navigate to="/login" />}
          />

          <Route
            path="/waste-delivery"
            element={user ? <WasteDelivery user={user} /> : <Navigate to="/login" />}
          />

          <Route
            path="/wallet"
            element={user ? <EWallet user={user} /> : <Navigate to="/login" />}
          />

          <Route
            path="/history"
            element={user ? <TransactionHistory user={user} /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
