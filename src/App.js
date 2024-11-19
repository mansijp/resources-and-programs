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
import Tools from './pages/Tools';
import Workshops from './pages/Workshops';
import Webinars from './pages/Webinars';
import Articles from './pages/Articles';
import Events from './pages/Events';
import Leadership from './pages/Leadership';
import Business from './pages/Business';
import Digital from './pages/Digital';
import Sustainable from './pages/Sustainable';
import Leadpoints from './pages/Leadpoints';
import Buspoints from './pages/Buspoints';
import Suspoints from './pages/Suspoints';
import Digpoints from './pages/Digpoints';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Added from './pages/Added';
import {useDocTitle} from './components/CustomHook';
import ScrollToTop from './components/ScrollToTop';

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

  useDocTitle("BizPoints");

  return (
    <>
      <Router>
        <ScrollToTop>
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
            <Route path="/Leadpoints" element={<Leadpoints />} /> 
            <Route path="/Buspoints" element={<Buspoints />} /> 
            <Route path="/Suspoints" element={<Suspoints />} /> 
            <Route path="/Digpoints" element={<Digpoints />} /> 
            <Route path="/Signup" element={<Signup />} /> 
            <Route path="/Admin" element={<Admin />} /> 
            <Route path="/Added" element={<Added />} /> 
          </Routes>
        </ScrollToTop>
      </Router>
    </>
  );
}


export default App;
