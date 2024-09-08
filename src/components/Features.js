import React from 'react';
import './styles/styles.css';

const Features = () => {
  return (
    <section className="features animate-slide-up" id="features">
      <h2 className="animate-fade-in">Our Services</h2>
      <div className="feature-cards">
        <div className="card animate-zoom-in">
          <h3>One-on-One Mentorship</h3>
          <p>Get personalized guidance from experienced mentors in your field of interest.</p>
        </div>
        <div className="card animate-zoom-in">
          <h3>Career Development</h3>
          <p>Access resources and advice to help you advance in your career or switch fields.</p>
        </div>
        <div className="card animate-zoom-in">
          <h3>Networking Opportunities</h3>
          <p>Join our community events and connect with like-minded professionals and mentors.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
