const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['N5', 'N4', 'N3', 'N2', 'N1', 'Business'],
    required: true
  },
  schedule: {
    type: String,
    required: true
  },
  teacher: {
    type: String,
    required: true
  },
  batchSize: {
    type: Number,
    required: true,
    min: 1,
    max: 15
  },
  fee: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Class', classSchema);