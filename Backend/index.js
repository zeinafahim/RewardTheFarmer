const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const eWalletRoutes = require("./routes/eWalletRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const microloanRoutes = require("./routes/microloanRoutes");
const wasteRoutes = require("./routes/wasteRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/wallet", eWalletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/microloan", microloanRoutes);
app.use("/api/waste-delivery", wasteRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rewardthefarmer", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
})
.catch(err => console.error("MongoDB connection error:", err));
