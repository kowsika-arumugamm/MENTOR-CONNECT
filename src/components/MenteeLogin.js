import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Assuming successful login if status is 200
      if (response.status === 200) {
        setMessage('Login successful');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setMessage(response.data.message || 'Login failed');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage('Invalid password');
      } else if (error.response?.status === 404) {
        setMessage('User not found');
      } else {
        setMessage('Server error');
      }
    }
  };

  return (
    <div className="login-form">
      <h2>Mentee Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
        <p><a href="/register">New user? Register here</a></p>
      </form>
    </div>
  );
};

export default Login;
