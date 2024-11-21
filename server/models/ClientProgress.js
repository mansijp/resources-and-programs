const mongoose = require('mongoose');

const ClientProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  completedResources: [{
    resourceId: {
      type: String,
      required: true
    },
    completionDate: {
      type: Date,
      default: Date.now
    },
    pointsEarned: {
      type: Number,
      required: true
    }
  }],
  attendedEvents: [{
    eventId: {
      type: String,
      required: true
    },
    attendanceDate: {
      type: Date,
      required: true
    },
    pointsEarned: {
      type: Number,
      required: true
    }
  }],
  totalPointsEarned: {
    type: Number,
    default: 0
  },
  learningPath: {
    currentLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    completedModules: [{
      type: String
    }]
  },
  lastActivityDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ClientProgress', ClientProgressSchema, 'clientprogresses');