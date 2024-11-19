const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import MongoDB Models
const ClientProgress = require('./models/ClientProgress');
const Event = require('./models/Event');
const TrainingResource = require('./models/TrainingResource');

// Import Routes
const trainingResourceRoutes = require('./routes/trainingResourceRoutes');

// Loading environment, middleware, and port
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

// Using routes
app.use('/api/training-resources', trainingResourceRoutes);

//-------------Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

//------------------API endpoints - GET
app.get('/api/client-progress/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const progress = await ClientProgress.findOne({ userId });

    if (!progress) {
      return res.status(404).json({ message: 'User progress not found' });
    }

    res.json(progress);
  } catch (error) {
    console.error('Error fetching client progress:', error);
    res.status(500).send('Error fetching client progress');
  }
});

app.get('/api/events/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const event = await Event.findById(title);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).send('Error fetching event');
  }
});

app.get('/api/training-resources/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const resource = await TrainingResource.findById(title);

    if (!resource) {
      return res.status(404).json({ message: 'Training resource not found' });
    }

    res.json(resource);
  } catch (error) {
    console.error('Error fetching training resource:', error);
    res.status(500).send('Error fetching training resource');
  }
});

//----------------------API endpoints - PUT
app.put('/api/training-resources/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const updatedData = req.body;

    // update
    const updatedResource = await TrainingResource.findOneAndUpdate(
      { title }, 
      updatedData,
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: 'Training resource not found' });
    }

    res.json(updatedResource);
  } catch (error) {
    console.error('Error updating training resource:', error);
    res.status(500).send('Error updating training resource');
  }
});

app.put('/api/events/:title', async (req, res) => {
  try {
    const { title } = req.params; 
    const updatedData = req.body; 

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: 'No update data provided' });
    }

    const updatedResource = await Event.findOneAndUpdate(
      { title },            
      { $set: updatedData }, 
      { new: true, runValidators: true } 
    );

    if (!updatedResource) {
      return res.status(404).json({ message: 'Training resource not found' });
    }

    res.json(updatedResource);

  } catch (error) {
    console.error('Error updating training resource:', error);
    res.status(500).json({ message: 'Error updating training resource' });
  }
});


//--------------------Start the server
app.listen(port, () => {
  console.log('Server running at http://localhost:${port}');
});

/* Test adding a training resource

curl -X POST http://localhost:5000/api/training-resources/add ^
-H "Content-Type: application/json" ^
-d "{\"title\": \"Introduction to Data Science\", \"type\": \"webinar\", \"description\": \"An introductory webinar on Data Science concepts and tools.\", \"content\": {\"url\": \"https://example.com/data-science-webinar\", \"duration\": 120, \"fileType\": \"video\"}, \"pointsAwarded\": 50, \"categories\": [\"data science\", \"beginner\", \"webinar\"]}"


curl -X GET "http://localhost:5000/api/training-resources/Introduction%20to%20Data%20Science" ^
-H "Content-Type: application/json"


*/