const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Existing GET route
router.get('/', profileController.getProfile);


// Ensure the PUT route exists
router.put('/', profileController.updateProfile);

module.exports = router;
