const API_BASE = "http://localhost:3000/api/e-wallet";

export const EWallet = {
  // Get user wallet info including balance
  getWalletInfo: async (userId) => {
    const response = await fetch(`${API_BASE}/e-wallet/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch wallet info");
    }

    return await response.json();
  },

  // Get user transaction history
  getTransactions: async (userId) => {
    const response = await fetch(`${API_BASE}/transactions/user/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch transactions");
    }

    return await response.json();
  },

  // Deposit funds into wallet
  deposit: async (userId, amount) => {
    const response = await fetch(`${API_BASE}/e-wallet/deposit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userId, amount }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Deposit failed");
    }

    return await response.json();
  },

  // Withdraw funds from wallet
  withdraw: async (userId, amount) => {
    const response = await fetch(`${API_BASE}/e-wallet/withdraw`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userId, amount }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Withdrawal failed");
    }

    return await response.json();
  }
};
