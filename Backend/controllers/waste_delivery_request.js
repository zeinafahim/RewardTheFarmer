import WasteRequest from ("../models/waste_delivery_request.js");

// Create a new waste request
exports.createWasteRequest = async (req, res) => {
  try {
    const wasteRequest = new WasteRequest(req.body);
    await wasteRequest.save();
    res.status(201).json({ message: "Waste request created successfully", data: wasteRequest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all waste requests
exports.getWasteRequests = async (req, res) => {
  try {
    const requests = await WasteRequest.find()
      .populate("farmer", "name email")
      .populate("assignedCollector", "name")
      .populate("verifiedBy", "name");

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update request info
exports.updateWasteRequest = async (req, res) => {
  try {
    const request = await WasteRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Waste request updated successfully", data: request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a waste request
exports.deleteWasteRequest = async (req, res) => {
  try {
    await WasteRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Waste request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update status (assign, verify, reject, complete)
exports.updateWasteStatus = async (req, res) => {
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

    const request = await WasteRequest.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    res.json({ message: "Status updated successfully", data: request });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
