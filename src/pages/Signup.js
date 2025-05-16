import React from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer/Footer';
const Signup = () => {
    return (
        <>
            <div>
                <NavBar />
            </div>
                <div className="min-h-[60vh] flex flex-col justify-center items-center mx-4 mt-8 lg:mt-4 px-4 md:px-12 text-center" data-aos="zoom-in">
                        <div className="justify-center" data-aos="zoom-in" data-aos-delay="200">
                            <h1 className="mb-5 md:text-5xl text-3xl font-bold text-green-600">
                                <br></br>
                                Thank you for signing up!
                            </h1>
                </div>
                </div>
            <Footer />
        </>
    )
}

export default Signup;