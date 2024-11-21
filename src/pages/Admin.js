import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
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
                Notiflix.Report.failure(
                    'Error',
                    `There was an error fetching the resources. Please try again. ${error.message}`,
                    'Okay'
                );
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
                setResources((prevResources) => [...prevResources, response.data]);
            } else {
                setNotificationA('There was an issue adding the resource.');
            }
            setTimeout(() => {
                setNotificationA(null);
            }, 3000);
            setTitle('');
        } catch (error) {
            console.error("Error adding resource", error);
            Notiflix.Report.failure(
                'Error',
                'There was an error adding the resource. Please try again.',
                'Okay'
            );
        }
    };

    const handleCheckboxChange = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setSelectedResources((prevSelected) => [...prevSelected, value]);
        } else {
            setSelectedResources((prevSelected) => prevSelected.filter((item) => item !== value));
        }
    };

    const handleRemoveResource = async (e) => {
        e.preventDefault();

        if (selectedResources.length === 0) {
            setNotificationB('No resources selected to remove.');
            setTimeout(() => {
                setNotificationB(null);
            }, 3000);
            return;
        }

        try {
            for (const resourceId of selectedResources) {
                const response = await axios.delete(`http://localhost:5000/api/training-resources/${resourceId}`);
                if (response.data) {
                    setNotificationB('Resource(s) removed successfully!');
                    setResources((prevResources) =>
                        prevResources.filter((resource) => resource._id !== resourceId)
                    );
                } else {
                    setNotificationB('There was an issue removing the resource.');
                }
            }
            setTimeout(() => {
                setNotificationB(null);
            }, 2000);
            setSelectedResources([]);
        } catch (error) {
            console.error("Error removing resource", error);
            Notiflix.Report.failure(
                'Error',
                'There was an error removing the resource(s). Please try again.',
                'Okay'
            );
        }
    };

    const handleUpdateResource = async (e) => {
        e.preventDefault();

        if (selectedResources.length !== 1) {
            setNotificationC('Please select exactly one resource to update.');
            setTitle('');
            setTimeout(() => {
                setNotificationC(null);
            }, 3000);
            return;
        }

        const resourceId = selectedResources[0];
        try {
            const response = await axios.patch(`http://localhost:5000/api/training-resources/${resourceId}`, { title });
            if (response.data) {
                setNotificationC('Resource updated successfully!');
                setResources((prevResources) =>
                    prevResources.map((resource) =>
                        resource._id === resourceId ? { ...resource, title } : resource
                    )
                );
                setSelectedResources([]);   // clear the checkbox
                setTimeout(() => {
                    setNotificationC(null);
                }, 2000);                   // cofnirmation for 2 seconds
                setTitle('');               // clear the title field
            } else {
                setNotificationC('There was an issue updating the resource.');
                setTimeout(() => {
                    setNotificationC(null);
                }, 2000);                   // 2 second error notification
            }
        // notflix error notification on full screen
        } catch (error) {
            console.error("Error updating resource", error);
            Notiflix.Report.failure(
                'Error',
                'There was an error updating the resource. Please try again.',
                'Okay'
            );
        }
    };

    const clearErrors = () => {
        setErrors([])
    }
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div id='contact' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24 ">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
                    <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            <h2 className="font-bold text-center lg:text-left text-blue-900 text-4xl">Client Training Resources<br></br> <br></br></h2>
                        </div>
                        <form onSubmit={handleSubmitResource}>

                            <div className="flex">
                                <p><b>Add a Client Training Resource:</b></p>
                            </div>

                            <div className="my-4">
                                <textarea
                                    name="message"
                                    placeholder="Add New Training Resource*"
                                    className="w-full h-14 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    onKeyUp={clearErrors}
                                ></textarea>
                                {errors &&
                                    <p className="text-red-500 text-sm">{errors.message}</p>
                                }
                            </div>

                            <div>
                                {notificationA && (
                                    <div className="notificationA">
                                        {notificationA}
                                    </div>
                                )}
                                <Link onClick={handleSubmitResource} to="" className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-2 my-4 text-lg shadow-xl rounded-2xl sm:w-auto sm:mb-0 group">
                                    Submit Resource
                                    <svg className="w-4 h-4 ml-1 group-hover: translate-x-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </Link><br/><br/>
                            </div>

                        </form>

                        <form onSubmit={handleRemoveResource}>
                            
                            <div className="my-4">
                                <p><b>Select Existing Resources:<br/><br/></b></p>
                                {resources.length > 0 ? (
                                    <div className="space-y-2">
                                        {resources.map((resource) => (
                                            <div key={resource._id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={resource._id}
                                                    value={resource._id}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label htmlFor={resource._id} className="ml-2">{resource.title}</label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No resources found</p>
                                )}

                                <div>
                                    {notificationB && (
                                        <div className="notificationA text-blue">
                                            {notificationB}
                                        </div>
                                    )}
                                    <Link onClick={handleRemoveResource} to="" className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-2 my-4 text-lg shadow-xl rounded-2xl sm:w-auto sm:mb-0 group">
                                        Remove Resource(s)
                                        <svg className="w-4 h-4 ml-1 group-hover: translate-x-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </Link><br/><br/>
                                </div>
                            </div>
                        </form>

                        <form onSubmit={handleUpdateResource}>
                            <p><b>Update Existing Resources <u>(select above)</u>:<br/></b></p>
                            <div>
                                {notificationC && (
                                    <div className="notificationA text-blue">
                                        {notificationC}
                                    </div>
                                )}
                                <div className="my-4">
                                    <textarea
                                        name="message"
                                        placeholder="Update Resource Title*"
                                        className="w-full h-14 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        onKeyUp={clearErrors}
                                    ></textarea>
                                    {errors &&
                                        <p className="text-red-500 text-sm">{errors.message}</p>
                                    }
                                </div>
                                <Link onClick={handleUpdateResource} to="" className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-2 my-4 text-lg shadow-xl rounded-2xl sm:w-auto sm:mb-0 group">
                                    Update Selected Resource
                                    <svg className="w-4 h-4 ml-1 group-hover: translate-x-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Admin;