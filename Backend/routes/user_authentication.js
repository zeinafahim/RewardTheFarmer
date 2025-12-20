import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  removeUser
} from "../controllers/user_authentication.js";
import { authMiddleware } from "../middleware/authentication.js";

const router = express.Router();

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// GET CURRENT USER
router.get("/current", authMiddleware, async (req, res) => {
  try {
    const user = await user.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE PROFILE
router.put("/update", authMiddleware, updateUser);

// DELETE USER
router.delete("/:id", authMiddleware, removeUser);

export default router;
