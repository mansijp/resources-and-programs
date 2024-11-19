const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['webinar', 'workshop', 'conference', 'training']
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  registeredAttendees: [{
    userId: {
      type: String,
      required: true
    },
    registrationDate: {
      type: Date,
      default: Date.now
    },
    attended: {
      type: Boolean,
      default: false
    }
  }],
  pointsAwarded: {
    type: Number,
    required: true,
    default: 0
  },
  location: {
    type: String,
    enum: ['online', 'in-person'],
    required: true
  },
  meetingLink: String,
  venue: String,
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Event', EventSchema);