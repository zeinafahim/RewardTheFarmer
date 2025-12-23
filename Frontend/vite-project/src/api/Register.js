const API_BASE_URL = "http://localhost:3000/api/users/register";

export const Register = {
  // Register new user
  register: async ({ name, phone, password, role, governorate, village }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, password, role, governorate, village }),
        credentials: "include", // include cookies if backend uses them
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      return data; // expected registered user object
    } catch (error) {
      throw new Error(error.message || "Network error");
    }
  },

  // Optional: check if phone is already registered
  checkPhone: async (phone) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-phone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Phone check failed");
      }

      const data = await response.json();
      return data.exists; // true/false
    } catch (error) {
      throw new Error(error.message || "Network error");
    }
  }
};
