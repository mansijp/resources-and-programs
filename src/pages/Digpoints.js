import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import Notiflix from 'notiflix';

const Digpoints = () => {
    const [user, setUser] = useState([]);
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
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className="h-20"></div>
            <div className="m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 h-5/6 text-center" data-aos="zoom-in">
                <div className="justify-center" data-aos="zoom-in" data-aos-delay="200">
                    <h1 className="mb-5 md:text-5xl text-3xl font-bold text-blue-900">
                        <br></br>
                        Congratulations! You have successfully completed the exercises.
                    </h1>

                    <div id="myProgress">
                        <div id="Bar4">100%</div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
                <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                    <div className="flex">
                        <h2 className="font-bold text-center lg:text-left text-blue-900 text-4xl">Client Progress<br></br> <br></br></h2>
                    </div>

                    <div className="flex text-xl">
                        <p><b>Username:</b></p>
                        <div key={user.userId} className="flex items-center">
                            <label htmlFor={user.userId} className="ml-2">{user.userId}</label>
                        </div>
                    </div> <br></br>

                    <div className="flex text-xl">
                        <p><b>Points Collected: </b></p>
                        <div key={user.userId} className="flex items-center">
                            <label htmlFor={user.userId} className="ml-2">{user.totalPointsEarned}</label>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Digpoints;