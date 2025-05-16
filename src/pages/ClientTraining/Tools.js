import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";

const Tools = () => {
  return (
    <>
      <NavBar />

      <section id="demo" className="w-full bg-gray-100 pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center" data-aos="zoom-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 uppercase mb-10">
            Business Development Tools
          </h1>

          <div className="space-y-6 text-lg font-medium text-gray-700">
            <a
              href="https://learn.utoronto.ca/programs-courses/courses/2565-tools-techniques-business-process-management"
              className="block bg-white hover:bg-green-50 border border-green-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-green-700 font-semibold">
                Tools & Techniques of Business Process Management
              </span>
            </a>

            <a
              href="https://www.torontomu.ca/content/dam/tedrogersschool/business-career-hub/hub-insights/strive-to-thrive-reports/2023-2024/Career_Research.pdf"
              className="block bg-white hover:bg-green-50 border border-green-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-green-700 font-semibold">
                Tips on Doing Your Own Career Research
              </span>
            </a>

            <a
              href="https://www.torontomu.ca/content/dam/fcs/pdfs/research/fcs-src-handbook.pdf"
              className="block bg-white hover:bg-green-50 border border-green-200 rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-green-700 font-semibold">
                FCS Scholarly, Research and Creative Activity Handbook
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Tools;
