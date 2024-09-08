const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const pdfParse = require('pdf-parse'); // For extracting text from PDF

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const mongoURI = 'mongodb://localhost:27017/mentor-signup';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const mentorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  fullName: String,
  faculty: String,
  phoneNumber: String,
  areaInterested: String,
  experience: String,
  linkedin: String,
  idCard: String,
  resume: String,
  idCardText: String, // Store extracted text from ID card PDF
  resumeText: String  // Store extracted text from resume PDF
});

const Mentor = mongoose.model('Mentor', mentorSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
});

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

// Function to extract text from a PDF file
const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text; // Return the extracted text
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return null; // Return null if extraction fails
  }
};

app.post('/api/signup', (req, res) => {
  upload.fields([
    { name: 'idCard', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ])(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: 'Multer error occurred during file upload.' });
    } else if (err) {
      return res.status(500).json({ message: 'Unknown error occurred.' });
    }

    try {
      const { name, email, password, confirmPassword, fullName, faculty, phoneNumber, areaInterested, experience, linkedin } = req.body;

      if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All required fields must be filled.' });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
      }

      if (!validatePassword(password)) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
      }

      const existingMentor = await Mentor.findOne({ email });
      if (existingMentor) {
        return res.status(400).json({ message: 'Email already in use. Please log in.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const idCard = req.files?.['idCard']?.[0]?.path || null;
      const resume = req.files?.['resume']?.[0]?.path || null;

      // Extract text from PDF files
      const idCardText = idCard ? await extractTextFromPDF(idCard) : null;
      const resumeText = resume ? await extractTextFromPDF(resume) : null;

      const newMentor = new Mentor({
        name,
        email,
        password: hashedPassword,
        fullName,
        faculty,
        phoneNumber,
        areaInterested,
        experience,
        linkedin,
        idCard,
        resume,
        idCardText,  // Store extracted ID card text
        resumeText   // Store extracted resume text
      });

      await newMentor.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Signup Successful - Mentor Program',
        text: `Dear ${name},\n\nThank you for signing up as a mentor! Your account has been successfully created.\n\nBest regards,\nMentor Program Team`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      res.status(201).json({ message: 'You have signed up successfully!' });
    } catch (error) {
      console.error('Error saving data:', error.message);
      res.status(500).json({ message: 'Error saving data' });
    }
  });
});

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
