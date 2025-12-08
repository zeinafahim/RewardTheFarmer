import express from "express";
import WasteRequest from "../models/waste_delivery_request.js";

const router = express.Router();

// ---------------------------------------------------------
// GET all waste delivery requests
// ---------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const requests = await WasteRequest.find()
      .populate("farmer")
      .populate("assignedCollector")
      .populate("verifiedBy")
      .populate("rewardTransaction");

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------
// CREATE a new waste delivery request
// ---------------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const newRequest = await WasteRequest.create(req.body);
    res.json(newRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------------------------------------------------------
// UPDATE request status (assign, verify, complete, etc.)
// ---------------------------------------------------------
router.put("/:id", async (req, res) => {
  try {
    const updated = await WasteRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------------------------------------------------------
// DELETE request
// ---------------------------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await WasteRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Request not found" });

    res.json({ message: "Waste request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;