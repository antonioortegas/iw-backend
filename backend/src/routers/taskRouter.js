const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// totally assigned tasks
router.get('/assigned', taskController.getAssignedTasks);

// Task Endpoints (CRUD operations)
router.get('/', taskController.getAllTasks); // GET all tasks
router.get('/:id', taskController.getTaskById); // GET a single task by ID
router.post('/', taskController.createTask); // POST a new task
router.put('/:id', taskController.updateTaskById); // PUT (update) a task by ID
router.delete('/:id', taskController.deleteTaskById); // DELETE a task by ID

//find candidate collaborators for a task
router.get('/:id/candidates', taskController.findCandidatesForTask);
//add a collaborator to a task
router.post('/:id/collaborators', taskController.assignCollaboratorToTask);

module.exports = router;