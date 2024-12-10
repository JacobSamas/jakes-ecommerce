const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.saveUser(name, email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
