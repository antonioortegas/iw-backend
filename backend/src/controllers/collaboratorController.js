const Collaborator = require('../models/collaboratorModel');
const Task = require('../models/taskModel');

// Get all collaborators
const getAllCollaborators = async (req, res) => {
    try {
        const collaborators = await Collaborator.find();
        res.json(collaborators);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single collaborator by email
const getCollaboratorByEmail = async (req, res) => {
    try {
        const collaborator = await Collaborator.findOne({ email: req.params.email });
        if (!collaborator) return res.status(404).json({ error: 'Collaborator not found' });
        res.json(collaborator);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new collaborator
const createCollaborator = async (req, res) => {
    try {
        const newCollaborator = await Collaborator.create(req.body);
        res.status(201).json(newCollaborator);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a collaborator by email
const deleteCollaboratorByEmail = async (req, res) => {
    try {
        const deleted = await Collaborator.findOneAndDelete({ email: req.params.email });
        if (!deleted) return res.status(404).json({ error: 'Collaborator not found' });
        res.json({ message: 'Collaborator deleted', deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all skills of a collaborator
const getAllSkills = async (req, res) => {
    try {
        const collaborator = await Collaborator.findOne({ email: req.params.email });
        if (!collaborator) return res.status(404).json({ error: 'Collaborator not found' });
        res.json(collaborator.skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a skill to a collaborator
const addSkillToCollaborator = async (req, res) => {
    try {
        const { skill } = req.body;
        const collaborator = await Collaborator.findOneAndUpdate(
            { email: req.params.email },
            { $addToSet: { skills: skill } }, // Avoid duplicates
            { new: true }
        );
        if (!collaborator) return res.status(404).json({ error: 'Collaborator not found' });
        res.json(collaborator);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Remove a skill from a collaborator
const removeSkillFromCollaborator = async (req, res) => {
    try {
        const collaborator = await Collaborator.findOneAndUpdate(
            { email: req.params.email },
            { $pull: { skills: req.params.skill } }, // Remove specific skill
            { new: true }
        );
        if (!collaborator) return res.status(404).json({ error: 'Collaborator not found' });
        res.json(collaborator);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get collaborators for a specific user (by their email)
const getCollaboratorsForUser = async (req, res) => {
    try {
        const email = req.params.email;

        // Find all tasks owned by this user
        const tasks = await Task.find({ owner: email });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ error: 'No tasks found for this user' });
        }

        // Collect unique collaborators' emails
        const collaboratorsEmails = [];
        tasks.forEach(task => {
            task.collaborators.forEach(collaboratorEmail => {
                if (!collaboratorsEmails.includes(collaboratorEmail)) {
                    collaboratorsEmails.push(collaboratorEmail);
                }
            });
        });

        // Return the list of unique collaborator emails
        res.json(collaboratorsEmails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllCollaborators,
    getCollaboratorByEmail,
    createCollaborator,
    deleteCollaboratorByEmail,
    getAllSkills,
    addSkillToCollaborator,
    removeSkillFromCollaborator,
    getCollaboratorsForUser,
};