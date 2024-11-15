const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Task Endpoints
router.get('/', taskController.getAllTasks); // GET all tasks
router.get('/:id', taskController.getTaskById); // GET a single task by ID
router.post('/', taskController.createTask); // POST a new task
router.put('/:id', taskController.updateTaskById); // PUT (update) a task by ID
router.delete('/:id', taskController.deleteTaskById); // DELETE a task by ID

module.exports = router;