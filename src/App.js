import React, { useEffect, useState } from 'react';
import './App.css';
import { MongoClient } from 'mongodb';
import axios from 'axios';

function App() {
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      
      try {
        // Fetch resources and events from the backend API
        const resourcesResponse = await axios.get('http://localhost:5000/api/resources');
        const eventsResponse = await axios.get('http://localhost:5000/api/events');

        setResources(resourcesResponse.data);
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      /*const uri = process.env.MONGODB_URI;

      try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const db = client.db(); // default to the database in your URI
        const resourcesCollection = db.collection('trainingresources');
        const eventsCollection = db.collection('events');

        const resourcesData = await resourcesCollection.find().toArray();
        const eventsData = await eventsCollection.find().toArray();

        setResources(resourcesData);
        setEvents(eventsData);

        client.close();
      } catch (error) {
        console.error("Error fetching data:", error);
      }*/
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Training Resources & Events</h1>
      </header>

      <main>
        <section>
          <h2>Training Resources</h2>
          <div className="card-grid">
            {resources.map(resource => (
              <div key={resource._id} className="resource-card">
                <h3>{resource.title}</h3>
                <div className="resource-details">
                  <span>{resource.description}</span>
                  <span>Category: {resource.category}</span>
                </div>
                <div className="tag-container">
                  {resource.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Events</h2>
          <div className="card-grid">
            {events.map(event => (
              <div key={event._id} className="event-card">
                <h3>{event.title}</h3>
                <div className="event-details">
                  <span>{event.description}</span>
                  <span>Date: {new Date(event.date).toLocaleDateString()}</span>
                  <span>Location: {event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
