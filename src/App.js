import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
// All pages
import Home from './pages/Home';
import Tools from './pages/ClientTraining/Tools';
import Workshops from './pages/ClientTraining/Workshops';
import Webinars from './pages/ClientTraining/Webinars';
import Articles from './pages/ClientTraining/Articles';
import Events from './pages/Events';
import Leadership from './pages/LearningActivities/Leadership';
import Business from './pages/LearningActivities/Business';
import Digital from './pages/LearningActivities/Digital';
import Sustainable from './pages/LearningActivities/Sustainable';
import ProgressMilestone from './pages/LearningActivities/ProgressMilestone';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Login from './pages/Login';

function App() {
  useEffect(() => {
    const aos_init = () => {
      AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic',
      });
    }

    window.addEventListener('load', () => {
      aos_init();
    });
  }, []);


  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Tools" element={<Tools />} /> 
            <Route path="/Webinars" element={<Webinars />} /> 
            <Route path="/Articles" element={<Articles />} /> 
            <Route path="/Workshops" element={<Workshops />} /> 
            <Route path="/Leadership" element={<Leadership />} /> 
            <Route path="/Business" element={<Business />} /> 
            <Route path="/Digital" element={<Digital />} /> 
            <Route path="/Sustainable" element={<Sustainable />} /> 
            <Route path="/ProgressMilestone" element={<ProgressMilestone />} /> 
            <Route path="/Signup" element={<Signup />} /> 
            <Route path="/Admin" element={<Admin />} /> 
            <Route path="/Login" element={<Login />} /> 
          </Routes>
      </Router>
    </>
  );
}


export default App;
