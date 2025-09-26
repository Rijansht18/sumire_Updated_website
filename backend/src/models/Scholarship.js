const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  provider: String,
  amount: {
    type: String,
    required: true
  },
  eligibility: [String],
  deadline: Date,
  description: String,
  applicationLink: String,
  requirements: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);