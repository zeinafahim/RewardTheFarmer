import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import routes
import eWalletRoutes from "./routes/e-wallet.js";
import transactionRoutes from "./routes/transaction_history.js";
import userRoutes from "./routes/user_authentication.js";
import loanRoutes from "./routes/loan_request.js";
import wasteRoutes from "./routes/waste_delivery_request.js";

// Import models
import User from "./models/user_authentication.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/e-wallet", eWalletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/microloans", loanRoutes);
app.use("/api/waste", wasteRoutes);

// Start server
async function startServer() {
  try {
  await mongoose.connect("mongodb+srv://zeinafahim52_db_user:G3d8ViKo5onPIpUu@cluster0.n4gbopz.mongodb.net/Log?appName=Cluster0");
    console.log("Connected to MongoDB");
    
    // Test DB fetch
    const users = await User.find();
    console.log("Existing users:", users);

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });

  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
}

// Call the function
startServer();