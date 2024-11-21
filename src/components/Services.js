import img from '../images/web.svg'; 
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
            const response = await axios.put(`http://localhost:5000/api/client-progress/${userPoints._id}`, {
                totalPointsEarned: updatedPoints  
            });
            window.location.reload();

            // success
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
        // notflix error notification on full screen
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
        <div id="services" className="bg-gray-100 py-12" >
            <section data-aos="zoom-in-down">
                    <div className="my-4 py-4">
                        <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">Learning Activities</h2>
                        <div className='flex justify-center'>
                            <div className='w-24 border-b-4 border-blue-900'></div>
                        </div>
                        <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">Complete some fun exercises and view your learning progress!</h2>
                    </div>

                    <div className="px-12" data-aos="fade-down" data-aos-delay="600">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                                <div className="flex justify-center my-4">
                                    <Link to="/Leadership" className="text-blue inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-xl">
                                    <div className="m-2 text-justify text-sm">
                                    <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={img} />
                                        <h2 className="font-semibold my-4 text-2xl text-center">Leadership</h2>
                                    </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                                <div className="flex justify-center my-4">
                                    <Link to="/Business" className="text-blue inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-xl">
                                    <div className="m-2 text-justify text-sm">
                                    <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={img} />
                                            <h2 className="font-semibold my-4 text-2xl text-center">Small Business Growth</h2>
                                    </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                                <div className="flex justify-center my-4">
                                    <Link to="/Sustainable" className="text-blue inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-xl">
                                    <div className="m-2 text-justify text-sm">
                                    <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={img} />
                                            <h2 className="font-semibold my-4 text-2xl text-center">Sustainable Business Practices</h2>
                                    </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                                <div className="flex justify-center my-4">
                                    <Link to="/Digital" className="text-blue inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-xl">
                                    <div className="m-2 text-justify text-sm">
                                    <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={img} />
                                            <h2 className="font-semibold my-4 text-2xl text-center">Digital Transformation</h2>
                                    </div>
                                    </Link>
                                </div>
                            </div>            
                        </div>
                        <div className="flex justify-center mt-6">
                            <Link onClick={handleUpdatePoints} to="" className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-2 text-lg shadow-xl rounded-2xl group">
                                Erase Training Progress
                                <svg className="w-4 h-4 ml-1 group-hover: translate-x-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
            </section>
        </div>
    )
}
export default Services;