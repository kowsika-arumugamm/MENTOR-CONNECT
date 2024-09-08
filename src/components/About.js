import React from 'react';
import './styles/styles.css'; 

const About = () => {
  return (
    <div className="about-container animate-slide-up" id='about'>
      <h1 className="animate-fade-in">About Mentor Connect</h1>
      <p className="animate-fade-in">
        Mentor Connect is a platform that bridges the gap between mentors and mentees. 
        Our mission is to provide a seamless and interactive experience for individuals looking to share their knowledge 
        and those eager to learn. Whether you are an experienced mentor looking to give back or a mentee seeking guidance, 
        Mentor Connect is here to facilitate meaningful connections. <br /><br />
        Join us today and take the first step towards personal and professional growth with Mentor Connect.
      </p>
      {/* <img src="https://via.placeholder.com/200" alt="Mentor Connect Team" className="animate-zoom-in" /> */}
      
      <button className="cta-btn animate-bounce" onClick={() => window.location.href = '#footer'}>
        Get in Touch
      </button>
    </div>
  );
};

export default About;
