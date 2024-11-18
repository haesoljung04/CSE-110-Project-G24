const express = require('express');
const friendAllController = require('../controllers/friendAllController');

const router = express.Router();

router.get('/', friendAllController.getFriends);

module.exports = router;