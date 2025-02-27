const express = require('express');

const viewRoutes = require('./../../Presentations/Routes/viewRoutes');
const authRoutes = require('./../../Presentations/Routes/authRoutes');
const authController = require('./../../Presentations/Controllers/authController');
const portfolioRoutes = require('./../../Presentations/Routes/projectRoutes');
const router = express.Router();

router.use('/', viewRoutes);
router.use('/api/v1', authRoutes);
router.use('/api/v1', authController.protectAPI, portfolioRoutes);

module.exports = router;