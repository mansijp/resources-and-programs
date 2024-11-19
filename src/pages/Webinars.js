import React from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';

const Webinars = (props) => {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div id='demo' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
                    <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">Webinars</h1>
                        </div>
                        <div className="flex items-center my-4 lg:text-left">
                            <p>
                            <a href="https://www.torontomu.ca/xed/webinars/" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" target ="_blank">
                            Virtual Wellbeing Webinar Series</a>
                            </p>
                        </div>
                        <div className="flex items-center my-4 lg:text-left">
                            <p>
                            <a href="https://www.toronto.ca/business-economy/new-businesses-startups/business-webinars/" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" target ="_blank">
                            Business Webinars & Training</a>
                            </p>
                        </div>
                        <div className="flex items-center my-4 lg:text-left">
                            <p>
                            <a href="https://www.torontomu.ca/research/resources/km/" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" target ="_blank">
                            Inclusive Entrepreneurship Webinar Series | Spotlight on Diversity </a>
                            </p> 
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Webinars;