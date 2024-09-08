import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import Select from 'react-select'; 
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

const collegeOptions = [
  { value: 'A. V. C. College of Engineering', label: 'A. V. C. College of Engineering' },
  { value: 'A.R.J College of Engineering and Technology', label: 'A.R.J College of Engineering and Technology' },
  { value: 'Adhiparasakthi Engineering College', label: 'Adhiparasakthi Engineering College' },
  { value: 'Adhiyamaan College of Engineering', label: 'Adhiyamaan College of Engineering' },
  { value: 'Alagappa Chettiar College of Engineering and Technology', label: 'Alagappa Chettiar College of Engineering and Technology' },
  { value: 'Amrita Centre for Computational Engineering and Networking', label: 'Amrita Centre for Computational Engineering and Networking' },
  { value: 'Amrita Schools of Engineering', label: 'Amrita Schools of Engineering' },
  { value: 'Amrita Vishwa Vidyapeetham', label: 'Amrita Vishwa Vidyapeetham' },
  { value: 'Anjalai Ammal Mahalingam Engineering College', label: 'Anjalai Ammal Mahalingam Engineering College' },
  { value: 'Anna University Chennai - Regional Office, Tirunelveli', label: 'Anna University Chennai - Regional Office, Tirunelveli' },
  { value: 'Anna University Chennai - Regional Office, Madurai', label: 'Anna University Chennai - Regional Office, Madurai' },
  { value: 'Anna University Chennai – Regional Office, Tiruchirappalli', label: 'Anna University Chennai – Regional Office, Tiruchirappalli' },
  { value: 'Annai Teresa College of Engineering', label: 'Annai Teresa College of Engineering' },
  { value: 'Annai Vailankanni College of Engineering', label: 'Annai Vailankanni College of Engineering' },
  { value: 'Arasu Engineering College', label: 'Arasu Engineering College' },
  { value: 'Arulmigu Meenakshi Amman College of Engineering', label: 'Arulmigu Meenakshi Amman College of Engineering' },
  { value: 'Arunai Engineering College', label: 'Arunai Engineering College' },
  { value: 'As-Salam College of Engineering & Technology', label: 'As-Salam College of Engineering & Technology' },
  { value: 'Bannari Amman Institute of Technology', label: 'Bannari Amman Institute of Technology' },
  { value: 'Bharath Niketan College of Engineering', label: 'Bharath Niketan College of Engineering' },
  { value: 'Bharathidasan Engineering College', label: 'Bharathidasan Engineering College' },
  { value: 'Bharathidasan Institute of Technology', label: 'Bharathidasan Institute of Technology' },
  { value: 'Central Institute of Petrochemicals Engineering and Technology', label: 'Central Institute of Petrochemicals Engineering and Technology' },
  { value: 'Thiruvalluvar College of Engineering and Technology', label: 'Thiruvalluvar College of Engineering and Technology' },
  { value: 'CK College of Engineering and Technology', label: 'CK College of Engineering and Technology' },
  { value: 'Coimbatore Institute of Technology', label: 'Coimbatore Institute of Technology' },
  { value: 'CSI College of Engineering', label: 'CSI College of Engineering' },
  { value: 'CSI Institute of Technology', label: 'CSI Institute of Technology' },
  { value: 'Dr. Sivanthi Aditanar College of Engineering', label: 'Dr. Sivanthi Aditanar College of Engineering' },
  { value: 'Erode Sengunthar Engineering College', label: 'Erode Sengunthar Engineering College' },
  { value: 'Fathima Michael College of Engineering and Technology', label: 'Fathima Michael College of Engineering and Technology' },
  { value: 'Francis Xavier Engineering College', label: 'Francis Xavier Engineering College' },
  { value: 'Government College of Engineering, Bargur', label: 'Government College of Engineering, Bargur' },
  { value: 'Government College of Engineering, Bodinayakkanur', label: 'Government College of Engineering, Bodinayakkanur' },
  { value: 'Government College of Engineering, Dharmapuri', label: 'Government College of Engineering, Dharmapuri' },
  { value: 'Government College of Engineering, Erode', label: 'Government College of Engineering, Erode' },
  { value: 'Government College of Engineering, Salem', label: 'Government College of Engineering, Salem' },
  { value: 'Government College of Engineering, Srirangam', label: 'Government College of Engineering, Srirangam' },
  { value: 'Government College of Engineering, Thanjavur', label: 'Government College of Engineering, Thanjavur' },
  { value: 'Government College of Engineering, Tirunelveli', label: 'Government College of Engineering, Tirunelveli' },
  { value: 'Government Polytechnic College, Nagercoil', label: 'Government Polytechnic College, Nagercoil' },
  { value: 'Greentech College of Engineering for Women', label: 'Greentech College of Engineering for Women' },
  { value: 'GRT Institute of Engineering and Technology', label: 'GRT Institute of Engineering and Technology' },
  { value: 'Idhaya Engineering College for Women', label: 'Idhaya Engineering College for Women' },
  { value: 'IFET College of Engineering', label: 'IFET College of Engineering' },
  { value: 'Indian Institute of Information Technology, Tiruchirappalli', label: 'Indian Institute of Information Technology, Tiruchirappalli' },
  { value: 'Indira Institute of Engineering and Technology', label: 'Indira Institute of Engineering and Technology' },
  { value: 'Indra Ganesan College of Engineering', label: 'Indra Ganesan College of Engineering' },
  { value: 'Info Institute of Engineering', label: 'Info Institute of Engineering' },
  { value: 'J. K. K. Munirajah College of Technology', label: 'J. K. K. Munirajah College of Technology' },
  { value: 'J.N.N Institute of Engineering', label: 'J.N.N Institute of Engineering' },
  { value: 'J.P. College of Engineering, Ayikudy, Tenkasi', label: 'J.P. College of Engineering, Ayikudy, Tenkasi' },
  { value: 'Jaya Engineering College', label: 'Jaya Engineering College' },
  { value: 'Jayamatha Engineering College', label: 'Jayamatha Engineering College' },
  { value: 'K. S. Rangasamy College of Technology', label: 'K. S. Rangasamy College of Technology' },
  { value: 'K. L. N. College of Engineering', label: 'K. L. N. College of Engineering' },
  { value: 'Kalsar College of Engineering', label: 'Kalsar College of Engineering' },
  { value: 'Kamaraj College of Engineering and Technology', label: 'Kamaraj College of Engineering and Technology' },
  { value: 'KLN College of Information Technology', label: 'KLN College of Information Technology' },
  { value: 'Kongu Engineering College', label: 'Kongu Engineering College' },
  { value: 'KPR Institute of Engineering and Technology', label: 'KPR Institute of Engineering and Technology' },
  { value: 'Kumaran Institute of Technology', label: 'Kumaran Institute of Technology' },
  { value: 'Kurinji College of Engineering and Technology', label: 'Kurinji College of Engineering and Technology' },
  { value: 'Latha Mathavan Engineering College', label: 'Latha Mathavan Engineering College' },
  { value: 'Lourdes Mount College of Engineering & Technology', label: 'Lourdes Mount College of Engineering & Technology' },
  { value: 'Loyola Institute of Technology and Science, Thovalai', label: 'Loyola Institute of Technology and Science, Thovalai' },
  { value: 'M.P.Nachimuthu M.Jaganathan Engineering College', label: 'M.P.Nachimuthu M.Jaganathan Engineering College' },
  { value: 'Mahalakshmi Engineering College', label: 'Mahalakshmi Engineering College' },
  { value: 'Maharaja Institute of Technology', label: 'Maharaja Institute of Technology' },
  { value: 'Mahendra Engineering College', label: 'Mahendra Engineering College' },
  { value: 'Mailam Engineering College', label: 'Mailam Engineering College' },
  { value: 'Marthandam College of Engineering and Technology', label: 'Marthandam College of Engineering and Technology' },
  { value: 'Mepco Schlenk Engineering College', label: 'Mepco Schlenk Engineering College' },
  { value: 'M. Kumarasamy College of Engineering', label: 'M. Kumarasamy College of Engineering' },
  { value: 'Mohamed Sathak Engineering College', label: 'Mohamed Sathak Engineering College' },
  { value: 'N.M.S.Kamaraj Polytechnic', label: 'N.M.S.Kamaraj Polytechnic' },
  { value: 'Nandha Engineering College', label: 'Nandha Engineering College' },
  { value: 'Nehru Institute of Engineering and Technology', label: 'Nehru Institute of Engineering and Technology' },
  { value: 'Nehru College of Engineering and Research Centre', label: 'Nehru College of Engineering and Research Centre' },
  { value: 'Nirmala College of Engineering', label: 'Nirmala College of Engineering' },
  { value: 'Noble College of Engineering', label: 'Noble College of Engineering' },
  { value: 'P. A. College of Engineering', label: 'P. A. College of Engineering' },
  { value: 'P. S. G. College of Technology', label: 'P. S. G. College of Technology' },
  { value: 'Pallavan College of Engineering', label: 'Pallavan College of Engineering' },
  { value: 'Pallavi Engineering College', label: 'Pallavi Engineering College' },
  { value: 'Park College of Engineering and Technology', label: 'Park College of Engineering and Technology' },
  { value: 'Pinnacle Institute of Technology', label: 'Pinnacle Institute of Technology' },
  { value: 'PSG Institute of Technology and Applied Research', label: 'PSG Institute of Technology and Applied Research' },
  { value: 'Rajagiri School of Engineering and Technology', label: 'Rajagiri School of Engineering and Technology' },
  { value: 'Rajapalayam Rajus College', label: 'Rajapalayam Rajus College' },
  { value: 'Rajalakshmi Engineering College', label: 'Rajalakshmi Engineering College' },
  { value: 'Ramaiah Institute of Technology', label: 'Ramaiah Institute of Technology' },
  { value: 'Rathinam College of Arts and Science', label: 'Rathinam College of Arts and Science' },
  { value: 'RVS College of Engineering and Technology', label: 'RVS College of Engineering and Technology' },
  { value: 'S. V. S. College of Engineering', label: 'S. V. S. College of Engineering' },
  { value: 'Sardar Raja College of Engineering', label: 'Sardar Raja College of Engineering' },
  { value: 'Sengunthar Engineering College', label: 'Sengunthar Engineering College' },
  { value: 'Shanmugha Arts Science Technology and Research Academy', label: 'Shanmugha Arts Science Technology and Research Academy' },
  { value: 'Shree Venkateshwara Hi-Tech Engineering College', label: 'Shree Venkateshwara Hi-Tech Engineering College' },
  { value: 'Sona College of Technology', label: 'Sona College of Technology' },
  { value: 'SRI Krishna College of Engineering and Technology', label: 'SRI Krishna College of Engineering and Technology' },
  { value: 'Sri Ramakrishna Engineering College', label: 'Sri Ramakrishna Engineering College' },
  { value: 'Sri Ranganathar Institute of Engineering and Technology', label: 'Sri Ranganathar Institute of Engineering and Technology' },
  { value: 'Sri Sairam Engineering College', label: 'Sri Sairam Engineering College' },
  { value: 'Sri Venkateswara College of Engineering', label: 'Sri Venkateswara College of Engineering' },
  { value: 'Srinivasa Institute of Technology', label: 'Srinivasa Institute of Technology' },
  { value: 'Srm Institute of Science and Technology', label: 'Srm Institute of Science and Technology' },
  { value: 'Sri Meenakshi Government College', label: 'Sri Meenakshi Government College' },
  { value: 'St. Peter\'s College of Engineering and Technology', label: 'St. Peter\'s College of Engineering and Technology' },
  { value: 'Sree Sastha Institute of Engineering and Technology', label: 'Sree Sastha Institute of Engineering and Technology' },
  { value: 'Sree Sowdambika College of Engineering', label: 'Sree Sowdambika College of Engineering' },
  { value: 'SSN College of Engineering', label: 'SSN College of Engineering' },
  { value: 'SVCET College of Engineering', label: 'SVCET College of Engineering' },
  { value: 'Thiagarajar College of Engineering', label: 'Thiagarajar College of Engineering' },
  { value: 'Tirunelveli Engineering College', label: 'Tirunelveli Engineering College' },
  { value: 'United Institute of Technology', label: 'United Institute of Technology' },
  { value: 'V. S. B. Engineering College', label: 'V. S. B. Engineering College' },
  { value: 'Valliammai Engineering College', label: 'Valliammai Engineering College' },
  { value: 'Vellore Institute of Technology', label: 'Vellore Institute of Technology' },
  { value: 'Veltech Multi Tech Dr. Rangarajan Dr. Sakunthala Engineering College', label: 'Veltech Multi Tech Dr. Rangarajan Dr. Sakunthala Engineering College' },
  { value: 'Vidya Mandhir Institute of Technology', label: 'Vidya Mandhir Institute of Technology' }
];
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: '',
    collegeName: '',
    cgpa: '',
    companyName: '',
    position: '',
    linkedin: '',
    github: '',
    areaOfInterest: '',
    level: 'beginner',
    idProof: null,
  });
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      collegeName: selectedOption ? selectedOption.value : '',
    });
  };

  const selectUserType = (type) => {
    setFormData({ ...formData, userType: type });
    nextStep();
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Registration successful');
      navigate('/dashboard');
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.error || 'Server error'));
    }
  };

  return (
    <div className="registration-form">
      <h1>Mentee Registration</h1>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
            <button type="button" onClick={nextStep}>Next</button>
          </>
        )}

        {step === 2 && (
          <div className="user-type-selection">
            <div
              className={`user-type-option ${formData.userType === 'student' ? 'active' : ''}`}
              onClick={() => selectUserType('student')}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk93h1FyRIfWA5mpxnRn_Uf6LzxzfUSHQYiQ&s"
                alt="Student Icon"
              />
              <label>Student</label>
            </div>
            <div
              className={`user-type-option ${formData.userType === 'working' ? 'active' : ''}`}
              onClick={() => selectUserType('working')}
            >
              <img
                src="https://www.shutterstock.com/image-vector/construction-worker-black-vector-icon-260nw-2438232091.jpg"
                alt="Working Professional Icon"
              />
              <label>Working Professional</label>
            </div>
          </div>
        )}

        {step === 3 && formData.userType === 'student' && (
          <>
            <Select
              name="collegeName"
              options={collegeOptions}
              onChange={handleSelectChange}
              placeholder="Select Tamil Nadu College"
              isClearable
            />
            <input type="text" name="cgpa" placeholder="CGPA" onChange={handleChange} required />
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </>
        )}

        {step === 3 && formData.userType === 'working' && (
          <>
            <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} required />
            <input type="text" name="position" placeholder="Position" onChange={handleChange} required />
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </>
        )}

        {step === 4 && (
          <>
            <input type="url" name="linkedin" placeholder="LinkedIn Profile" onChange={handleChange} required />
            <input type="url" name="github" placeholder="GitHub Profile" onChange={handleChange} required />
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </>
        )}

        {step === 5 && (
          <>
            <input type="text" name="areaOfInterest" placeholder="Area of Interest" onChange={handleChange} required />
            <select name="level" onChange={handleChange} value={formData.level}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <input type="file" name="idProof" onChange={handleChange} required />
            <button type="button" onClick={prevStep}>Back</button>
            <button type="submit">Submit</button>
          </>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
