const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { sendEmail } = require('../utils/mailer');

// JWT token generation
const generateToken = (user) => {
  const payload = {
    id: user._id,
    isAdmin: user.isAdmin
  };

  const secret = process.env.JWT_SECRET || 'skyreserve_jwt_fallback_secret';

  return jwt.sign(payload, secret, {
    expiresIn: '7d'
  });
};

// Register User (with email verification step)
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user (defaults: isAdmin false, emailVerified false)
    const user = new User({
      name,
      email,
      password,
      emailVerified: false
    });

    // Generate a 6-digit OTP for email verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcrypt.genSalt(10);
    user.emailVerificationCode = await bcrypt.hash(otp, salt);
    user.emailVerificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.save();

    // Send verification email (best-effort; user can still exist if email fails)
    try {
      await sendEmail(
        user.email,
        'SkyReserve - Verify your email',
        `Hi ${user.name || ''},

Welcome to SkyReserve!

Your verification code is: ${otp}

This code will expire in 10 minutes.

If you did not try to sign up, you can ignore this email.

— SkyReserve`
      );
    } catch (mailError) {
      console.error('Error sending verification email:', mailError);
    }

    res.status(201).json({
      message: 'Registration successful. A verification code has been sent to your email. Please verify to complete signup.'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login User (requires verified email)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check email verification
    if (!user.emailVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in.' });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Verify Email with OTP
const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Email and verification code are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or code' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: 'Email is already verified. Please log in.' });
    }

    if (!user.emailVerificationCode || !user.emailVerificationExpires) {
      return res.status(400).json({ message: 'No verification code found. Please register again.' });
    }

    if (user.emailVerificationExpires < new Date()) {
      return res.status(400).json({ message: 'Verification code has expired. Please register again.' });
    }

    const isMatch = await bcrypt.compare(code.toString(), user.emailVerificationCode);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    user.emailVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    const token = generateToken(user);

    res.json({
      message: 'Email verified successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Server error during email verification' });
  }
};

// Get Current User
const getCurrentUser = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  getCurrentUser
};
