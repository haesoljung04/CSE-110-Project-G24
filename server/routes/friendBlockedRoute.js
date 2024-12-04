const express = require('express');
const router = express.Router();
const friendBlockedController = require('../controllers/friendBlockedController');

module.exports = (db) => {
  router.get('/', (req, res) => friendBlockedController.getBlockedFriends(req, res, db));
  router.post('/unblock', (req, res) => friendBlockedController.unblockFriend(req, res, db));

  return router;
};