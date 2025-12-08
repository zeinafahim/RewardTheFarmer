// ...existing code...
import express from "express";
import User from "../models/user_authentication.js";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Helper functions (keep for reuse by other modules)
 */
export async function newUser(data) {
  const { name, phone, password, role, governorate, village } = data;
  if (!name || !phone || !password) throw new Error("Missing required fields");

  const exist = await User.findOne({ phone });
  if (exist) throw new Error("Phone already exists");

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const created = await User.create({
    name,
    phone,
    password: hashedPassword,
    role,
    governorate,
    village
  });

  return created;
}

export async function UserUpdate({ id, ...updates }) {
  if (!id) throw new Error("Missing user id");
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, SALT_ROUNDS);
  }

  const updated = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
  if (!updated) throw new Error("User not found");
  return updated;
}

export async function removeUser(id) {
  if (!id) throw new Error("Missing user id");
  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) throw new Error("User not found");
  return deleted;
}

/**
 * Express router (default export) — server.js expects a default export here
 */
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const created = await newUser(req.body);
    res.json({ message: "User registered", user: created });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const updated = await UserUpdate({ id: req.params.id, ...req.body });
    res.json({ message: "User updated", user: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await removeUser(req.params.id);
    res.json({ message: "User removed", user: deleted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
// ...existing code...