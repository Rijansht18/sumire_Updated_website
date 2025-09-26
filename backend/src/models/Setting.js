const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  type: {
    type: String,
    enum: ['string', 'number', 'boolean', 'object', 'array'],
    default: 'string'
  },
  category: {
    type: String,
    enum: ['general', 'contact', 'social', 'seo', 'email', 'analytics', 'maintenance'],
    default: 'general'
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better performance
settingSchema.index({ key: 1 });
settingSchema.index({ category: 1 });

module.exports = mongoose.model('Setting', settingSchema);