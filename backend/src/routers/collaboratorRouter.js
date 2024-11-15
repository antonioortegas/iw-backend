const express = require('express');
const router = express.Router();
const collaboratorController = require('../controllers/collaboratorController');

// Collaborators Endpoints
router.get('/', collaboratorController.getAllCollaborators); // GET all collaborators
router.get('/:email', collaboratorController.getCollaboratorByEmail); // GET a single collaborator by email
router.post('/', collaboratorController.createCollaborator); // POST a new collaborator
router.delete('/:email', collaboratorController.deleteCollaboratorByEmail); // DELETE a collaborator by email

// Skills Endpoints (nested within collaborators)
router.get('/:email/skills', collaboratorController.getAllSkills); // GET all skills of a collaborator
router.post('/:email/skills', collaboratorController.addSkillToCollaborator); // POST a new skill to a collaborator
router.delete('/:email/skills/:skill', collaboratorController.removeSkillFromCollaborator); // DELETE a skill from a collaborator
module.exports = router;