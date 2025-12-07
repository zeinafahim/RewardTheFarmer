const express = require("express");
const mongoose = require("mongoose");
<<<<<<< HEAD
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const eWalletRoutes = require("./routes/eWalletRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const microloanRoutes = require("./routes/microloanRoutes");
const wasteRoutes = require("./routes/wasteRoutes");
=======
const wasteRequestRoutes = require("./routes/Waste_Delivery_Request_routes");
const transactionHistoryRoutes = require("./routes/Transaction_History_routes");
>>>>>>> 9e5e0906d46dabe2426acb4d91983e2984a5121e

const app = express();
app.use(express.json());

<<<<<<< HEAD
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
=======
app.use("/api/waste-delivery", wasteRequestRoutes);

app.use("/api/transactions", transactionHistoryRoutes);

// connect later...

mongoose.connect("mongodb+srv://malakmadyan2_db_user:nnYNwR72LFylohfw@cluster0.sqpfdsb.mongodb.net/Reward_A_Farmer?appName=Cluster0")
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(3000, () => {
    console.log("Server running on port 3000");
});
})
.catch(err => console.log(err));

>>>>>>> 9e5e0906d46dabe2426acb4d91983e2984a5121e
