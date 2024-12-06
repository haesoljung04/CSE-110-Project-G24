

exports.getFriends = (req, res, db) => {
    const query = 'SELECT id, name FROM friends WHERE blocked = 0'; // Exclude blocked friends
  
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
  
    const query = 'UPDATE friends SET blocked = 1 WHERE id = ?'; // Update the blocked status
  
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

  const getRecipient = (db, email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, recipient) => {
        console.log('Recipient data:', recipient); // Log the full recipient data
        if (err) {
          return reject(new Error('Error querying the database'));
        }
        if (recipient.length === 0) {
          return reject(new Error('Recipient not found'));
        }
        resolve(recipient[0].id);
      });
    });
  };
  
  
  const getSender = (db, senderEmail) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [senderEmail], (err, sender) => {
        if (err) {
          return reject(new Error('Error querying the database'));
        }
        if (sender.length === 0) {
          return reject(new Error('Sender not found'));
        }
        resolve(sender[0].id);
      });
    });
  };
  
  const checkExistingRequest = (db, sender_id, recipient_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM friend_requests WHERE (requester_id = ? AND recipient_id = ?) OR (requester_id = ? AND recipient_id = ?)',
        [sender_id, recipient_id, recipient_id, sender_id],
        (err, existingRequest) => {
          if (err) {
            return reject(new Error('Error checking existing requests'));
          }
          resolve(existingRequest);
        }
      );
    });
  };
  
  const sendInviteQuery = (db, sender_id, recipient_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO friend_requests (requester_id, recipient_id, status) VALUES (?, ?, ?)',
        [sender_id, recipient_id, 'pending'],
        (err) => {
          if (err) {
            return reject(new Error('Error sending the invite'));
          }
          resolve();
        }
      );
    });
  };
  
  const sendNotification = (db, recipient_id, senderEmail) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO notifications (user_id, message, type) VALUES (?, ?, ?)',
        [recipient_id, `${senderEmail} has sent you a friend request!`, 'friend_invite'],
        (err) => {
          if (err) {
            return reject(new Error('Error sending notification'));
          }
          resolve();
        }
      );
    });
  };
  
  exports.sendInvite = async (req, res, db) => {
    console.log('Request body:', req.body); // Log the request body for debugging
  
    const { email, senderEmail } = req.body; // Get email and senderEmail from the request body
  
    try {
      const recipient_id = await getRecipient(db, email);
      console.log('Recipient ID:', recipient_id);
  
      const sender_id = await getSender(db, senderEmail);
      console.log('Sender ID:', sender_id);
  
      const existingRequest = await checkExistingRequest(db, sender_id, recipient_id);
      console.log('Existing request:', existingRequest);
  
      // Skip if there's an existing pending request
      if (existingRequest.length > 0 && existingRequest[0].status !== 'pending') {
        return res.status(400).json({ message: 'Friend request already exists or has been responded to.' });
      }
  
      await sendInviteQuery(db, sender_id, recipient_id);
      console.log('Friend request sent.');
  
      await sendNotification(db, recipient_id, senderEmail);
      console.log('Notification sent.');
  
      return res.status(200).json({ message: 'Invite sent successfully' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: error.message });
    }
  };
  
  
  
  
  exports.respondInvite = (req, res, db) => {
    const { user_id, request_id, response } = req.body; // Get user_id, request_id, and response from the request body
  
    if (!['accepted', 'declined'].includes(response)) {
      return res.status(400).json({ message: 'Invalid response' });
    }
  
    // Fetch the friend request from the database
    db.query('SELECT * FROM friend_requests WHERE id = ?', [request_id], (err, request) => {
      if (err) {
        return res.status(500).json({ message: 'Error querying the database' });
      }
  
      if (request.length === 0) {
        return res.status(404).json({ message: 'Friend request not found' });
      }
  
      // Check if the current user is the recipient of the request
      if (request[0].recipient_id !== user_id) {
        return res.status(403).json({ message: 'You are not authorized to respond to this request' });
      }
  
      // Update the request status based on the response
      db.query('UPDATE friend_requests SET status = ? WHERE id = ?', [response, request_id], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating friend request' });
        }
  
        // If the request is accepted, add the users to each other's friends list
        if (response === 'accepted') {
          db.query(
            'INSERT INTO friends (user_id_1, user_id_2) VALUES (?, ?), (?, ?)',
            [request[0].requester_id, request[0].recipient_id, request[0].recipient_id, request[0].requester_id],
            (err, friendsResult) => {
              if (err) {
                return res.status(500).json({ message: 'Error adding to friends list' });
              }
  
              return res.status(200).json({ message: 'Friend request accepted successfully' });
            }
          );
        } else {
          return res.status(200).json({ message: 'Friend request declined successfully' });
        }
      });
    });
  };
  