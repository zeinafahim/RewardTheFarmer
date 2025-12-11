import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// ---------------------------------------------------------
// Middleware to protect routes (requires logged-in user)
// ---------------------------------------------------------
export const authMiddleware = (req, res, next) => {
  try {
    // 1. Extract token from Authorization header
    // Format must be:  Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Attach user info to request object
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next(); // Continue to controller

  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ---------------------------------------------------------
// Optional middleware: allow only admins
// ---------------------------------------------------------
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

// ---------------------------------------------------------
// Optional middleware: allow only collectors
// ---------------------------------------------------------
export const collectorOnly = (req, res, next) => {
  if (req.user?.role !== "collector") {
    return res.status(403).json({ message: "Access denied: Collectors only" });
  }
  next();
};
