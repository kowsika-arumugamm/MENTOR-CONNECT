import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Contact from './components/Footer';
import Loginselect from './components/Loginselect';
import About from './components/About';
import CalendarScheduler from './components/CalendarScheduler';
import MentorSignUpMultiStep from './components/MentorSignUpMultiStep';

const Home = () => (
  <>
    <Hero />
    <Features />
    <About />
    <Contact />
  </>
);

const App = () => {
  return (
    <Router>
       <Header /> 
      <Routes>
        {/* Home route (renders Hero, Features, About, and Contact) */}
        <Route path="/" element={<Home />} />

        {/* CalendarScheduler route */}
        <Route path="/calendar-scheduler" element={<CalendarScheduler />} />

        {/* Loginselect route */}
        <Route path="/Loginselect" element={<Loginselect />} />

        {/* MentorSignUpMultiStep route */}
        <Route path="/mentor-sign-up" element={<MentorSignUpMultiStep />} />
      </Routes>
    </Router>
  );
};

export default App;
