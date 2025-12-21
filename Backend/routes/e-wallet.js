import express from "express";
import { getWalletInfo, creditWallet, debitWallet, sendWallet } from "../controllers/e-wallet.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Use proper JWT middleware
router.get("/info", authMiddleware, getWalletInfo);
router.post("/credit", authMiddleware, creditWallet);
router.post("/debit", authMiddleware, debitWallet);
router.post("/send", authMiddleware, sendWallet);

export default router;
