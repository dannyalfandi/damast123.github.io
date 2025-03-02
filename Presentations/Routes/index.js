const express = require('express');

const viewRoutes = require('./../../Presentations/Routes/viewRoutes');
const authRoutes = require('./../../Presentations/Routes/authRoutes');
const portfolioRoutes = require('./../../Presentations/Routes/projectRoutes');
const router = express.Router();

router.use('/', viewRoutes);
router.use('/api/v1', authRoutes);
router.use('/api/v1', portfolioRoutes);

module.exports = router;