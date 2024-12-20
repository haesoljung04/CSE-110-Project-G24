const express = require('express');
const router = express.Router();
const friendAllController = require('../controllers/friendAllController'); 

module.exports = (db) => {
  router.get('/', (req, res) => friendAllController.getFriends(req, res, db));

  router.post('/block-friend', (req, res) => friendAllController.blockFriend(req, res, db));

  router.post('/delete-friend', (req, res) => friendAllController.deleteFriend(req, res, db));

  router.post('/send-invite', (req, res) => friendAllController.sendInvite(req, res, db));

  router.post('/respond-invite', (req, res) => friendAllController.respondInvite(req, res, db));

  return router;
};