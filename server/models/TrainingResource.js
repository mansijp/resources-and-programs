const mongoose = require('mongoose');

const TrainingResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['webinar', 'article', 'video', 'tutorial', 'document']
  },
  description: {
    type: String,
    required: true
  },
  content: {
    url: String,
    duration: Number, // in minutes
    fileType: String
  },
  pointsAwarded: {
    type: Number,
    required: true,
    default: 0
  },
  categories: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('TrainingResource', TrainingResourceSchema);