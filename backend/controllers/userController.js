
import User from '../models/userModel.js'; 
export const addUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const newUser = new User({ name, email, phone });
    await newUser.save();
    
    res.status(201).json({ message: 'User added successfully', user: newUser });
    
  } catch (error) {
    
    res.status(400).json({ message: error.message });
  }
};

// Fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
    
  } catch (error) {
    
    res.status(500).json({ message: 'Invalid User ID format or Internal Server Error' });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    
    const user = await User.findByIdAndDelete(req.params.id); 
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    
    res.status(200).json({ message: 'User deleted successfully', user });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

