const express = require("express");
const router= express.Router();
import User from "../models/user.js";
import { newUser, UserUpdate, removeUser } from "../controllers/userController.js"; 

// Example route to get all users
router.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Example route to create a new user
router.post("/users", async (req, res) => {
    await newUser(req.body);
    res.json({ message: "User created successfully" });
});

//Update user route
router.put("/users/:id", async (req, res) => {
    const updatedData = { id: req.params.id, ...req.body };
    await UserUpdate(updatedData);
    res.json({ message: "User updated successfully" }); 
});


//Delete user route
router.delete("/users/:id", async (req, res) => {
    await removeUser(req.params.id);
    res.json({ message: "User deleted successfully" });
});
export default router;
