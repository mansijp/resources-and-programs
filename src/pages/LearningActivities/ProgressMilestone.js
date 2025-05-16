import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import Notiflix from 'notiflix';

const ProgressMilestone = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/client-progress/');
        if (response.data && response.data.length > 0) {
          setUser(response.data[0]);
        } else {
          throw new Error('Client progress data is missing or malformed');
        }
      } catch (error) {
        console.error("Error fetching client progress:", error);
        Notiflix.Report.failure(
          'Error',
          `There was an error fetching the client progress. Please try again. ${error.message}`,
          'Okay'
        );
      }
    };

    fetchPoints();
  }, []);

  const getMilestoneMessage = (points) => {
    switch (points) {
      case 25:
        return 'Beginner Level Complete! Keep going!';
      case 50:
        return 'Intermediate Level Reached! Great job!';
      case 75:
        return 'Advanced Progress Achieved!';
      case 100:
        return 'Perfect Score! You’ve completed all modules!';
      default:
        return 'Keep working through the modules to unlock your next milestone.';
    }
  };

  return (
    <>
      <NavBar />
      <div className="h-20"></div>

      {user && (
        <div className="min-h-[70vh] flex flex-col justify-center items-center bg-gray-100 px-4 py-12" data-aos="zoom-in">
          <div className="text-center" data-aos="zoom-in" data-aos-delay="200">
            <h1 className="mb-5 md:text-5xl text-3xl font-extrabold text-green-700 uppercase">
              {getMilestoneMessage(user.totalPointsEarned)}
            </h1>
            <div className="w-full max-w-xl bg-gray-300 rounded-full h-6 mt-6 mx-auto">
              <div
                className="bg-green-600 h-6 rounded-full text-white text-sm flex items-center justify-center transition-all duration-500"
                style={{ width: `${user.totalPointsEarned}%` }}
              >
                {user.totalPointsEarned}%
              </div>
            </div>
          </div>

          <div className="w-full max-w-4xl bg-white p-8 my-8 md:px-12 rounded-2xl shadow-2xl mx-auto">
            <h2 className="font-bold text-center text-green-700 text-4xl mb-4">Client Progress</h2>

            <div className="text-xl mb-4 text-gray-700">
              <p><b>Username:</b> <span className="ml-2">{user.userId}</span></p>
            </div>
            <div className="text-xl mb-4 text-gray-700">
              <p><b>Points Collected:</b> <span className="ml-2">{user.totalPointsEarned}</span></p>
            </div>
            <div className="text-xl text-gray-700">
              <p><b>Current Level:</b> <span className="ml-2 capitalize">{user.learningPath?.currentLevel || 'Not set'}</span></p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ProgressMilestone;
