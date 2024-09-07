import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Loginselect.css';
//import Header from './Header';

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
    {/* <Header /> */}
    <br/><br/><br/><br/>
      <img src="./logo.jpg" alt=""/>
      <h1>Select Your Role</h1>
      <div className="button-container">
        <button className="role-button mentor-button" onClick={handleMentorClick}>
          Mentor
        </button>
        <button className="role-button mentee-button" onClick={handleMenteeClick}>
          Mentee
        </button>
      </div>
    </div>
  );
};

export default Loginselect;
