import express from "express";
<<<<<<< HEAD
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
=======
import User from "./models/user.js";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./rotues/userRoutes.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", userRoutes);


// start the server
async function startServer() {

    await mongoose.connect("mongodb+srv://zeinafahim52_db_user:G3d8ViKo5onPIpUu@cluster0.n4gbopz.mongodb.net/Log?appName=Cluster0");
    console.log("Connected to MongoDB");
}
user.find().then((users) => {
    console.log("Existing users:", users);
}).catch((error) => {
    console.error("Error fetching users:", error);
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

>>>>>>> 9e5e0906d46dabe2426acb4d91983e2984a5121e
