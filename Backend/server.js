import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import eWalletRoutes from "./routes/e-wallet.js";
import transactionRoutes from "./routes/transaction_history.js";
import userRoutes from "./routes/user_authentication.js";
import loanRoutes from "./routes/loan_request.js";
import wasteRoutes from "./routes/waste_delivery_request.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/e-wallet", eWalletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/microloans", loanRoutes);
app.use("/api/waste", wasteRoutes);

// MongoDB connection
const mongoURI = "YOUR_MONGODB_CONNECTION_STRING";
mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch(err => console.error("MongoDB connection error:", err));
