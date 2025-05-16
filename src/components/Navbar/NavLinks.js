import { HashLink } from 'react-router-hash-link'; 
import { Link, useLocation } from 'react-router-dom';

const NavLinks = () => {
    const location = useLocation();

    return (
        <>
            <HashLink smooth to="/#about" className="px-4 py-2 font-extrabold text-green-600 hover:text-green-700 transition-colors duration-200">
                EVENTS
            </HashLink>
            <HashLink smooth to="/#services" className="px-4 py-2 font-extrabold text-green-600 hover:text-green-700 transition-colors duration-200">
                LEARNING ACTIVITIES
            </HashLink>
            <HashLink smooth to="/#portfolio" className="px-4 py-2 font-extrabold text-green-600 hover:text-green-700 transition-colors duration-200">
                CLIENT TRAINING
            </HashLink>
            <Link to="/Admin" className="ml-4 px-6 py-2 font-bold bg-green-600 text-white rounded-xl shadow-md transition-transform duration-200 transform hover:scale-105">
                ADMIN
            </Link>

            {location.pathname !== '/Login' && (
                <Link to="/Login" className="ml-4 px-6 py-2 font-bold border-2 border-green-600 text-green-600 rounded-xl bg-transparent shadow-md transition-all duration-200 transform hover:bg-green-600 hover:text-white hover:scale-105">
                    LOGIN
                </Link>
            )}
        </>
    );
};

export default NavLinks;
