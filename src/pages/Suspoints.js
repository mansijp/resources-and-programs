import React from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';

const Suspoints = () => {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className="m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 h-5/6 text-center" data-aos="zoom-in">
                <div className="justify-center" data-aos="zoom-in" data-aos-delay="200">
                    <h1 className="mb-5 md:text-5xl text-3xl font-bold text-blue-900">
                        <br></br>
                        Congratulations! Complete all 4 exercises to get a perfect score
                    </h1>
                    <div id="myProgress">
                        <div id="Bar3">75%</div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Suspoints;