const express = require('express');
const friendController = require('../controllers/friendController');

const router = express.Router();

// Endpoint to send a friend request
router.post('/send-friend-request', friendController.sendFriendRequest);

// Endpoint to get friend requests for a user
router.get('/friend-requests/:userId', friendController.getFriendRequests);

// Endpoint to accept a friend request
router.post('/accept-friend-request', friendController.acceptFriendRequest);

module.exports = router;