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
const clientProgressRoutes = require('./routes/clientProgressRoutes');

// Loading environment, middleware, and port
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

// Configure cors
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Using routes
app.use('/api/training-resources', trainingResourceRoutes);
app.use('/api/client-progress', clientProgressRoutes);

//-------------Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

//------------------API endpoints - GET------------------
app.get('/api/client-progress/', async (req, res) => {
  try {
    const progress = await ClientProgress.find().select('userId totalPointsEarned');
    res.json(progress);
  } catch (error) {
    console.error('Error fetching client progress:', error);
    res.status(500).send('Error fetching client progress');
  }
});

app.get('/api/client-progress/points-only/', async (req, res) => {
  try {
    const progress = await ClientProgress.find().select('totalPointsEarned');
    res.json(progress);
  } catch (error) {
    console.error('Error fetching client progress:', error);
    res.status(500).send('Error fetching client progress');
  }
});

app.get('/api/events/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const event = await Event.findOne({title});

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).send('Error fetching event');
  }
});

app.get('/api/training-resources/', async (req, res) => {
  try {
    const resources = await TrainingResource.find().select('title _id');
    res.json(resources);
  } catch (error) {
    console.error('Error fetching training resources:', error);
    res.status(500).json({ message: 'Error fetching training resources', error });
  }
});

app.get('/api/training-resources/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const resource = await TrainingResource.findOne({title});

    if (!resource) {
      return res.status(404).json({ message: 'Training resource not found' });
    }

    res.json(resource);
  } catch (error) {
    console.error('Error fetching training resource:', error);
    res.status(500).send('Error fetching training resource');
  }
});

//----------------------API endpoints - PUT, PATCH----------------------
app.put('/api/client-progress/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    const updatedData = req.body;

    const updatedUser = await ClientProgress.findByIdAndUpdate(
      clientId,
      updatedData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Client Progress not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating client progress:', error);
    res.status(500).json({ message: 'Error updating client progress', error });
  }
});

app.patch('/api/training-resources/:resourceId', async (req, res) => {
  try {
    const { resourceId } = req.params;
    const updatedData = req.body;

    const updatedResource = await TrainingResource.findByIdAndUpdate(
      resourceId, 
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

app.put('/api/training-resources/:resourceId', async (req, res) => {
  try {
    const { resourceId } = req.params;
    const { title } = req.body;
    const updatedData = { title };

    const updatedResource = await TrainingResource.findByIdAndUpdate(
      resourceId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: 'Training resource not found' });
    }
    res.json(updatedResource);
  } catch (error) {
    console.error('Error updating training resource:', error);
    res.status(500).json({ message: 'Error updating training resource', error });
  }
});

//------------------API endpoints - DELETE
app.delete('/api/training-resources/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResource = await TrainingResource.findByIdAndDelete(id);

    if (!deletedResource) {
      return res.status(404).json({ message: 'Training resource not found' });
    }
    res.json({ message: 'Training resource deleted successfully' });
  } catch (error) {
    console.error('Error deleting training resource:', error);
    res.status(500).json({ message: 'Error deleting training resource', error });
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