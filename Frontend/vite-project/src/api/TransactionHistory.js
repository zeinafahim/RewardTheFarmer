const API_BASE_URL = "http://localhost:3000/api/transactions";

export const TransactionHistory = {
  // Get all transactions for the current user
  getTransactions: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // include cookies if backend uses them
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch transactions");
      }

      const data = await response.json();
      return data; // expected array of transaction objects
    } catch (error) {
      throw new Error(error.message || "Network error");
    }
  },

  // Optional: Get transactions filtered by type
  getTransactionsByType: async (type) => {
    try {
      const response = await fetch(`${API_BASE_URL}?type=${type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch transactions");
      }

      const data = await response.json();
      return data; // expected array of transaction objects
    } catch (error) {
      throw new Error(error.message || "Network error");
    }
  },
};
