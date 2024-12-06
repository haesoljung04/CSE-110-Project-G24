const db = require('../db'); // Import only the `db` property

// Fetch user details by their Auth0 ID
exports.getUserByAuth0Id = async (auth0_id) => {
  try {
    const sql = 'SELECT * FROM users WHERE auth0_id = ?';
    const [rows] = await db.promise().query(sql, [auth0_id]);
    return rows[0]; // Return the first row (user details)
  } catch (error) {
    console.error('Error fetching user by Auth0 ID:', error);
    throw new Error('Database query failed');
  }
};

// Create or update a user in the database
exports.createOrUpdateUser = async (auth0_id, name, email, profile_picture) => {
  try {
    const sql = `
      INSERT INTO users (auth0_id, name, email, profile_picture) 
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        name = VALUES(name), 
        email = VALUES(email), 
        profile_picture = VALUES(profile_picture)
    `;
    await db.promise().query(sql, [auth0_id, name, email, profile_picture]);
  } catch (error) {
    console.error('Error creating or updating user:', error);
    throw new Error('Database operation failed');
  }
};

// Increment the user's gym streak
exports.incrementStreak = async (auth0_id) => {
  try {
    const sql = `
      UPDATE users 
      SET gym_streak = COALESCE(gym_streak, 0) + 1 
      WHERE auth0_id = ? 
      RETURNING gym_streak
    `;
    const [rows] = await db.promise().query(sql, [auth0_id]);
    return rows[0]?.gym_streak;
  } catch (error) {
    console.error('Error incrementing gym streak:', error);
    throw new Error('Database operation failed');
  }
};
