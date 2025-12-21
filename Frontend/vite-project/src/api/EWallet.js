const API_BASE = "http://localhost:3000/api/e-wallet";
const getToken = () => localStorage.getItem("jwt");

export const eWalletAPI = {
  getWallet: async () => {
    const res = await fetch(`${API_BASE}/info`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to fetch wallet");
    return res.json();
  },

  deposit: async (amount) => {
    const res = await fetch(`${API_BASE}/credit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ amount }),
    });
    if (!res.ok) throw new Error("Deposit failed");
    return res.json();
  },

  withdraw: async (amount) => {
    const res = await fetch(`${API_BASE}/debit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ amount }),
    });
    if (!res.ok) throw new Error("Withdraw failed");
    return res.json();
  },

  send: async (amount, receiverId) => {
    const res = await fetch(`${API_BASE}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ amount, receiverId }),
    });
    if (!res.ok) throw new Error("Send failed");
    return res.json();
  },
};
