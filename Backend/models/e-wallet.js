const mongoose = require('mongoose');

const EWalletSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true
  },

  balance: { 
    type: Number, 
    required: true, 
    default: 0 
  },

  currency: { 
    type: String, 
    required: true, 
    default: 'EGP' 
  },

  transactions: [
    {
      type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
      },
      amount: { 
        type: Number, 
        required: true 
      },
      description: { 
        type: String 
      },
      date: { 
        type: Date, 
        default: Date.now 
      },
      balanceAfter: { 
        type: Number,
        required: true
      }
    }
  ],

  createdAt: { 
    type: Date, 
    default: Date.now 
  },

  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('EWallet', EWalletSchema);
