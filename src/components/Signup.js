import img from '../images/event_registration.png';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div className="min-h-[30vh] flex flex-col-reverse lg:flex-row items-center justify-center bg-gray-100 px-6 py-16 gap-10" id="about">
            
            {/* Image Section - now on the left */}
            <div className="flex justify-center w-full lg:w-1/2" data-aos="fade-up">
                <img
                    src={img}
                    alt="Event registration illustration"
                    className="w-full max-w-md"
                />
            </div>

            {/* Text and Button Section - now on the right */}
            <div className="w-full lg:w-1/2 space-y-6" data-aos="zoom-in" data-aos-delay="400">
                <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 text-center lg:text-left">
                    Don’t Miss Out!
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed text-center lg:text-left">
                    Stay informed about upcoming workshops, training, and interactive events. Join us and be the first to know what's happening in our community!
                </p>
                <div className="flex justify-center lg:justify-start">
                    <Link
                        to="/Events"
                        className="inline-flex items-center text-white bg-green-600 hover:bg-green-700 transition px-6 py-3 text-lg font-semibold rounded-xl shadow-md"
                    >
                        Sign Up for Events
                        <svg
                            className="w-5 h-5 ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
