const mongoose = require('mongoose');
const Event = require('./models/Event');
const User = require('./models/User');
require('dotenv').config();

const sampleEvents = [
  {
    title: "Sample Hackathon 2025",
    description: "This is a demo hackathon event to showcase the event portal features. Not a real event.",
    type: "hackathon",
    mode: "offline",
    date: "March 15-17, 2025",
    location: "Demo Location",
    participants: "50+",
    prize: "$1,000",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop",
    organizer: "Demo Organizer",
    website: "#",
    deadline: "2025-03-10",
    domain: "Web Development"
  },
  {
    title: "Sample Internship Program",
    description: "This is a demo internship event to showcase the event portal features. Not a real opportunity.",
    type: "internship",
    mode: "offline",
    date: "Applications Open",
    location: "Demo Company",
    participants: "20",
    prize: "Stipend",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
    organizer: "Demo Company",
    website: "#",
    deadline: "2025-01-15",
    domain: "Software Engineering"
  },
  {
    title: "Sample Tech Symposium",
    description: "This is a demo tech symposium to showcase the event portal features. Not a real event.",
    type: "fest",
    mode: "offline",
    date: "April 5-7, 2025",
    location: "Demo Venue",
    participants: "200+",
    prize: "Certificates",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
    organizer: "Demo Tech Club",
    website: "#",
    deadline: "2025-03-25",
    domain: "Technology"
  },
  {
    title: "Sample Programming Contest",
    description: "This is a demo programming contest to showcase the event portal features. Not a real competition.",
    type: "competition",
    mode: "online",
    date: "May 10, 2025",
    location: "Online",
    participants: "100+",
    prize: "$500",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
    organizer: "Demo Programming Club",
    website: "#",
    deadline: "2025-05-05",
    domain: "Algorithms"
  },
  {
    title: "Sample Web Development Workshop",
    description: "This is a demo workshop to showcase the event portal features. Not a real workshop.",
    type: "workshop",
    mode: "offline",
    date: "June 20, 2025",
    location: "Demo Lab",
    participants: "30",
    prize: "Certificates",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop",
    organizer: "Demo Web Club",
    website: "#",
    deadline: "2025-06-15",
    domain: "Web Development"
  },
  {
    title: "Sample Data Science Workshop",
    description: "This is a demo workshop to showcase the event portal features. Not a real workshop.",
    type: "workshop",
    mode: "offline",
    date: "July 5, 2025",
    location: "Demo Lab",
    participants: "25",
    prize: "Certificates",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop",
    organizer: "Demo Data Club",
    website: "#",
    deadline: "2025-06-30",
    domain: "Data Science"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create a demo user
    const demoUser = new User({
      name: "Demo User",
      email: "demo@example.com",
      password: "password123",
      role: "admin"
    });
    await demoUser.save();
    console.log('Demo user created');

    // Create events with the demo user as creator
    for (const eventData of sampleEvents) {
      const event = new Event({
        ...eventData,
        createdBy: demoUser._id
      });
      await event.save();
    }
    console.log('Sample events created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase(); 