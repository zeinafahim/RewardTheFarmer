const mongoose = require('mongoose');

// Transaction Schema
const TransactionSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true }, // Link to Account
  type: { 
    type: String, 
    enum: [
      'waste_to_reward', 
      'deposit', 
      'withdrawal', 
      'microloan_disbursement', 
      'microloan_repayment', 
      'incentive_earning'
    ], 
    required: true 
  }, // Transaction type
  amount: { type: Number, required: true }, // Transaction amount
  description: { type: String }, // Optional note (e.g., "Waste reward", "Loan repayment")
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' }, // Transaction status
  metadata: { type: Object }, // Flexible field for extra info (loan ID, reward source, etc.)
  date: { type: Date, default: Date.now }, // Timestamp
  createdAt: { type: Date, default: Date.now }, // Record creation date
  updatedAt: { type: Date, default: Date.now }  // Last update timestamp
});


// Export models
module.exports = {
  Transaction: mongoose.model('Transaction', TransactionSchema)
};
