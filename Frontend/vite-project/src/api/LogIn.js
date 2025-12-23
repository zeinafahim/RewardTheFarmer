export const LogIn = {
  login: async (phone, password) => {
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Login failed");
    }

    return await res.json(); // { token: "..." }
  },
};
