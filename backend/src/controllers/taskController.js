const Task = require('../models/taskModel');
const Collaborator = require('../models/collaboratorModel');

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        //allows to filter tasks by skill in url param
        //ignore case
        filter = {};
        if (req.query.skill) {
            filter = { skillsRequired: { $regex: req.query.skill, $options: 'i' } };
        }
        //allows to filter tasks by collaborator, show if collaborator is in the list of collaborators
        if(req.query.collaborator){
            filter = { collaborators: { $in: [req.query.collaborator] } };
        }

        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a task by ID
const updateTaskById = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a task by ID
const deleteTaskById = async (req, res) => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted', deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Assign a collaborator to a task, checking if they have required skills
const assignCollaboratorToTask = async (req, res) => {
    try {
        const { email } = req.body;  // Collaborator's email to assign
        const task = await Task.findById(req.params.id);  // Find the task by ID
        const collaborator = await Collaborator.findOne({ email }); // Find the collaborator

        if (!task) return res.status(404).json({ error: 'Task not found' });
        if (!collaborator) return res.status(404).json({ error: 'Collaborator not found' });

        // Check if the collaborator has at least one of the required skills
        const hasRequiredSkill = task.skillsRequired.some(skill => collaborator.skills.includes(skill));
        if (!hasRequiredSkill) return res.status(400).json({ error: 'Collaborator does not have the required skills' });

        // Add the collaborator's email to the task's collaborators list
        task.collaborators.push(email);
        await task.save();

        res.json({ message: 'Collaborator assigned successfully', task });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Find potential candidates to collaborate on a task based on skills
const findCandidatesForTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        // Find collaborators whose skills match any of the task's required skills
        const collaborators = await Collaborator.find({ skills: { $in: task.skillsRequired } });
        const candidateEmails = collaborators.map(collaborator => collaborator.email); // Extract emails

        res.json({ candidates: candidateEmails });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// get the list of tasks where number of collaborators is equal to the number of segments
// collaborators is an array of emails and segments is a number
const getAssignedTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ $where: 'this.collaborators.length == this.segments' });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById,
    assignCollaboratorToTask,
    findCandidatesForTask,
    getAssignedTasks,
};
