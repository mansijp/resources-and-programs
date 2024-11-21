import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import Notiflix from 'notiflix';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

const Leadership = () => {
    
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState([]);
    const [userPoints, setUserPoints] = useState();
    const navigate = useNavigate();

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

    const clearErrors = () => {
        setErrors([])
    }

    //Update the points earned by +25
    const handleUpdatePoints = async (e) => {
        e.preventDefault();
        try {
            let updatedPoints = 0;
            if(userPoints.totalPointsEarned + 25 <= 100){
                updatedPoints = userPoints.totalPointsEarned + 25; 
            } else {
                updatedPoints = 100;
            }
            const response = await axios.put(`http://localhost:5000/api/client-progress/${userPoints._id}`, {
                totalPointsEarned: updatedPoints  // Send totalPointsEarned directly
            });
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

        // handling redirect
        switch (userPoints.totalPointsEarned + 25) {
            case 25:
                navigate('/Leadpoints'); //25 points
                break;
            case 50:
                navigate('/Buspoints'); //50 points
                break;
            case 75:
                navigate('/Suspoints'); //75 points
                break;
            case 100:
                navigate('/Digpoints'); //100 points
                break;
            default:
                navigate('/'); //home
                break;
        }
    };

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div id='contact' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24 ">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">

                <form onSubmit={handleUpdatePoints} >

                    <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            <h2 className="font-bold text-center lg:text-left text-blue-900 text-4xl">Strategic Decision-Making<br></br> <br></br></h2>
                        </div>
                        <div className="flex">
                        <p>Scenario: Your company is considering expanding into a new market but faces strong competition. What factors would you analyze before making a decision, and how would you present your recommendation to stakeholders?</p>
                        </div>
                        
                        <div className="my-4">
                            <textarea 
                                name="message" 
                                placeholder="Answer Here" 
                                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                value={message}
                                onChange={(e)=> setMessage(e.target.value)}
                                onKeyUp={clearErrors}
                            ></textarea>
                            {errors && 
                                <p className="text-red-500 text-sm">{errors.message}</p>
                            }
                        </div>
                        <Link onClick={handleUpdatePoints} to="" className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-2 my-4 text-lg shadow-xl rounded-2xl sm:w-auto sm:mb-0 group">
                                Submit
                                <svg className="w-4 h-4 ml-1 group-hover: translate-x-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </Link>
                    </div>
                </form>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Leadership;