const express = require('express');
const { updateStreak } = require('../controllers/checkinController');
const router = express.Router();
router.post('/', updateStreak); // Increment streak
module.exports = router;