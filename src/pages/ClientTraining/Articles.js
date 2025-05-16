import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';

const Articles = () => {
  return (
    <>
      <NavBar />

      <section id="demo" className="w-full bg-gray-100 pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center" data-aos="zoom-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 uppercase mb-10">
            Articles
          </h1>

          <div className="space-y-6 text-lg font-medium text-gray-700">
            <a
              href="https://learn.library.torontomu.ca/business"
              className="block bg-white hover:bg-green-50 border border-green-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-green-700 font-semibold">
                Business Articles Database
              </span>
            </a>

            <a
              href="https://learn.library.torontomu.ca/c.php?g=344838&p=5334613"
              className="block bg-white hover:bg-green-50 border border-green-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-green-700 font-semibold">
                Business / Information Technology Management (ITM) Articles
              </span>
            </a>

            <a
              href="https://learn.library.torontomu.ca/az/databases"
              className="block bg-white hover:bg-green-50 border border-green-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-green-700 font-semibold">
                Entrepreneurship Database
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Articles;