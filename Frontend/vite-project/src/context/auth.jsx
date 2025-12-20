// src/api/auth.api.js
import axios from "axios";

// Base URL of your backend
const API_BASE = "http://localhost:3000/api/users"; // Adjust if needed

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------- AUTH API -------------------- //
export const authAPI = {
  // Register a new user
  register: async (name, phone, password, role, governorate, village) => {
    const res = await api.post("/register", {
      name,
      phone,
      password,
      role,
      governorate,
      village,
    });
    return res.data;
  },

  // Login
  login: async (phone, password) => {
    const res = await api.post("/login", { phone, password });
    // Return token to store in localStorage
    const { token } = res.data;
    localStorage.setItem("jwt", token);
    return res.data;
  },

  // Logout
  logout: async () => {
    localStorage.removeItem("jwt");
    return true;
  },

  // Get current user (protected route)
  getCurrentUser: async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return null;

    try {
      const res = await api.get("/current", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } 
    catch (err) {
      console.error(err.response?.data || err.message);
      localStorage.removeItem("jwt");
      return null;
    }
  },
};