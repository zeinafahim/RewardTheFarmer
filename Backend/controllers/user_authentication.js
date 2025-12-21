import User from "../models/user_authentication.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import EWallet from "../models/e-wallet.js";


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, phone, password, role, governorate, village } = req.body;

    const exist = await User.findOne({ phone });
    if (exist) return res.status(400).json({ message: "Phone already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      phone,
      password: hashedPassword,
      role,
      governorate,
      village,
    });

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "User registered", user: newUser, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const newWallet = new EWallet({
  userId: newUser._id,
  balance: 0,
  currency: "EGP",
  transactions: []
});
await newWallet.save();

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful", user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const updates = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select("-password");

    res.json({ message: "User updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------------------------------------
// DELETE USER
// ---------------------------------------------------------
export const removeUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
