const db = require('../db');

exports.getFriends = (req, res) => {
  const query = 'SELECT id, name FROM friends';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching friends:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json(results);
  });
};
