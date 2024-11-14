require('dotenv').config();
const mongoose = require('mongoose');
const TrainingResource = require('../models/TrainingResource');
const Event = require('../models/Event');
const ClientProgress = require('../models/ClientProgress');

const connectOptions = {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  retryWrites: true,
  retryReads: true
};


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, connectOptions);
    console.log('Connected to MongoDB');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const clientProgress = [
  {
    userId: "user1",
    completedResources: [
      {
        resourceId: "resource1",
        completionDate: new Date("2024-01-15"),
        pointsEarned: 150
      },
      {
        resourceId: "resource2",
        completionDate: new Date("2024-02-01"),
        pointsEarned: 50
      }
    ],
    attendedEvents: [
      {
        eventId: "event1",
        attendanceDate: new Date("2024-01-20"),
        pointsEarned: 1000
      }
    ],
    totalPointsEarned: 1200,
    learningPath: {
      currentLevel: "intermediate",
      completedModules: ["analytics-basics", "business-intelligence"]
    },
    lastActivityDate: new Date("2024-02-01")
  },
  {
    userId: "user2",
    completedResources: [
      {
        resourceId: "resource3",
        completionDate: new Date("2024-01-10"),
        pointsEarned: 30
      }
    ],
    attendedEvents: [
      {
        eventId: "event2",
        attendanceDate: new Date("2024-01-25"),
        pointsEarned: 300
      }
    ],
    totalPointsEarned: 330,
    learningPath: {
      currentLevel: "beginner",
      completedModules: ["software-basics"]
    },
    lastActivityDate: new Date("2024-01-25")
  },
  {
    userId: "user3",
    completedResources: [
      {
        resourceId: "resource1",
        completionDate: new Date("2024-02-05"),
        pointsEarned: 150
      },
      {
        resourceId: "resource2",
        completionDate: new Date("2024-02-10"),
        pointsEarned: 50
      },
      {
        resourceId: "resource3",
        completionDate: new Date("2024-02-15"),
        pointsEarned: 30
      }
    ],
    attendedEvents: [
      {
        eventId: "event1",
        attendanceDate: new Date("2024-02-01"),
        pointsEarned: 1000
      },
      {
        eventId: "event2",
        attendanceDate: new Date("2024-02-10"),
        pointsEarned: 300
      }
    ],
    totalPointsEarned: 1530,
    learningPath: {
      currentLevel: "advanced",
      completedModules: ["analytics-basics", "business-intelligence", "advanced-analytics"]
    },
    lastActivityDate: new Date("2024-02-15")
  }
];

const trainingResources = [
  {
    title: "Advanced Business Analytics with AlphaBiz",
    type: "webinar",
    description: "Master the art of business analytics using AlphaBiz's premium tools.",
    content: {
      url: "https://training.alphabiz.com/webinars/advanced-analytics",
      duration: 120,
      fileType: "video"
    },
    pointsAwarded: 150,
    categories: ["analytics", "advanced", "business intelligence"],
    isActive: true
  },
  {
    title: "Getting Started with AlphaBiz Suite",
    type: "tutorial",
    description: "A comprehensive introduction to AlphaBiz's software suite.",
    content: {
      url: "https://training.alphabiz.com/tutorials/beginner-guide",
      duration: 45,
      fileType: "document"
    },
    pointsAwarded: 50,
    categories: ["beginner", "software basics"],
    isActive: true
  },
  {
    title: "Data-Driven Decision Making",
    type: "article",
    description: "Learn how to make better business decisions using data analytics.",
    content: {
      url: "https://training.alphabiz.com/articles/data-decisions",
      duration: 15,
      fileType: "text"
    },
    pointsAwarded: 30,
    categories: ["decision making", "analytics"],
    isActive: true
  }
];

const events = [
  {
    title: "AlphaBiz Annual Summit 2024",
    description: "Join us for our biggest event of the year featuring industry experts and networking opportunities.",
    type: "conference",
    startDate: new Date("2024-12-15T09:00:00Z"),
    endDate: new Date("2024-12-16T17:00:00Z"),
    capacity: 500,
    registeredAttendees: [],
    pointsAwarded: 1000,
    location: "in-person",
    venue: "Tech Convention Center, Silicon Valley",
    isActive: true
  },
  {
    title: "Mastering Business Analytics Workshop",
    description: "Hands-on workshop for advanced analytics techniques.",
    type: "workshop",
    startDate: new Date("2024-11-20T13:00:00Z"),
    endDate: new Date("2024-11-20T17:00:00Z"),
    capacity: 50,
    registeredAttendees: [],
    pointsAwarded: 300,
    location: "online",
    meetingLink: "https://alphabiz.zoom.us/workshop",
    isActive: true
  },
  {
    title: "New Features Training Session",
    description: "Learn about the latest features in AlphaBiz Suite 2024.",
    type: "training",
    startDate: new Date("2024-11-01T10:00:00Z"),
    endDate: new Date("2024-11-01T12:00:00Z"),
    capacity: 100,
    registeredAttendees: [],
    pointsAwarded: 150,
    location: "online",
    meetingLink: "https://alphabiz.zoom.us/training",
    isActive: true
  }
];

const insertData = async () => {
  let connection;
  try {

    connection = await connectDB();


    console.log('Clearing existing data...');
    await Promise.all([
      TrainingResource.deleteMany({}).maxTimeMS(20000),
      Event.deleteMany({}).maxTimeMS(20000)
    ]);

    console.log('Inserting training resources...');
    for (let i = 0; i < trainingResources.length; i += 10) {
      const chunk = trainingResources.slice(i, i + 10);
      await TrainingResource.insertMany(chunk, { timeout: 20000 });
    }

    console.log('Inserting events...');
    for (let i = 0; i < events.length; i += 10) {
      const chunk = events.slice(i, i + 10);
      await Event.insertMany(chunk, { timeout: 20000 });
    }

    console.log('Inserting client progress...');
    for (let i = 0; i < clientProgress.length; i += 10) {
       const chunk = clientProgress.slice(i, i + 10);
       await ClientProgress.insertMany(chunk, { timeout: 20000 });
    }

    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
    process.exit(1);
  } finally {
    if (connection) {
      try {
        await mongoose.connection.close();
        console.log('Database connection closed');
      } catch (error) {
        console.error('Error closing database connection:', error);
      }
    }
  }
};

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Database connection closed through app termination');
    process.exit(0);
  });
});

insertData();