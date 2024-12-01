const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path as needed

// Endpoint to check if a user exists in the database
router.get('/users/check', async (req, res) => {
  try {
    const { email } = req.query; // Get the email from the query parameters
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ where: { email } });

    // Respond with whether the user exists
    res.status(200).json({ exists: !!user });
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ message: 'Error checking user', error });
  }
});

module.exports = router;