import React, { useState } from "react";
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Notiflix from "notiflix";

const Events = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const clearErrors = () => {
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!firstName.trim()) newErrors.first_name = "First name is required.";
    if (!lastName.trim()) newErrors.last_name = "Last name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!phone.trim()) newErrors.phone_number = "Phone number is required.";
    if (!message.trim()) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Notiflix.Notify.failure("Please fill in all required fields.");
      return;
    }

    // Redirect if validation passes
    navigate("/Signup");
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex justify-center items-center bg-gray-100 pb-16 pt-32 px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10" data-aos="zoom-in">
          <h1 className="text-4xl font-bold text-center text-green-700 uppercase mb-10">
            Event Sign Up
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  name="first_name"
                  className="w-full bg-gray-100 text-gray-800 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="text"
                  placeholder="First Name*"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onKeyUp={clearErrors}
                />
                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
              </div>

              <div>
                <input
                  name="last_name"
                  className="w-full bg-gray-100 text-gray-800 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="text"
                  placeholder="Last Name*"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onKeyUp={clearErrors}
                />
                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
              </div>

              <div>
                <input
                  name="email"
                  className="w-full bg-gray-100 text-gray-800 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="email"
                  placeholder="Email*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={clearErrors}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  name="phone_number"
                  className="w-full bg-gray-100 text-gray-800 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="tel"
                  placeholder="Phone*"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyUp={clearErrors}
                />
                {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
              </div>
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Message*"
                className="w-full h-32 bg-gray-100 text-gray-800 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={clearErrors}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white bg-green-600 hover:bg-green-700 transition-all inline-flex items-center justify-center px-6 py-3 text-lg rounded-xl shadow-md"
              >
                Sign Up
                <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586L10.293 4.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Events;
