const API_BASE = "http://localhost:3000/api/microloans";

export const LoanRequest = {
  /**
   * Submit a loan request
   */
  submitLoanRequest: async ({
    nationalId,
    amount,
    purpose,
  }) => {
    const response = await fetch(`${API_BASE}/loans/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        nationalId,
        amount,
        purpose,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Loan application failed");
    }

    return await response.json();
  },

  /**
   * Get current user's loan applications
   */
  getMyLoans: async () => {
    const response = await fetch(`${API_BASE}/loans/my-loans`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch loans");
    }

    return await response.json();
  },

  /**
   * Get loan details by ID
   */
  getLoanById: async (loanId) => {
    const response = await fetch(`${API_BASE}/loans/${loanId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch loan details");
    }

    return await response.json();
  },
};
