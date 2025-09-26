const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published'
  },
  featured: {
    type: Boolean,
    default: false
  },
  author: {
    type: String,
    default: 'Admin'
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better search performance
pageSchema.index({ slug: 1 });
pageSchema.index({ status: 1 });
pageSchema.index({ featured: 1 });

module.exports = mongoose.model('Page', pageSchema);