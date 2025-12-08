import Loan from "../models/loan_request.js"; 

// Create loan request
export const createLoanRequest = async (req, res) => {
  try {
    const { name, nationalId, mobile, amount, purpose } = req.body;

    if (!name || !nationalId || !mobile || !amount || !purpose) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newLoan = await Loan.create({
      name,
      nationalId,
      mobile,
      amount,
      purpose,
    });

    res.status(201).json({ message: "Loan request submitted", loan: newLoan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all loan requests
export const getAllLoanRequests = async (req, res) => {
  try {
    const loans = await Loan.find().sort({ createdAt: -1 });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single loan by ID
export const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan request not found" });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update loan state (Submitted → Reviewed → Scored)
export const updateLoanState = async (req, res) => {
  try {
    const { state } = req.body;

    if (!["Submitted", "Reviewed", "Scored"].includes(state)) {
      return res.status(400).json({ message: "Invalid state update" });
    }

    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { state },
      { new: true }
    );

    if (!loan) return res.status(404).json({ message: "Loan not found" });

    res.json({ message: "Loan status updated", loan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
