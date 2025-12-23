import mongoose from "mongoose";

// Transaction Schema
const TransactionSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'EWallet', required: true }, // Link to EWallet
  type: { 
    type: String, 
    enum: [
      'waste_to_reward', 
      'deposit', 
      'withdrawal', 
      'microloan_disbursement', 
      'microloan_repayment', 
      'incentive_earning',
      'send',
      'receive'
    ], 
    required: true 
  }, // Transaction type
  amount: { type: Number, required: true }, // Transaction amount
  description: { type: String }, // Optional note (e.g., "Waste reward", "Loan repayment")
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' }, // Transaction status
  metadata: { type: Object }, // Flexible field for extra info (loan ID, reward source, etc.)
  date: { type: Date, default: Date.now } // Timestamp
}, { timestamps: true });

// Export models
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;