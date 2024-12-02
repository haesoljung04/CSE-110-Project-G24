const pool = require('../db/db'); // Import database connection

exports.getUserByAuth0Id = async (auth0_id) => {
  const result = await pool.query('SELECT * FROM users WHERE auth0_id = $1', [auth0_id]);
  return result.rows[0];
};

exports.createOrUpdateUser = async (auth0_id, name, email, profile_picture) => {
  await pool.query(
    `INSERT INTO users (auth0_id, name, email, profile_picture) 
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (auth0_id) 
     DO UPDATE SET name = $2, email = $3, profile_picture = $4`,
    [auth0_id, name, email, profile_picture]
  );
};

exports.incrementStreak = async (auth0_id) => {
  await pool.query('UPDATE users SET gym_streak = gym_streak + 1 WHERE auth0_id = $1', [auth0_id]);
};