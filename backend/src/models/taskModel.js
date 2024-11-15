const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  skillsRequired: {
    type: [String], // Array of strings for skills
    default: []
  },
  segments: {
    type: Number,
    required: true,
    min: 1 // At least 1 segment
  },
  collaborators:{ //each collaborator is an email, and each does 1 segment
    type: [String],
    default: []
  },
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

module.exports = mongoose.model('Task', TaskSchema);
