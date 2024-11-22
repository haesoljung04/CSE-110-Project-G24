const express = require('express');
const friendController = require('../controllers/friendController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/send-friend-request', authMiddleware, friendController.sendFriendRequest);
router.get('/friend-requests/:userId', authMiddleware, friendController.getFriendRequests);
router.post('/accept-friend-request', authMiddleware, friendController.acceptFriendRequest);

module.exports = router;