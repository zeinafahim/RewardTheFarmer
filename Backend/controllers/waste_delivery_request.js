import WasteRequest from "../models/waste_delivery_request.js";


// ---------------------------------------------------------
// CREATE a new waste request
// ---------------------------------------------------------
export const createWasteRequest = async (req, res) => {
  try {
    const wasteRequest = new Wasterequest(req.body);
    await wasteRequest.save();
    res.status(201).json({ message: "Waste request created successfully", data: wasteRequest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------------------------------------
// GET all waste requests
// ---------------------------------------------------------
export const getWasteRequests = async (req, res) => {
  try {
    const requests = await WasteRequest.find()
      .populate("farmer", "name email")
      .populate("assignedCollector", "name")
      .populate("verifiedBy", "name")
      .populate("rewardTransaction");

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------------------------------------
// UPDATE any waste request
// ---------------------------------------------------------
export const updateWasteRequest = async (req, res) => {
  try {
    const updated = await WasteRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.json({ message: "Waste request updated", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------------------------------------
// DELETE a request
// ---------------------------------------------------------
export const deleteWasteRequest = async (req, res) => {
  try {
    const deleted = await WasteRequest.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Request not found" });

    res.json({ message: "Waste request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------------------------------------
// UPDATE STATUS ONLY (assign, verify, complete)
// ---------------------------------------------------------
export const updateWasteStatus = async (req, res) => {
  try {
    const { status, assignedCollector, actualWeightKg, verifiedBy, verificationNotes } = req.body;

    const updateFields = { status };

    if (status === "assigned") {
      updateFields.assignedCollector = assignedCollector;
      updateFields.assignedAt = new Date();
    }

    if (status === "verified") {
      updateFields.actualWeightKg = actualWeightKg;
      updateFields.verifiedBy = verifiedBy;
      updateFields.verificationNotes = verificationNotes;
      updateFields.verifiedAt = new Date();
    }

    const updated = await WasteRequest.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.json({ message: "Status updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
