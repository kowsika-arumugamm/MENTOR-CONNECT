import React from 'react';
//import { Link } from 'react-router-dom';
import './styles/styles.css'; 

import logo from '../logo.jpg';

const Mentor = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Mentor Connect Logo" className="logo-img" />
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>       
        <li><a href="#features">Features</a></li> 
        <li><a href="/CalendarScheduler">Events</a></li>
        <li><a href="#footer">Contact</a></li>
        <button className='cta-btn'><a href="/Loginselect">Login</a></button> 
      </ul>
     
    </nav>
  );
};


export default Mentor;
