const express = require('express');
const router = express.Router();
const friendBlockedController = require('../controllers/friendBlockedController');

module.exports = (db) => {
  // Route to fetch all the blocked friends
  router.get('/', (req, res) => friendBlockedController.getBlockedFriends(req, res, db));

  // Route for unblocking a friend
  router.post('/unblock', (req, res) => friendBlockedController.unblockFriend(req, res, db));

  return router;
};