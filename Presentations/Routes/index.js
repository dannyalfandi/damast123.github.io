const express = require('express');

const authRoutes = require('./../../Presentations/Routes/authRoutes');
const portfolioRoutes = require('./../../Presentations/Routes/projectRoutes');
const router = express.Router();

router.use('/api/v1', authRoutes);
router.use('/api/v1', portfolioRoutes);

module.exports = router;