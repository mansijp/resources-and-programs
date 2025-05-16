import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Notiflix from "notiflix";
import { useNavigate } from "react-router-dom";

const Leadership = () => {
  const [message, setMessage] = useState("");
  const [radioAnswers, setRadioAnswers] = useState({});
  const [multiSelect, setMultiSelect] = useState([]);
  const [highlightErrors, setHighlightErrors] = useState({});
  const [userPoints, setUserPoints] = useState();
  const navigate = useNavigate();

  const questions = [
    {
      q: "1. What is a key trait of an effective leader?",
      name: "q1",
      options: ["Micromanagement", "Vision", "Avoidance", "Rigidity"],
    },
    {
      q: "2. What’s the best way to motivate a team?",
      name: "q2",
      options: [
        "Threats",
        "Clear goals and recognition",
        "Ignore them",
        "More paperwork",
      ],
    },
    {
      q: "3. Strategic leaders focus on:",
      name: "q3",
      options: [
        "Day-to-day tasks only",
        "Short-term survival",
        "Long-term vision and alignment",
        "Ignoring stakeholders",
      ],
    },
    {
      q: "4. Which leadership style encourages participation?",
      name: "q4",
      options: ["Autocratic", "Democratic", "Laissez-faire", "Dictatorial"],
    },
    {
      q: "5. What’s important in a crisis situation?",
      name: "q5",
      options: [
        "Panic",
        "Blame",
        "Communication and calm decision-making",
        "Avoiding responsibility",
      ],
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
    const correctAnswers = {
      q1: "Vision",
      q2: "Clear goals and recognition",
      q3: "Long-term vision and alignment",
      q4: "Democratic",
      q5: "Communication and calm decision-making",
    };

    const correctMulti = [
      "Active listening",
      "Delegation",
      "Emotional intelligence",
    ];
    const newErrors = {};

    for (const [key, value] of Object.entries(correctAnswers)) {
      if (!radioAnswers[key]) {
        newErrors[key] = true;
      } else if (radioAnswers[key] !== value) {
        newErrors[key] = true;
      }
    }

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

  const handleUpdatePoints = async (e) => {
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
      if (updatedPoints === 25) level = "Beginner";
      else if (updatedPoints === 50) level = "Intermediate";
      else if (updatedPoints === 75) level = "Advanced";
      else if (updatedPoints === 100) level = "Expert";
      else level = "Rookie";

      await axios.put(
        `http://localhost:5000/api/client-progress/${userPoints._id}/complete-module`,
        {
          moduleName: "leadership",
          currentLevel: level,
        }
      );

      Notiflix.Report.success(
        "Success",
        "Leadership quiz submitted and marked as complete.",
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
      <section className="w-full bg-gray-100 px-6 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-5xl mx-auto" data-aos="zoom-in">
          {userPoints?.learningPath?.completedModules?.includes(
            "leadership"
          ) ? (
            <div className="max-w-4xl mx-auto text-center bg-white p-10 rounded-2xl shadow-xl mt-16">
              <h2 className="text-3xl font-bold text-green-700 mb-4">
                Quiz Already Completed
              </h2>
              <p className="text-lg text-gray-600">
                You have already submitted the Leadership quiz. Great job!
              </p>
            </div>
          ) : (
            <form onSubmit={handleUpdatePoints} className="space-y-10">
              <h1 className="text-4xl font-extrabold text-green-700 uppercase text-center mb-10">
                Leadership Quiz
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
                  6. Strategic Decision-Making Scenario
                </h2>
                <p className="mb-3 text-gray-700">
                  Your company is considering expanding into a new market but
                  faces strong competition. What factors would you analyze
                  before making a decision, and how would you present your
                  recommendation to stakeholders?
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
                  7. Which of the following are commonly used leadership skills?
                  (Select all that apply)
                </p>
                {[
                  "Active listening",
                  "Delegation",
                  "Ignoring feedback",
                  "Emotional intelligence",
                ].map((skill, i) => (
                  <label key={i} className="block text-gray-700 mb-2">
                    <input
                      type="checkbox"
                      value={skill}
                      checked={multiSelect.includes(skill)}
                      onChange={() => handleCheckboxChange(skill)}
                      className="mr-2"
                    />
                    {skill}
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

export default Leadership;
