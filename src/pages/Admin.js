import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer/Footer';
import axios from 'axios';
import Notiflix from 'notiflix';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [notificationA, setNotificationA] = useState(null);
  const [notificationB, setNotificationB] = useState(null);
  const [notificationC, setNotificationC] = useState(null);
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/training-resources/');
        if (response.data) {
          setResources(response.data);
        } else {
          throw new Error('Resources data is missing or malformed');
        }
      } catch (error) {
        console.error("Error fetching resources", error);
        Notiflix.Report.failure('Error', `There was an error fetching the resources. Please try again. ${error.message}`, 'Okay');
      }
    };
    fetchResources();
  }, []);

  const fixedType = "webinar";
  const fixedDescription = "A training resource for clients";
  const fixedPointsAwarded = 150;
  const fixedCategories = ["analytics", "logical"];

  const handleSubmitResource = async (e) => {
    e.preventDefault();
    const newResource = {
      title,
      type: fixedType,
      description: fixedDescription,
      pointsAwarded: fixedPointsAwarded,
      categories: fixedCategories,
    };
    try {
      const response = await axios.post('http://localhost:5000/api/training-resources/add', newResource);
      if (response.data) {
        setNotificationA('Resource added successfully!');
        setResources(prev => [...prev, response.data]);
      } else {
        setNotificationA('There was an issue adding the resource.');
      }
      setTimeout(() => setNotificationA(null), 3000);
      setTitle('');
        setSelectedResources([]);
    } catch (error) {
      console.error("Error adding resource", error);
      Notiflix.Report.failure('Error', 'There was an error adding the resource. Please try again.', 'Okay');
    }
  };

  const handleCheckboxChange = (e) => {
    const { checked, value } = e.target;
    setSelectedResources(prev => checked ? [...prev, value] : prev.filter(id => id !== value));
  };

  const handleRemoveResource = async (e) => {
    e.preventDefault();
    if (!selectedResources.length) {
      setNotificationB('No resources selected to remove.');
      setTimeout(() => setNotificationB(null), 3000);
      return;
    }
    try {
      for (const id of selectedResources) {
        await axios.delete(`http://localhost:5000/api/training-resources/${id}`);
      }
      setNotificationB('Resource(s) removed successfully!');
      setResources(prev => prev.filter(r => !selectedResources.includes(r._id)));
      setSelectedResources([]);
      setTimeout(() => setNotificationB(null), 2000);
    } catch (error) {
      console.error("Error removing resource", error);
      Notiflix.Report.failure('Error', 'There was an error removing the resource(s). Please try again.', 'Okay');
    }
  };

  const handleUpdateResource = async (e) => {
    e.preventDefault();
    if (selectedResources.length !== 1) {
      setNotificationC('Please select exactly one resource to update.');
      setTitle('');
        setSelectedResources([]);
      setTimeout(() => setNotificationC(null), 3000);
      return;
    }
    const resourceId = selectedResources[0];
    try {
      const response = await axios.patch(`http://localhost:5000/api/training-resources/${resourceId}`, { title });
      if (response.data) {
        setNotificationC('Resource updated successfully!');
        setResources(prev => prev.map(r => r._id === resourceId ? { ...r, title } : r));
        setSelectedResources([]);
        setTitle('');
        setSelectedResources([]);
        setTimeout(() => setNotificationC(null), 2000);
      } else {
        setNotificationC('There was an issue updating the resource.');
        setTimeout(() => setNotificationC(null), 2000);
      }
    } catch (error) {
      console.error("Error updating resource", error);
      Notiflix.Report.failure('Error', 'There was an error updating the resource. Please try again.', 'Okay');
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-14">
          <h2 className="text-3xl font-bold text-green-600 mb-10 text-center">Client Training Resources</h2>

          <form onSubmit={handleSubmitResource} className="mb-10">
            <label className="block text-gray-700 font-semibold mb-3">Add Resource</label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter new training resource title..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
              required
            ></textarea>
            {notificationA && <div className={`mb-5 mt-5 p-3 rounded ${notificationA.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{notificationA}</div>}
            <button type="submit" className="mt-5 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Submit Resource
            </button>
          </form>

          <form onSubmit={handleRemoveResource} className="mb-10">
            <label className="block text-gray-700 font-semibold mb-3">Remove Resources</label>
            <div className="space-y-2">
              {resources.length ? resources.map((r) => (
                <div key={r._id} className="flex items-center">
                  <input type="checkbox" value={r._id} onChange={handleCheckboxChange} className="mr-2" />
                  <span>{r.title}</span>
                </div>
              )) : <p>No resources available</p>}
            </div>
            {notificationB && <div className={`mb-6 mt-5 p-3 rounded ${notificationB.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{notificationB}</div>}
            <button type="submit" className="mt-5 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Remove Selected
            </button>
          </form>

          <form onSubmit={handleUpdateResource}>
            <label className="block text-gray-700 font-semibold mb-3">Update Resource</label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Update selected resource title..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
              required
            ></textarea>
            {notificationC && <div className={`mb-5 mt-5 p-3 rounded ${notificationC.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{notificationC}</div>}
            <button type="submit" className="mt-5 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Update Selected Resource
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
