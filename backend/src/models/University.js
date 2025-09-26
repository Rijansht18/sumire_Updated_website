const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  ranking: String,
  image: String,
  programs: [String],
  tuitionFee: {
    min: Number,
    max: Number
  },
  requirements: {
    gpa: Number,
    jlptLevel: String,
    englishTest: String
  },
  description: String,
  website: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('University', universitySchema);