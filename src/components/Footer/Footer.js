import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <>
      <footer className="bg-white border-t border-gray-500 pt-10 pb-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-12 gap-12">
          {/* Left Box */}
          <div className="sm:col-span-4 flex flex-col items-center sm:items-start border-l-8 border-green-600 pl-6">
            <h3 className="text-5xl font-extrabold text-green-600 mb-4 tracking-wide">
              BizPoints
            </h3>
            <div className="text-gray-600 text-lg font-semibold space-y-1">
              <h5>AlphaBiz Solutions</h5>
              <p>TMU - CPS714</p>
              <p>Web Portal</p>
              <p>BizPoints</p>
            </div>
          </div>

          {/* LINKS */}
          <div className="sm:col-span-2">
            <h6 className="text-green-700 font-bold text-xl mb-6 border-b border-green-600 pb-2">
              LINKS
            </h6>
            <ul className="space-y-3 text-gray-700 font-medium">
              <li>
                <HashLink
                  to="#about"
                  className="hover:text-green-900 transition ease-in-out duration-200"
                >
                  Events
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="#services"
                  className="hover:text-green-900 transition ease-in-out duration-200"
                >
                  Learning Activities
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="#portfolio"
                  className="hover:text-green-900 transition ease-in-out duration-200"
                >
                  Training Resources
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="/Admin"
                  className="hover:text-green-900 transition ease-in-out duration-200"
                >
                  Admin Portal
                </HashLink>
              </li>
            </ul>
          </div>

          {/* OUR PROGRAMS */}
          <div className="sm:col-span-3">
            <h6 className="text-green-700 font-bold text-xl mb-6 border-b border-green-600 pb-2">
              OUR PROGRAMS
            </h6>
            <ul className="space-y-3 text-gray-700 font-medium">
              <li>
                <Link
                  to="/Leadership"
                  className="hover:text-green-900 transition ease-in-out duration-200"
                >
                  Leadership Development
                </Link>
              </li>
              <li>
                <Link
                  to="/Business"
                  className="hover:text-green-900 transition ease-in-out duration-200"
                >
                  Small Business Growth
                </Link>
              </li>
              <li>
                <Link
                  to="/Sustainable"
                  className="hover:text-green-900 transition ease-in-out duration-200"
                >
                  Sustainable Business Practices
                </Link>
              </li>
              <li>
                <Link
                  to="/Digital"
                  className="hover:text-green-900 transition ease-in-out duration-200"
                >
                  Digital Transformation
                </Link>
              </li>
            </ul>
          </div>

          {/* TRAINING RESOURCES */}
          <div className="sm:col-span-3">
            <h6 className="text-green-700 font-bold text-xl mb-6 border-b border-green-600 pb-2">
              TRAINING RESOURCES
            </h6>
            <ul className="space-y-3 text-gray-700 font-medium">
              <li>
                <Link
                  to="/Tools"
                  className="hover:text-green-900 transition ease-in-out duration-200"
                >
                  Templates & Toolkits
                </Link>
              </li>
              <li>
                <Link
                  to="/Webinars"
                  className="hover:text-green-900 transition ease-in-out duration-200"
                >
                  Webinars
                </Link>
              </li>
              <li>
                <Link
                  to="/Workshops"
                  className="hover:text-green-900 transition ease-in-out duration-200"
                >
                  Interactive Workshops
                </Link>
              </li>
              <li>
                <Link
                  to="/Articles"
                  className="hover:text-green-900 transition ease-in-out duration-200"
                >
                  eBooks & Guides
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-16 bg-green-600 bg-opacity-30 py-4">
          <p className="text-center text-gray-700 text-sm font-semibold">
            Copyright &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/mansijp/resources-and-programs/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white transition duration-200"
            >
              Mansi Patel. All rights reserved.
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
