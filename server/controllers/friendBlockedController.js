// exports.getBlockedFriends = (req, res, db) => {
//     const query = 'SELECT id, name FROM friends WHERE blocked = 1';
  
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error('Error fetching blocked friends:', err);
//         return res.status(500).json({ error: 'Database query error' });
//       }
//       res.status(200).json(results);
//     });
//   };
  
//   exports.unblockFriend = (req, res, db) => {
//     const { id } = req.body;
//     if (!id) {
//       return res.status(400).json({ error: 'Friend ID is required' });
//     }
  
//     const query = 'UPDATE friends SET blocked = 0 WHERE id = ?';
  
//     db.query(query, [id], (err, results) => {
//       if (err) {
//         console.error('Error unblocking friend:', err);
//         return res.status(500).json({ error: 'Database query error' });
//       }
//       if (results.affectedRows === 0) {
//         return res.status(404).json({ error: 'Friend not found' });
//       }
//       res.status(200).json({ message: 'Successfully unblocked friend' });
//     });
//   };

exports.getBlockedFriends = (req, res, db) => {
  const query = 'SELECT id, name FROM friends WHERE blocked = 1'; // Fetch only blocked friends

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching blocked friends:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json(results);
  });
};

exports.unblockFriend = (req, res, db) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Friend ID is required' });
  }

  const query = 'UPDATE friends SET blocked = 0 WHERE id = ?'; // Update the blocked status

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error unblocking friend:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Blocked friend not found' });
    }
    res.status(200).json({ message: 'Friend unblocked successfully' });
  });
};