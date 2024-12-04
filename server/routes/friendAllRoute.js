const express = require('express');
const router = express.Router();
const friendAllController = require('../controllers/friendAllController'); 

module.exports = (db) => {
  router.get('/', (req, res) => friendAllController.getFriends(req, res, db));

  router.post('/block-friend', (req, res) => friendAllController.blockFriend(req, res, db));

  router.post('/delete-friend', (req, res) => friendAllController.deleteFriend(req, res, db));


  return router;
};