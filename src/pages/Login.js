import React, { useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import axios from 'axios';
import Notiflix from 'notiflix';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [notification, setNotification] = useState(null);

  const clearNotifications = () => {
    setErrors(null);
    setNotification(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearNotifications();

    if (!username || !password) {
      setErrors('Please fill in both username and password.');
      return;
    }

    try {
      // Call backend API to check userId existence
      const response = await axios.post('http://localhost:5000/api/check-user', { userId: username });
      if (response.data.exists) {
        setNotification(`Welcome back, ${username}!`);
        // TODO: Add further login logic here (e.g., auth token, redirect)
      } else {
        setErrors('User not found. Please register first.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Notiflix.Report.failure(
        'Login Failed',
        'There was an error logging in. Please try again later.',
        'Okay'
      );
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-green-600 text-center">Login</h2>

          {notification && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{notification}</div>
          )}
          {errors && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{errors}</div>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="block mb-2 font-semibold text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              required
              onFocus={clearNotifications}
            />

            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mb-8 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              required
              onFocus={clearNotifications}
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
