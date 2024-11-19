import React from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';

const Tools = (props) => {

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div id='demo' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
                    <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                             <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">business development tools </h1>
                        </div>
                        <div className="flex items-center my-4 lg:text-left">
                            <p>
                            <a href="https://learn.utoronto.ca/programs-courses/courses/2565-tools-techniques-business-process-management" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" target ="_blank">
                            Tools & Techniques of Business Process Management</a>
                            </p>
                        </div>
                        <div className="flex items-center my-4 lg:text-left">
                            <p>
                            <a href="https://www.torontomu.ca/content/dam/tedrogersschool/business-career-hub/hub-insights/strive-to-thrive-reports/2023-2024/Career_Research.pdf" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" target ="_blank">
                            Tips on Doing Your Own Career Research</a>
                            </p>
                        </div>
                        <div className="flex items-center my-4 lg:text-left">
                            <p>
                            <a href="https://www.torontomu.ca/content/dam/fcs/pdfs/research/fcs-src-handbook.pdf" className="text-[#013289] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" target ="_blank">
                            Faculty of Community Services Scholarly, Research and Creative Activity Handbook</a>
                            </p> 
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Tools;