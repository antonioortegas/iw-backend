const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    contactos: [
        {
            type: String,
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
