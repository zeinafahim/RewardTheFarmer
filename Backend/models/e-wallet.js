const mongoose = require('mongoose');

const EWalletSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Link to the User who owns the wallet

  balance: { 
    type: Number, 
    required: true, 
    default: 0 
  }, // Current wallet balance

  currency: { 
    type: String, 
    required: true, 
    default: 'EGP' 
  }, // Currency type (e.g., Egyptian Pound)

  transactions: [
    {
      type: { 
        type: String, 
        enum: ['credit', 'debit'], 
        required: true 
      }, // Transaction type
      amount: { 
        type: Number, 
        required: true 
      }, // Transaction amount
      description: { 
        type: String 
      }, // Optional note (e.g., "Waste reward", "Loan repayment")
      date: { 
        type: Date, 
        default: Date.now 
      } // Timestamp
    }
  ],

  createdAt: { 
    type: Date, 
    default: Date.now 
  }, // Wallet creation date

  updatedAt: { 
    type: Date, 
    default: Date.now 
  } // Last update timestamp
});

module.exports = mongoose.model('EWallet', EWalletSchema);
