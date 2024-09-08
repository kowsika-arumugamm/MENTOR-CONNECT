import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Loginselect.css';
import logo from '../logo.jpg';
import mentorImage from '../mentor-image.png'; // Replace with actual path to your image
import menteeImage from '../mentee-image.png'; // Replace with actual path to your image

const Loginselect = () => {
  const navigate = useNavigate();

  const handleMentorClick = () => {
    navigate('/MentorSignUpMultiStep');
  };

  const handleMenteeClick = () => {
    navigate('/MenteeLogin');
  };

  return (
    <div className="login-select-container">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Select Your Role</h1>
      <div className="card-container">
        <div className="role-card">
          <img src={mentorImage} alt="Mentor" className="card-image" />
          <h2>Mentor</h2>
          <button className="role-button" onClick={handleMentorClick}>
            Log in as Mentor
          </button>
        </div>
        <div className="role-card">
          <img src={menteeImage} alt="Mentee" className="card-image" />
          <h2>Mentee</h2>
          <button className="role-button" onClick={handleMenteeClick}>
            Log In as Mentee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginselect;
