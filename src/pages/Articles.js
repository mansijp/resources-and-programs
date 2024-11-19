import React, { useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import {useDocTitle} from '../components/CustomHook';
import axios from 'axios';
import { HashLink } from 'react-router-hash-link';
// import emailjs from 'emailjs-com';
import Notiflix from 'notiflix';

const Articles = (props) => {

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div id='demo' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
                    
                        <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                            <div className="flex">
                                <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">Articles</h1>
                                
                            </div>
                            <div className="flex items-center my-4 lg:text-left">
                                    <p>
                                    <a href="https://learn.library.torontomu.ca/business" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" target ="_blank">
                                    Business Articles Database</a>
                                    </p>
                                    </div>
                            <div className="flex items-center my-4 lg:text-left">
                                    <p>
                                    <a href="https://learn.library.torontomu.ca/c.php?g=344838&p=5334613" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" target ="_blank">
                                    Business/Information Technology Management (ITM) Articles</a>
                                    </p>
                                </div>
                                    <div className="flex items-center my-4 lg:text-left">
                                    <p>
                                    <a href="https://learn.library.torontomu.ca/az/databases" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" target ="_blank">
                                    Entrepreneurship Database</a>
                                    </p> 
                            </div>
                            
                            

                        
                        
                    </div>
                    
                </div>
            </div>
            <Footer />
        </>


    )
}

export default Articles;