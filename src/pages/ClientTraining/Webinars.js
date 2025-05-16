import React from 'react';
import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';

const Webinars = () => {
  return (
    <>
      <NavBar />

      <section id="demo" className="w-full bg-gray-100 pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center" data-aos="zoom-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 uppercase mb-10">
            Webinars
          </h1>

          <div className="space-y-6 text-lg font-medium text-gray-700">
            <a
              href="https://www.torontomu.ca/xed/webinars/"
              className="block bg-white hover:bg-green-50 border border-green-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-green-700 font-semibold">
                Virtual Wellbeing Webinar Series
              </span>
            </a>

            <a
              href="https://www.toronto.ca/business-economy/new-businesses-startups/business-webinars/"
              className="block bg-white hover:bg-green-50 border border-green-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-green-700 font-semibold">
                Business Webinars & Training
              </span>
            </a>

            <a
              href="https://www.torontomu.ca/research/resources/km/"
              className="block bg-white hover:bg-green-50 border border-green-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-green-700 font-semibold">
                Inclusive Entrepreneurship Webinar Series | Spotlight on Diversity
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Webinars;
