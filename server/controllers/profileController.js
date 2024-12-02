const { getUserByAuth0Id, createOrUpdateUser } = require('../models/userModel');

exports.getProfile = async (req, res) => {
  const { auth0_id } = req.query; // Fetch auth0_id from query parameters
  try {
    const user = await getUserByAuth0Id(auth0_id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createOrUpdateProfile = async (req, res) => {
  const { auth0_id, name, email, profile_picture } = req.body;
  try {
    await createOrUpdateUser(auth0_id, name, email, profile_picture);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};