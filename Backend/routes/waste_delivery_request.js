import express from "express";
import {
  createWasteRequest,
  getWasteRequests,
  updateWasteRequest,
  deleteWasteRequest,
  updateWasteStatus
} from "../controllers/wasteRequestController.js";

const router = express.Router();

// GET all requests
router.get("/", getWasteRequests);

// CREATE request
router.post("/", createWasteRequest);

// UPDATE request
router.put("/:id", updateWasteRequest);

// UPDATE STATUS only
router.patch("/:id/status", updateWasteStatus);

// DELETE request
router.delete("/:id", deleteWasteRequest);

export default router;

