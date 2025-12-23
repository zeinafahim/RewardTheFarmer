import Transaction from "../models/transaction_history.js";

// --------------------------------------------
// Create a new transaction
// --------------------------------------------
export const createTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();

    res.status(201).json({
      message: "Transaction created successfully",
      transaction
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({
      message: "Failed to create transaction",
      error
    });
  }
};


// --------------------------------------------
// Get all transactions with filters
// --------------------------------------------
export const getTransactions = async (req, res) => {
  try {
    const { type, status, startDate, endDate } = req.query;

    let filter = {};

    if (type) filter.type = type;
    if (status) filter.status = status;

    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
};

// --------------------------------------------
// Get transaction by ID
// --------------------------------------------
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ message: "Failed to retrieve transaction", error });
  }
};

// --------------------------------------------
// Get transactions by account ID
// --------------------------------------------
export const getTransactionsByAccount = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      accountId: req.params.accountId
    }).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching account transactions:", error);
    res.status(500).json({ message: "Failed to fetch account transactions", error });
  }
};

// --------------------------------------------
// Update transaction status
// --------------------------------------------
export const updateTransactionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedTransaction)
      return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json({
      message: "Transaction updated",
      updatedTransaction
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Failed to update transaction", error });
  }
};
