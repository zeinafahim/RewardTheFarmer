import EWallet from "../models/e-wallet.js";
import Transaction from "../models/transaction_history.js";
import jwt from "jsonwebtoken";
import User from "../models/user_authentication.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Helper: extract user ID from JWT
const getUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("No token provided");

  const token = authHeader.split(" ")[1]; // Bearer <token>
  const decoded = jwt.verify(token, JWT_SECRET);

  return decoded.id; // must match login payload
};

// =======================
// Get wallet info
// =======================
export const getWalletInfo = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const wallet = await EWallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    const transactions = await Transaction.find({
      accountId: wallet._id,
    }).sort({ date: -1 });

    res.json({ wallet, transactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// Credit wallet (Deposit)
// =======================
export const creditWallet = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be positive" });
    }

    const wallet = await EWallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    wallet.balance += amount;
    wallet.updatedAt = Date.now();
    await wallet.save();

    const txn = await Transaction.create({
      accountId: wallet._id,
      type: "deposit",
      amount,
      description: "Deposit",
      status: "completed",
      date: new Date(),
    });

    res.json({ wallet, transaction: txn });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// Debit wallet (Withdraw)
// =======================
export const debitWallet = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be positive" });
    }

    const wallet = await EWallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    wallet.balance -= amount;
    wallet.updatedAt = Date.now();
    await wallet.save();

    const txn = await Transaction.create({
      accountId: wallet._id,
      type: "withdrawal",
      amount,
      description: "Withdrawal",
      status: "completed",
      date: new Date(),
    });

    res.json({ wallet, transaction: txn });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// Send money to another user 
// =======================
export const sendWallet = async (req, res) => {
  try {
    console.log(">>> sendWallet called");
    console.log("Request body:", req.body);
    console.log("Authorization header:", req.headers.authorization);

    const senderId = getUserIdFromToken(req);
    let { amount, receiverId } = req.body;

    if (!amount || amount <= 0) {
      console.log("Invalid amount:", amount);
      return res.status(400).json({ message: "Amount must be positive" });
    }

    // Trim receiverId and remove spaces
    receiverId = receiverId.trim();

    // Sender wallet
    const senderWallet = await EWallet.findOne({ userId: senderId });
    if (!senderWallet) {
      console.log("Sender wallet not found for userId:", senderId);
      return res.status(404).json({ message: "Sender wallet not found" });
    }

    if (senderWallet.balance < amount) {
      console.log("Insufficient balance:", senderWallet.balance, "requested:", amount);
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Receiver user lookup
    let receiverUser = await User.findOne({ phone: receiverId });
    console.log("Receiver user raw lookup:", receiverUser);

    // Fallback: try ignoring leading zero
    if (!receiverUser && receiverId.startsWith("0")) {
      receiverUser = await User.findOne({ phone: receiverId.slice(1) });
      console.log("Receiver user lookup without leading 0:", receiverUser);
    }

    if (!receiverUser) {
      return res.status(404).json({ message: "Receiver user not found" });
    }

    // Receiver wallet
    const receiverWallet = await EWallet.findOne({ userId: receiverUser._id });
    if (!receiverWallet) {
      console.log("Receiver wallet not found for userId:", receiverUser._id);
      return res.status(404).json({ message: "Receiver wallet not found" });
    }

    // Update balances
    senderWallet.balance -= amount;
    receiverWallet.balance += amount;
    await senderWallet.save();
    await receiverWallet.save();

    // Record transactions
    const senderTxn = await Transaction.create({
      accountId: senderWallet._id,
      type: "send",
      amount: -amount,
      description: `Sent to ${receiverUser.phone}`,
      status: "completed",
      date: new Date(),
    });

    const receiverTxn = await Transaction.create({
      accountId: receiverWallet._id,
      type: "receive",
      amount,
      description: `Received from ${senderWallet.userId}`,
      status: "completed",
      date: new Date(),
    });

    console.log("Send completed:", { senderTxn, receiverTxn });
    res.json({ senderWallet, receiverWallet, senderTxn, receiverTxn });
  } catch (err) {
    console.error("sendWallet error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
