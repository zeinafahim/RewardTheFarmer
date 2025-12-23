import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  getTransactionsByAccount,
  updateTransactionStatus
} from "../controllers/transaction_history.js";

const router = express.Router();

// CREATE transaction
router.post("/", createTransaction);

// GET all transactions (supports filters)
router.get("/", getTransactions);

// GET transaction by ID
router.get("/:id", getTransactionById);

// GET transactions by Account ID
router.get("/account/:accountId", getTransactionsByAccount);

// UPDATE transaction status only
router.patch("/:id/status", updateTransactionStatus);

export default router;