const { incrementStreak } = require('../models/userModel');

exports.updateStreak = async (req, res) => {
  const { auth0_id } = req.body; // Get auth0_id from request body
  try {
    await incrementStreak(auth0_id);
    res.status(200).json({ message: 'Streak updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};