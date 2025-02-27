const express = require('express');

const router = express.Router();

const authController = require('./../../Presentations/Controllers/authController');

router.post('/signup', authController.singUp);
router.post('/login', authController.login);

module.exports = router;