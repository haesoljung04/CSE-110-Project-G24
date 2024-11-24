exports.getFriends = (req, res, db) => {
  const query = 'SELECT id, name FROM friends'; 

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching friends:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json(results);
  });
};
