<<<<<<< HEAD
import User from "./models/user_authentication.js";

//Helper Functions
=======
import User from "./models/user.js";

//Helper FFuncations
>>>>>>> 9e5e0906d46dabe2426acb4d91983e2984a5121e

export const newUser = async (userData) => {
    const user = new User(userData);
    await user.save();
}           
export const UserUpdate = async (updatedData) => {
    await User.findByIdAndUpdate(updatedData.id, updatedData);
}   
export const removeUser = async (id) => {
    await User.findByIdAndDelete(id);
}   
