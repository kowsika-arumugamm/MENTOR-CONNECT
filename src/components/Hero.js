import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/styles.css'; // Assuming you have the CSS in this file

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/Loginselect'); // Navigate to the Loginselect page
  };

  return (
    <section className="hero" id='hero'>
      <div className="hero-content">
        <h1 className="animate-fade-in">Unlock Your Potential</h1>
        <p className="animate-slide-up">Connect with experienced mentors and accelerate your growth.</p>
        <button className="cta-btn animate-bounce" onClick={handleGetStarted}>Get Started</button>
      </div>
    </section>
  );
};

export default Hero;
