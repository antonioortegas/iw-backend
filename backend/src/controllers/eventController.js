const eventModel = require('../models/eventModel');

const getAllEvents = async (req, res) => {
    try {
        console.log('Getting all events');
        const events = await eventModel.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllEvents,
}