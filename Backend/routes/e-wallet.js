import express from "express";
import EWallet from "../models/e-wallet.js";                 
import Transaction from "../models/transaction_history.js";

// Middleware to verify user authentication
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  
  try {
    // Decode token and attach user to req
    const decoded = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("E-Wallet route works!");
});

// Get wallet info
router.get("/info", auth, async (req, res) => {
  try {
    const wallet = await EWallet.findOne({ userId: req.user.id });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Credit wallet (POST)
router.post("/credit", auth, async (req, res) => {
  try {
    const { amount, description } = req.body;
    if (amount <= 0) return res.status(400).json({ message: "Amount must be positive" });

    const wallet = await EWallet.findOne({ userId: req.user.id });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    wallet.balance += amount;
    wallet.updatedAt = Date.now();
    await wallet.save();

    const txn = await Transaction.create({
      accountId: wallet._id,
      type: "deposit",
      amount,
      description,
      status: "completed",
      date: new Date(),
    });

    res.json({ wallet, transaction: txn });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Debit wallet (POST)
router.post("/debit", auth, async (req, res) => {
  try {
    const { amount, description } = req.body;
    if (amount <= 0) return res.status(400).json({ message: "Amount must be positive" });

    const wallet = await EWallet.findOne({ userId: req.user.id });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    if (wallet.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

    wallet.balance -= amount;
    wallet.updatedAt = Date.now();
    await wallet.save();

    const txn = await Transaction.create({
      accountId: wallet._id,
      type: "withdrawal",
      amount,
      description,
      status: "completed",
      date: new Date(),
    });

    res.json({ wallet, transaction: txn });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get transaction history for this wallet
router.get("/transactions", auth, async (req, res) => {
  try {
    const wallet = await EWallet.findOne({ userId: req.user.id });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    const transactions = await Transaction.find({ accountId: wallet._id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;