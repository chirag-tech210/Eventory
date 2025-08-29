const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['hackathon', 'internship', 'fest', 'workshop', 'competition']
  },
  mode: {
    type: String,
    required: true,
    enum: ['online', 'offline', 'hybrid']
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  participants: {
    type: String,
    default: '0'
  },
  prize: {
    type: String,
    default: 'No prize'
  },
  image: {
    type: String,
    default: ''
  },
  organizer: {
    type: String,
    required: true
  },
  website: {
    type: String,
    default: '#'
  },
  deadline: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String
  }],
  requirements: {
    type: String,
    default: ''
  },
  registrationLink: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search functionality
eventSchema.index({ title: 'text', description: 'text', domain: 'text' });

module.exports = mongoose.model('Event', eventSchema); 