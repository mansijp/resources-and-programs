import React, { useState, useEffect } from 'react';
import NavBar from './Navbar/NavBar';
import axios from 'axios';
import Notiflix from 'notiflix';

const Home = () => {
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
            <div className="home" id='home'>
                <div>
                    <NavBar />
                </div>
                
                <div className="m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 h-5/6 text-center" data-aos="zoom-in">
                    <div className="justify-center" data-aos="zoom-in" data-aos-delay="200">
                        <h1 className="mb-5 md:text-5xl text-3xl font-bold text-blue-900">
                            <br></br>
                            Welcome to BizPoints Resources Page!
                        </h1>

                        <div className="text-xl font-semibold tracking-tight mb-5 text-gray-500">Scroll down to access Training Resources, Sign up for events, and Complete exercises.</div>

                        <br></br>
                        <div className="text-xl text-gray-500">
                            <span><b>Username: </b></span>
                            <span htmlFor={user.userId} className="ml-1">{user.userId},</span>
                            <span className="ml-5"><b>Training Progress: </b></span>
                            <span><label htmlFor={user.userId} className="ml-1">{user.totalPointsEarned}% </label></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;