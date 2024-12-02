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

exports.blockFriend = (req, res, db) => {
  const { id } = req.body; 
  if (!id) {
    return res.status(400).json({ error: 'Friend ID is required' });
  }

  const query = 'UPDATE friends SET blocked = 1 WHERE id = ?'; 

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error blocking friend:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Friend not found' });
    }
    res.status(200).json({ message: 'Friend blocked successfully' });
  });
};

exports.deleteFriend = (req, res, db) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Friend ID is required' });
  }

  const query = 'DELETE FROM friends WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting friend:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Friend not found' });
    }
    res.status(200).json({ message: 'Friend deleted successfully' });
  });
};