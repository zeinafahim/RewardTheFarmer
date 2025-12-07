import express from "express";
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

