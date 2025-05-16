import React from 'react';
import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';

const Workshops = () => {
  return (
    <>
      <NavBar />

      <section id="demo" className="w-full bg-gray-100 pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center" data-aos="zoom-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 uppercase mb-10">
            Workshops
          </h1>

          <div className="space-y-6 text-lg font-medium text-gray-700">
            <a
              href="https://www.torontomu.ca/tedrogersschool/family-business-institute/research-awards/workshops/"
              className="block bg-white hover:bg-green-50 border border-green-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-green-700 font-semibold">
                Business Invited Talks and Workshops
              </span>
            </a>

            <a
              href="https://www.torontomuic.ca/programs/business-management/"
              className="block bg-white hover:bg-green-50 border border-green-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-green-700 font-semibold">
                Introduction to Business Workshop
              </span>
            </a>

            <a
              href="https://infoliteracy.senecapolytechnic.ca/OER/BAM101/BAM101final.pdf"
              className="block bg-white hover:bg-green-50 border border-green-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-green-700 font-semibold">
                Ted Rogers School of Management Workshops
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Workshops;
