import React from 'react';
import NavBar from './Navbar/NavBar';

const Home = () => {
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
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;