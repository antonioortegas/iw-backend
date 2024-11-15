const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    host: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    inicio: {
      type: Date,
      required: true,
      validate: {
        validator: function(date) {
          return date.getMinutes() % 15 === 0; // Valida que sea un múltiplo de 15
        },
        message: 'La hora de inicio debe estar en tramos de 15 minutos.'
      }
    },
    duracion: {
      type: Number,
      required: true,
      min: 15,
      validate: {
        validator: function(value) {
          return value % 15 === 0; // Duración en múltiplos de 15
        },
        message: 'La duración debe estar en tramos de 15 minutos.'
      }
    },
    invitados: [{
      email: {
        type: String,
        required: true,
      },
      estado: {
        type: String,
        enum: ['aceptada', 'pendiente'],
        default: 'pendiente'
      }
    }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Event', eventSchema);
  