const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

let client;

// Connect to MongoDB
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  }
  return client.db();
}

// API endpoints
app.get('/api/resources', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const resourcesCollection = db.collection('trainingresources');

    const resources = await resourcesCollection.find().toArray();
    res.json(resources);

  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).send('Error fetching resources');
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const eventsCollection = db.collection('events');

    const events = await eventsCollection.find().toArray();
    res.json(events);
    
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send('Error fetching events');
  }
});

// Start the server
app.listen(port, () => {
  console.log('Server running at http://localhost:${port}');
});
