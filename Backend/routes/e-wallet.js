import express from "express";
import {
  getWalletInfo,
  creditWallet,
  debitWallet,
  getTransactionHistory
} from "../controllers/e-wallet.js";

const router = express.Router();

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// TEST route
router.get("/", (req, res) => {
  res.send("E-Wallet route works!");
});

// GET wallet info
router.get("/info", auth, getWalletInfo);

// CREDIT wallet
router.post("/credit", auth, creditWallet);

// DEBIT wallet
router.post("/debit", auth, debitWallet);

// GET wallet transaction history
router.get("/transactions", auth, getTransactionHistory);

export default router;