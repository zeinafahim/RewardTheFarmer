import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
  },

  phone: { 
    type: String,
    required: true,
    unique: true 
  },

  password: { 
    type: String,
    required: true 
  },

  role: {
    type: String,
    enum: ["farmer", "collector", "admin"],
    default: "farmer"
  },

  governorate: {
    type: String
  },

  village: {
    type: String
  },

  walletBalance: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);
export default User;
