const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup the email sender
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // 16-digit App Password
  }
});

app.post('/api/propose', (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.FRIEND_EMAIL,
    subject: '💝 SHE SAID YES!',
    text: 'Congratulations! Your girlfriend clicked the YES button on the website!'
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Email sent successfully!' });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));