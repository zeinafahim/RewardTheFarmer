const express = require("express");
const mongoose = require("mongoose");
const wasteRequestRoutes = require("./routes/Waste_Delivery_Request_routes");
const transactionHistoryRoutes = require("./routes/Transaction_History_routes");

const app = express();
app.use(express.json());

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

