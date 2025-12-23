import mongoose from "mongoose";

const MicroloanRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },          // user's full name
  nationalId: { type: String, required: true },    // unique national ID
  mobile: { type: String, required: true },        // for contact
  amount: { type: Number, required: true },        // loan amount requested
  purpose: { type: String, required: true },       // reason for loan
  state: { 
    type: String, 
    enum: ['Submitted', 'Reviewed', 'Scored'], 
    default: 'Submitted' 
  },                                                // track progress of request
  createdAt: { type: Date, default: Date.now },    // auto-set creation time
});

// Export models
const Loan = mongoose.model("MicroLoan", MicroloanRequestSchema);
export default Loan;


