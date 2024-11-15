const mongoose = require('mongoose');

const CollaboratorSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    skills: {
      type: [String], // Array of strings for skills
      default: []
    }
  }, {
    timestamps: true // Automatically manage createdAt and updatedAt
  });

module.exports = mongoose.model('Collaborator', CollaboratorSchema);