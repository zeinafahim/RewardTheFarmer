const API_BASE = "http://localhost:3000/api"; 

export const Home2 = {
  // Get user dashboard info
  getUserDashboard: async (userId) => {
    const response = await fetch(`${API_BASE}/dashboard/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch user dashboard");
    }
    return response.json();
  },

  // Get wallet info
  getWalletInfo: async (userId) => {
    const response = await fetch(`${API_BASE}/dashboard/${userId}/wallet`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch wallet info");
    }
    return response.json();
  },

  // Get mini-stats
  getStats: async (userId) => {
    const response = await fetch(`${API_BASE}/dashboard/${userId}/stats`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch dashboard stats");
    }
    return response.json();
  },
};
