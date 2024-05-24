const User = require("../models/user");

const createUser = async (req, res) => {
    const newUser = req.body;

    try {
        const createdUser = await User.createUser(newUser);
        res.status(201).json(createdUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving users");
    }
}

const getUserById = async (req, res) => {
    const userId = parseInt(req.params.id); 
    try {
        const user = await User.getUserById(userId);
        if (!user) {
            res.status(404).send("User not found");
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving user");
    }
}

const updateUser = async (req, res) => {
    const userId =  parseInt(req.params.id);
    const newUser = req.body;

    try {
        const updatedUser = await User.updateUser(userId, newUser);
        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user");
    }
}

const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
        const success = await User.deleteUser(userId);
        if (!success) {
            return res.status(404).send("User not found");
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting user");
    }
}

const searchUsers = async (req, res) => {
    const searchTerm = req.query.searchTerm; 
  
    try {    
        const users = await User.searchUsers(searchTerm);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error searching users" });
    }
}

async function getUsersWithBooks(req, res) {
    try {
        const users = await User.getUsersWithBooks();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users with books" });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    searchUsers,
    getUsersWithBooks
}