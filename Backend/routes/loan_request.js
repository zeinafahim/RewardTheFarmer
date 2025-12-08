import express from "express";
import {
  createLoanRequest,
  getAllLoanRequests,
  getLoanById,
  updateLoanState
} from "../controllers/loan_request.js";

const router = express.Router();

// Submit loan request
router.post("/create", createLoanRequest);

// Get all loan requests
router.get("/", getAllLoanRequests);

// Get loan by ID
router.get("/:id", getLoanById);

// Update loan state (Reviewed, Scored)
router.put("/state/:id", updateLoanState);

export default router;
