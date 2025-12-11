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

// UPDATE PROFILE (ONLY LOGGED-IN USER)
router.put("/update", authMiddleware, updateUser);

// DELETE USER (ADMIN OR SELF)
router.delete("/:id", authMiddleware, removeUser);

export default router;
