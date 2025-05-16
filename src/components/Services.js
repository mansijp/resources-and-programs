import leadership from '../images/leadership.png'; 
import smallbusiness from '../images/smallbusiness.png'; 
import sustainablebusiness from '../images/sustainablebusiness.png'; 
import digitaltransformation from '../images/digitaltransformation.png'; 

import { Link } from 'react-router-dom';
import axios from 'axios';
import Notiflix from 'notiflix';
import React, { useState, useEffect } from 'react';

const Services = () => {
    const [userPoints, setUserPoints] = useState();

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/client-progress/points-only/');
                if (response.data && response.data.length > 0) {
                    setUserPoints(response.data[0]);
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

    const handleUpdatePoints = async (e) => {
        e.preventDefault();
        try {
            let updatedPoints = 0;
            const response = await axios.put(`http://localhost:5000/api/client-progress/${userPoints._id}/reset`, {
                totalPointsEarned: updatedPoints   
            });
            window.location.reload();
            if (response.data && response.data.totalPointsEarned) {
                setUserPoints((prevUserPoints) => ({
                    ...prevUserPoints,
                    totalPointsEarned: response.data.totalPointsEarned,
                }));
                Notiflix.Report.success(
                    'Success',
                    `Points updated successfully! Total points: ${response.data.totalPointsEarned}`,
                    'Okay'
                );
            }
            await axios.put(`http://localhost:5000/api/client-progress/${userPoints._id}/level`, {
                level: 'Rookie'
            });
        } catch (error) {
            console.error("Error updating points", error);
            Notiflix.Report.failure(
                'Error',
                'There was an error updating the points. Please try again.',
                'Okay'
            );
        }
    };

    return (
        <div id="services" className="bg-gray-100 py-12">
            <section data-aos="zoom-in-down">
                <div className="my-4 py-4">
                    <h2 className="my-2 text-center text-3xl text-green-700 uppercase font-bold">Learning Activities</h2>
                    <div className='flex justify-center'>
                        <div className='w-24 border-b-4 border-green-700'></div>
                    </div>
                    <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-green-700">
                        Complete some fun exercises and view your learning progress!
                    </h2>
                </div>

                <div className="px-12" data-aos="fade-down" data-aos-delay="600">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[{
                            img: leadership,
                            title: "Leadership",
                            path: "/Leadership"
                        }, {
                            img: smallbusiness,
                            title: "Small Business Growth",
                            path: "/Business"
                        }, {
                            img: sustainablebusiness,
                            title: "Sustainable Business Practices",
                            path: "/Sustainable"
                        }, {
                            img: digitaltransformation,
                            title: "Digital Transformation",
                            path: "/Digital"
                        }].map((activity, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col justify-between bg-white text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-lg shadow-xl transition-all duration-400 group h-full min-h-[40vh]"
                            >
                                <div className="p-4 pb-0">
                                    <img
                                        alt="activity"
                                        src={activity.img}
                                        className="rounded-lg group-hover:scale-[1.05] transition duration-700 ease-in-out w-full"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h2 className="font-semibold text-xl text-green-700">{activity.title}</h2>
                                    <Link
                                        to={activity.path}
                                        className="mt-4 inline-block text-white bg-green-600 hover:bg-green-700 transition px-5 py-2 text-sm font-semibold rounded-xl shadow-md"
                                    >
                                        Start Activity
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleUpdatePoints}
                            className="text-white bg-green-700 hover:bg-green-800 transition inline-flex items-center justify-center w-auto px-6 py-2 text-lg shadow-xl rounded-2xl"
                        >
                            Erase Training Progress
                            <svg
                                className="w-4 h-4 ml-1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
