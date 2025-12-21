import express from "express";
import {
  createLoanRequest,
  getAllLoanRequests,
  getMyLoans,
  getLoanById,
  updateLoanState
} from "../controllers/loan_request.js";

const router = express.Router();

// Submit loan request
router.post("/create", createLoanRequest);

// Get all loan requests
router.get("/", getAllLoanRequests);

router.get("/my-loans", getMyLoans);


// Get loan by ID
router.get("/:id", getLoanById);

// Update loan state (Reviewed, Scored)
router.put("/state/:id", updateLoanState);

export default router;
