const { getUserByAuth0Id, createOrUpdateUser } = require('../models/userModel');
const db = require('../db'); // Import only the `db` property


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

exports.updateProfile = async (req, res) => {
  const { auth0_id, gym_streak, squat, benchpress, deadlift } = req.body;

  try {
    const sql = `
      UPDATE users
      SET gym_streak = ?, squat = ?, benchpress = ?, deadlift = ?, updated_at = CURRENT_TIMESTAMP
      WHERE auth0_id = ?
    `;
    const params = [gym_streak, squat, benchpress, deadlift, auth0_id];

    db.query(sql, params, (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'Profile updated successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};





