import express from "express";
import TransactionHistory from "../models/transaction_history.js";

const router = express.Router();

// GET ALL TRANSACTIONS
router.get("/", async (req, res) => {
  try {
    const transactions = await TransactionHistory.find()
      .populate("user")
      .populate("relatedRequest");

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET TRANSACTIONS FOR SPECIFIC USER
router.get("/user/:userId", async (req, res) => {
  try {
    const history = await TransactionHistory.find({
      user: req.params.userId
    });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE TRANSACTION
router.post("/", async (req, res) => {
  try {
    const newTransaction = await TransactionHistory.create(req.body);
    res.json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE TRANSACTION
router.put("/:id", async (req, res) => {
  try {
    const updated = await TransactionHistory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Transaction not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;