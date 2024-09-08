import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    // Example: if credentials are correct, navigate to the dashboard or home page
    // For now, just redirect to the signup page
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
