import React, { useState } from 'react';
import './styles.css'; // Adjust the path as necessary

const MentorSignUpMultiStep = ({ onSignUp }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    faculty: '',
    phoneNumber: '',
    areaInterested: '',
    experience: '',
    linkedin: '',
  });
  const [files, setFiles] = useState({
    idCard: null,
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
    }

    if (step === 3) {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      for (const key in files) {
        if (files[key]) {
          formDataToSend.append(key, files[key]);
        }
      }

      try {
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          body: formDataToSend,
        });

        const result = await response.json();
        alert(result.message);

        // Reset form data and redirect
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          fullName: '',
          faculty: '',
          phoneNumber: '',
          areaInterested: '',
          experience: '',
          linkedin: '',
        });
        setFiles({
          idCard: null,
          resume: null,
        });
        setStep(1);
        onSignUp(); // Call callback to redirect to login
      } catch (error) {
        console.error(error);
        alert('Error submitting the form');
      }
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="container sign-up-container">
      <h2>Mentor Sign Up</h2>
      <form onSubmit={handleSubmit} className="sign-up-form">
        {step === 1 && (
          <>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <div className="navigation-buttons">
              <button type="submit">Next</button>
            </div>
            <p>
              Already have an account? <a href="/login">Login here</a>
            </p>
          </>
        )}
        {step === 2 && (
          <>
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <label htmlFor="faculty">Faculty:</label>
            <input
              type="text"
              id="faculty"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              required
            />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <label htmlFor="areaInterested">Area Interested:</label>
            <input
              type="text"
              id="areaInterested"
              name="areaInterested"
              value={formData.areaInterested}
              onChange={handleChange}
              required
            />
            <label htmlFor="experience">Experience:</label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
            <label htmlFor="linkedin">LinkedIn Profile:</label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              required
            />
            <div className="navigation-buttons">
              <button type="button" className="back-button" onClick={() => setStep(1)}>Back</button>
              <button type="submit">Next</button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <label htmlFor="idCard">Upload ID Card:</label>
            <input
              type="file"
              id="idCard"
              name="idCard"
              onChange={handleFileChange}
              required
            />
            <label htmlFor="resume">Upload Resume:</label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              required
            />
            <div className="navigation-buttons">
              <button type="button" className="back-button" onClick={() => setStep(2)}>Back</button>
              <button type="submit">Submit</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default MentorSignUpMultiStep;
