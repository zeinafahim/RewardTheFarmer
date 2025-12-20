const API_BASE = "http://localhost:3000/api";

export const Home = {
  // Fetch dashboard statistics
  getStats: async () => {
    const response = await fetch(`${API_BASE}/home/stats`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch stats");
    }

    return await response.json();
  },

  // Fetch impact/about data
  getImpact: async () => {
    const response = await fetch(`${API_BASE}/home/impact`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch impact data");
    }

    return await response.json();
  },

  // Optional: fetch contact info dynamically
  getContactInfo: async () => {
    const response = await fetch(`${API_BASE}/home/contact`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch contact info");
    }

    return await response.json();
  },
};
