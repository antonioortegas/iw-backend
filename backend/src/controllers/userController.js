const userModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try {
        console.log('Getting all users');
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllUsers,
}