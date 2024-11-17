const express = require('express');
const { searchUserByEmail, sendFriendRequest } = require('../controllers/friendController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Search for a user by email
router.post('/search-user', authMiddleware, searchUserByEmail);

// Send a friend request
router.post('/send-friend-request', authMiddleware, sendFriendRequest);

module.exports = router;