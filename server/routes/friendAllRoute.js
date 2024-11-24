const express = require('express');
const router = express.Router();
const friendAllController = require('../controllers/friendAllController'); // Adjust path if needed

module.exports = (db) => {
  // Route to fetch all friends
  router.get('/', (req, res) => friendAllController.getFriends(req, res, db));
  
  return router;
};