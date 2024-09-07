import React from 'react';
import './styles/styles.css'; 

const About = () => {
  return (
    <div className="about-container" id='about'>
      <h1>About Mentor Connect</h1>
      <p>
        Mentor Connect is a platform that bridges the gap between mentors and mentees. Our mission is to provide a
        seamless and interactive experience for individuals looking to share their knowledge and those eager to learn. 
        Whether you are an experienced mentor looking to give back or a mentee seeking guidance, Mentor Connect is here 
        to facilitate meaningful connections.
      </p>

      <img src="https://via.placeholder.com/200" alt="Mentor Connect Team" />
      
      <button className="cta-btn" onClick={() => window.location.href = '#Contact'}>
        Get in Touch
      </button>
    </div>
  );
};

export default About;
