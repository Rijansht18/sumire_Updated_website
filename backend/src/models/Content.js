const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['hero', 'service', 'testimonial', 'gallery', 'blog', 'event', 'university']
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  content: mongoose.Schema.Types.Mixed,
  images: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  metadata: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

module.exports = mongoose.model('Content', contentSchema);