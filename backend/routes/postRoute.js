const express = require('express');
const router = express.Router();
const otpdata = require('../model/otps');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure you have .env for environment variables

router.use(express.json());

// POST route for generating and saving OTP
router.post('/generate-otp', async (req, res) => {
    // console.log(req.body)
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate a random OTP (6-digit number)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create a new OTP record
    const newOtpEntry = new otpdata({
      email,
      otp,
      createdAt: new Date() // Save the current date and time
    });

    // Save the OTP to the database
    await newOtpEntry.save();

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    });

    // Respond with success message
    res.status(201).json({ message: 'OTP generated, saved, and sent successfully' });

  } catch (error) {
    console.error('Error generating, saving, or sending OTP:', error);
    res.status(500).json({ error: 'Error generating, saving, or sending OTP' });
  }
});

router.post('/verify-otp', async (req, res) => {
    try {
      const { otp } = req.body;
  
      if (!otp) {
        return res.status(400).json({ error: 'OTP is required' });
      }
  
      // Find the OTP record in the database
      const otpRecord = await otpdata.findOne({ otp });
  
      if (otpRecord) {
        // OTP is valid, delete the OTP record to prevent reuse
        // await otpdata.deleteOne({ otp });
        return res.status(200).json({ message: 'OTP verified successfully' });
      } else {
        // OTP is invalid
        return res.status(400).json({ error: 'Invalid OTP' });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return res.status(500).json({ error: 'Error verifying OTP' });
    }
  });

module.exports = router;
