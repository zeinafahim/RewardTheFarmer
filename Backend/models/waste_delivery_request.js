import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    address: { type: String },
    coords: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], index: "2dsphere" }
    }
  },
  { _id: false }
);

const WasteRequestSchema = new mongoose.Schema({
  farmer: { type: String, required: true },
  wasteType: { type: String, required: true },
  estimatedWeightKg: { type: Number, required: true, min: 0 },

  location: { type: LocationSchema },
  notes: { type: String },

  status: {
    type: String,
    enum: ["pending", "assigned", "verified", "completed", "rejected", "cancelled"],
    default: "pending"
  },

  assignedCollector: { type: String },
  assignedAt: Date,

  verifiedBy: { type: String },
  actualWeightKg: { type: Number, min: 0 },
  verifiedAt: Date,
  verificationNotes: String,

  rewardTransaction: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },

  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

WasteRequestSchema.pre("save", async function () {
  this.updatedAt = new Date();
});

const WasteRequest = mongoose.model("WasteRequest", WasteRequestSchema);
export default WasteRequest;
