const express = require('express');
const { getProfile, createOrUpdateProfile } = require('../controllers/profileController');
const router = express.Router();

router.get('/', getProfile); // Fetch user profile
router.post('/', createOrUpdateProfile); // Create or update user profile

module.exports = router;