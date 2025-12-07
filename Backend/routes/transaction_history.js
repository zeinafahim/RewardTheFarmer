import express from "express";
const express = require("express");
const TransactionHistory = require("../models/Transaction_History_Schema");
const router = express.Router();

// ---------------------------------------------------------
// GET all transaction history records
// ---------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const transactions = await TransactionHistory.find()
      .populate("user")              // if your schema includes a user reference
      .populate("relatedRequest");   // if linked to waste request or microloan

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------
// GET transaction history for a specific user
// ---------------------------------------------------------
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

// ---------------------------------------------------------
// CREATE a new transaction record
// ---------------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const newTransaction = await TransactionHistory.create(req.body);
    res.json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------------------------------------------------------
// UPDATE a transaction record (rare cases)
// ---------------------------------------------------------
router.put("/:id", async (req, res) => {
  try {
    const updated = await TransactionHistory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Transaction not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
