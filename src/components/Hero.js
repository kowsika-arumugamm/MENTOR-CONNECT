// Hero.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/Loginselect'); // This navigates to the Loginselect page
  };

  return (
    <section className="hero" id='hero'>
      <div className="hero-content">
        <h1>Unlock Your Potential</h1>
        <p>Connect with experienced mentors and accelerate your growth.</p>
        <button className="cta-btn" onClick={handleGetStarted}>Get Started</button>
      </div>
    </section>
  );
};

export default Hero;
