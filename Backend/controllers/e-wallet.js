import EWallet from "../models/e-wallet.js";
import Transaction from "../models/transaction_history.js";

// Get wallet info
export const getWalletInfo = async (req, res) => {
  try {
    // ✅ FIX: use _id from token payload
    const wallet = await EWallet.findOne({ userId: req.user._id });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    const transactions = await Transaction.find({ accountId: wallet._id }).sort({ date: -1 });
    res.json({ wallet, transactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Credit wallet (Deposit)
export const creditWallet = async (req, res) => {
  try {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: "Amount must be positive" });

    const wallet = await EWallet.findOne({ userId: req.user._id }); // ✅ FIX
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

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

// Debit wallet (Withdraw)
export const debitWallet = async (req, res) => {
  try {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: "Amount must be positive" });

    const wallet = await EWallet.findOne({ userId: req.user._id }); // ✅ FIX
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    if (wallet.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

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

// Send money to another user
export const sendWallet = async (req, res) => {
  try {
    const { amount, receiverId } = req.body;
    if (amount <= 0) return res.status(400).json({ message: "Amount must be positive" });

    const senderWallet = await EWallet.findOne({ userId: req.user._id }); // ✅ FIX
    if (!senderWallet) return res.status(404).json({ message: "Sender wallet not found" });
    if (senderWallet.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

    const receiverWallet = await EWallet.findOne({ userId: receiverId });
    if (!receiverWallet) return res.status(404).json({ message: "Receiver wallet not found" });

    // Update balances
    senderWallet.balance -= amount;
    receiverWallet.balance += amount;
    await senderWallet.save();
    await receiverWallet.save();

    // Record transactions
    const senderTxn = await Transaction.create({
      accountId: senderWallet._id,
      type: "send",
      amount,
      description: `Sent to ${receiverId}`,
      status: "completed",
      date: new Date(),
    });

    const receiverTxn = await Transaction.create({
      accountId: receiverWallet._id,
      type: "receive",
      amount,
      description: `Received from ${req.user._id}`,
      status: "completed",
      date: new Date(),
    });

    res.json({ senderWallet, receiverWallet, senderTxn, receiverTxn });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
