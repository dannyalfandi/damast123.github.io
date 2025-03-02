const express = require('express');

const router = express.Router();

const authController = require('./../../Presentations/Controllers/authController');
const portfolioController = require('./../../Presentations/Controllers/portfolioController');

router.get('/', portfolioController.getPortfolio);
router.get('/detail/:id', portfolioController.getDetailPortfolio);

router.use(authController.protectAPI);

router.post('/detail', portfolioController.createPortfolio);
router.put('/detail/:id', portfolioController.updatePortfolio);

module.exports = router;