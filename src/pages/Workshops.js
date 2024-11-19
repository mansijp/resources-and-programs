import React from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';

const Workshops = (props) => {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div id='demo' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
                    <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">Workshops </h1>
                        </div>
                        <div className="flex items-center my-4 lg:text-left">
                            <p>
                            <a href="https://www.torontomu.ca/tedrogersschool/family-business-institute/research-awards/workshops/" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" target ="_blank">
                            Business Invited talks and workshops</a>
                            </p>
                        </div>
                        <div className="flex items-center my-4 lg:text-left">
                            <p>
                            <a href="https://www.torontomuic.ca/programs/business-management/" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" target ="_blank">
                            Introduction to Business Workshop</a>
                            </p>
                        </div>
                        <div className="flex items-center my-4 lg:text-left">
                            <p>
                            <a href="https://infoliteracy.senecapolytechnic.ca/OER/BAM101/BAM101final.pdf" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" target ="_blank">
                            Ted Rogers School of Management Workshops</a>
                            </p> 
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Workshops;