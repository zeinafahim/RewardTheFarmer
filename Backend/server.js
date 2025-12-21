import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json()); 


// Routes
import eWalletRoutes from "./routes/e-wallet.js";
import transactionRoutes from "./routes/transaction_history.js";
import userRoutes from "./routes/user_authentication.js";
import loanRoutes from "./routes/loan_request.js";
import wasteRequestRoutes from "./routes/waste_delivery_request.js";


app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,               
}));

// Use routes
app.use("/api/e-wallet", eWalletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/microloans/loans", loanRoutes);
app.use("/api/waste-delivery", wasteRequestRoutes);

console.log("MONGO_URI is:", process.env.MONGO_URI);

// Connect and start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    console.log("Database name:", mongoose.connection.name);
    console.log("Expected collections:");
    console.log(" - ewallets");
    console.log(" - loans");
    console.log(" - transactions");
    console.log(" - users");
    console.log(" - wasterequests");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });

  } catch (err) {
    console.error("DB connection error:", err);
  }
};

startServer();
