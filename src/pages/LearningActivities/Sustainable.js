import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Notiflix from "notiflix";
import { useNavigate } from "react-router-dom";

const Sustainable = () => {
  const [message, setMessage] = useState("");
  const [radioAnswers, setRadioAnswers] = useState({});
  const [multiSelect, setMultiSelect] = useState([]);
  const [highlightErrors, setHighlightErrors] = useState({});
  const [userPoints, setUserPoints] = useState();
  const navigate = useNavigate();

  const questions = [
    {
      q: "1. What does ESG stand for?",
      name: "q1",
      options: [
        "Economic, Social, Governance",
        "Environmental, Social, Governance",
        "Energy, Strategy, Growth",
        "Equity, Safety, Goals",
      ],
      answer: "Environmental, Social, Governance",
    },
    {
      q: "2. Which of these is a greenhouse gas?",
      name: "q2",
      options: ["Oxygen", "Nitrogen", "Methane", "Hydrogen"],
      answer: "Methane",
    },
    {
      q: "3. A circular economy focuses on:",
      name: "q3",
      options: [
        "Linear supply chains",
        "Waste reduction and reuse",
        "Increasing fossil fuel use",
        "Rapid product turnover",
      ],
      answer: "Waste reduction and reuse",
    },
    {
      q: "4. Which business metric best reflects sustainability impact?",
      name: "q4",
      options: [
        "Profit margin",
        "CO2 emissions reduction",
        "Customer acquisition cost",
        "Brand awareness",
      ],
      answer: "CO2 emissions reduction",
    },
    {
      q: "5. Sustainable sourcing ensures:",
      name: "q5",
      options: [
        "Cheaper materials",
        "Ethical and environmental responsibility",
        "Faster shipping",
        "More suppliers",
      ],
      answer: "Ethical and environmental responsibility",
    },
  ];

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/client-progress/"
        );
        const firstUser = res.data?.[0];
        if (firstUser) {
          setUserPoints(firstUser);
        } else {
          throw new Error("No progress found");
        }
      } catch (error) {
        Notiflix.Report.failure(
          "Error",
          `Error fetching progress. ${error.message}`,
          "Okay"
        );
      }
    };
    fetchPoints();
  }, []);

  const handleCheckboxChange = (option) => {
    setMultiSelect((prev) =>
      prev.includes(option)
        ? prev.filter((i) => i !== option)
        : [...prev, option]
    );
  };

  const validateInputs = () => {
    const correctMulti = [
      "Carbon footprint tracking",
      "Water usage monitoring",
      "Renewable energy use",
    ];
    const newErrors = {};

    questions.forEach(({ name, answer }) => {
      if (!radioAnswers[name]) newErrors[name] = true;
      else if (radioAnswers[name] !== answer) newErrors[name] = true;
    });

    if (!message.trim()) newErrors.message = true;

    const multiCorrect =
      multiSelect.length === correctMulti.length &&
      correctMulti.every((val) => multiSelect.includes(val));

    if (!multiCorrect) newErrors.multi = true;

    setHighlightErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      Notiflix.Notify.failure(
        "Please correctly answer all questions before submitting."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const updatedPoints = Math.min(
        (userPoints.totalPointsEarned || 0) + 25,
        100
      );
      await axios.put(
        `http://localhost:5000/api/client-progress/${userPoints._id}`,
        {
          totalPointsEarned: updatedPoints,
        }
      );

      let level;
      if (updatedPoints === 25) {
        level = "Beginner";
      } else if (updatedPoints === 50) {
        level = "Intermediate";
      } else if (updatedPoints === 75) {
        level = "Advanced";
      } else if (updatedPoints === 100) {
        level = "Expert";
      } else {
        level = "Rookie";
      }

      await axios.put(
        `http://localhost:5000/api/client-progress/${userPoints._id}/complete-module`,
        {
          moduleName: "sustainable",
          currentLevel: level,
        }
      );

      Notiflix.Report.success(
        "Success",
        "Quiz submitted and marked as complete.",
        "Okay"
      );
      navigate("/ProgressMilestone");
    } catch (error) {
      console.error(error);
      Notiflix.Report.failure(
        "Error",
        "Something went wrong submitting the quiz.",
        "Okay"
      );
    }
  };

  return (
    <>
      <NavBar />
      <section className="w-full bg-gray-100 pt-40 pb-20 px-6 min-h-[60vh]">
        <div className="max-w-5xl mx-auto" data-aos="zoom-in">
          {userPoints?.learningPath?.completedModules?.includes(
            "sustainable"
          ) ? (
            <div className="max-w-4xl mx-auto text-center bg-white p-10 rounded-2xl shadow-xl mt-16">
              <h2 className="text-3xl font-bold text-green-700 mb-4">
                Quiz Already Completed
              </h2>
              <p className="text-lg text-gray-600">
                You have already submitted the Sustainability quiz. Great job!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <h1 className="text-4xl font-extrabold text-green-700 uppercase text-center mb-10">
                Sustainability Quiz
              </h1>

              {questions.map(({ q, name, options }, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-xl shadow-md ${
                    highlightErrors[name]
                      ? "bg-red-100 border border-red-400"
                      : "bg-white"
                  }`}
                >
                  <p className="text-lg font-semibold mb-4 text-green-700">
                    {q}
                  </p>
                  {options.map((opt, i) => (
                    <label key={i} className="block text-gray-700 mb-2">
                      <input
                        type="radio"
                        name={name}
                        value={opt}
                        checked={radioAnswers[name] === opt}
                        onChange={(e) =>
                          setRadioAnswers((prev) => ({
                            ...prev,
                            [name]: e.target.value,
                          }))
                        }
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ))}

              <div
                className={`p-6 rounded-xl shadow-md ${
                  highlightErrors.message
                    ? "bg-red-100 border border-red-400"
                    : "bg-white"
                }`}
              >
                <h2 className="text-lg font-semibold text-green-700 mb-2">
                  6. Sustainability Scenario
                </h2>
                <p className="mb-3 text-gray-700">
                  What are the key performance indicators (KPIs) for tracking
                  environmental impact in a business?
                </p>
                <textarea
                  name="message"
                  placeholder="Answer here"
                  className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div
                className={`p-6 rounded-xl shadow-md ${
                  highlightErrors.multi
                    ? "bg-red-100 border border-red-400"
                    : "bg-white"
                }`}
              >
                <p className="text-lg font-semibold mb-4 text-green-700">
                  7. Select all sustainability metrics that are commonly
                  tracked:
                </p>
                {[
                  "Carbon footprint tracking",
                  "Water usage monitoring",
                  "Marketing ROI",
                  "Renewable energy use",
                ].map((opt, i) => (
                  <label key={i} className="block text-gray-700 mb-2">
                    <input
                      type="checkbox"
                      value={opt}
                      checked={multiSelect.includes(opt)}
                      onChange={() => handleCheckboxChange(opt)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-green-700 hover:bg-green-800 transition inline-flex items-center justify-center w-auto px-6 py-3 text-lg shadow-xl rounded-xl"
                >
                  Submit Quiz
                  <svg
                    className="w-4 h-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586L10.293 4.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Sustainable;
