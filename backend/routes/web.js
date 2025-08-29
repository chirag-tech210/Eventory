const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Home page
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('createdBy', 'name');

    res.render('home', {
      title: 'Event Portal - Home',
      events,
      user: req.user || null
    });
  } catch (error) {
    console.error('Home page error:', error);
    res.render('home', {
      title: 'Event Portal - Home',
      events: [],
      user: req.user || null,
      error: 'Failed to load events'
    });
  }
});

// Events page
router.get('/events', async (req, res) => {
  try {
    const { 
      page = 1, 
      type, 
      mode, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = { isActive: true };
    const limit = 12;

    // Apply filters
    if (type && type !== 'all') query.type = type;
    if (mode && mode !== 'all') query.mode = mode;
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const events = await Event.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('createdBy', 'name email')
      .exec();

    const total = await Event.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // Get event counts by type
    const eventCounts = await Event.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    res.render('events', {
      title: 'Events - Event Portal',
      events,
      currentPage: parseInt(page),
      totalPages,
      total,
      filters: { type, mode, search, sortBy, sortOrder },
      eventCounts,
      user: req.user || null
    });
  } catch (error) {
    console.error('Events page error:', error);
    res.render('events', {
      title: 'Events - Event Portal',
      events: [],
      currentPage: 1,
      totalPages: 0,
      total: 0,
      filters: {},
      eventCounts: [],
      user: req.user || null,
      error: 'Failed to load events'
    });
  }
});

// Single event page
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email')
      .exec();

    if (!event) {
      return res.status(404).render('error', {
        title: 'Event Not Found',
        message: 'The event you are looking for does not exist.',
        user: req.user || null
      });
    }

    // Get related events
    const relatedEvents = await Event.find({
      _id: { $ne: event._id },
      type: event.type,
      isActive: true
    })
    .limit(3)
    .populate('createdBy', 'name');

    res.render('event-detail', {
      title: `${event.title} - Event Portal`,
      event,
      relatedEvents,
      user: req.user || null
    });
  } catch (error) {
    console.error('Event detail error:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to load event details.',
      user: req.user || null
    });
  }
});

// Login page
router.get('/login', (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('login', {
    title: 'Login - Event Portal',
    user: null
  });
});

// Register page
router.get('/register', (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('register', {
    title: 'Register - Event Portal',
    user: null
  });
});

// Dashboard (protected)
router.get('/dashboard', auth, async (req, res) => {
  try {
    const userEvents = await Event.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name');

    res.render('dashboard', {
      title: 'Dashboard - Event Portal',
      user: req.user,
      events: userEvents
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.render('dashboard', {
      title: 'Dashboard - Event Portal',
      user: req.user,
      events: [],
      error: 'Failed to load dashboard'
    });
  }
});

// Add event page (protected)
router.get('/add-event', auth, (req, res) => {
  res.render('add-event', {
    title: 'Add Event - Event Portal',
    user: req.user
  });
});

// Edit event page (protected)
router.get('/edit-event/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).render('error', {
        title: 'Event Not Found',
        message: 'The event you are trying to edit does not exist.',
        user: req.user
      });
    }

    // Check if user is owner or admin
    if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).render('error', {
        title: 'Access Denied',
        message: 'You are not authorized to edit this event.',
        user: req.user
      });
    }

    res.render('edit-event', {
      title: 'Edit Event - Event Portal',
      user: req.user,
      event
    });
  } catch (error) {
    console.error('Edit event error:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to load event for editing.',
      user: req.user
    });
  }
});

// Profile page (protected)
router.get('/profile', auth, (req, res) => {
  res.render('profile', {
    title: 'Profile - Event Portal',
    user: req.user
  });
});

// About page
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About - Event Portal',
    user: req.user || null
  });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact - Event Portal',
    user: req.user || null
  });
});

module.exports = router; 