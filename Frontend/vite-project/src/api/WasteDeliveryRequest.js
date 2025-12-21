const API_BASE_URL = "http://localhost:3000/api/waste-delivery";

export const WasteAPI = {
  // Create a new waste delivery request
  createRequest: async (requestData) => {
    try {
      // ✅ Fixed endpoint: remove "/waste-requests" to match backend
      const response = await fetch(`${API_BASE_URL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // include cookies if backend uses them
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit waste request");
      }

      const data = await response.json();
      return data; // expected: created request object
    } catch (error) {
      throw new Error(error.message || "Network error");
    }
  },

  // Optional: Get all waste requests for the current user
  getRequests: async () => {
    try {
      // ✅ Fixed endpoint: remove "/waste-requests" to match backend
      const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch waste requests");
      }

      const data = await response.json();
      return data; // expected: array of request objects
    } catch (error) {
      throw new Error(error.message || "Network error");
    }
  },
};
