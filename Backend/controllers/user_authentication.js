import User from "./models/user.js";

//Helper FFuncations

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
