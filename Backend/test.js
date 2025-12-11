import mongoose from "mongoose";
import WasteRequest from "./models/waste_delivery_request.js";
import dotenv from "dotenv";

dotenv.config();

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB:", mongoose.connection.name);

    const w = new WasteRequest({
      farmer: "Test",
      wasteType: "Plastic",
      estimatedWeightKg: 10
    });

    await w.save();
    console.log("Saved document:", w);

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
  }
};

test();
