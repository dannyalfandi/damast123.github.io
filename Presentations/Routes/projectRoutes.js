const express = require('express');

const router = express.Router();

const portfolioController = require('./../../Presentations/Controllers/portfolioController');

router.post('/detail', portfolioController.createPortfolio);
router.patch('/detail', portfolioController.updatePortfolio);
// router.get('/', portfolioController);
// router.post('/detail-portfolio', portfolioController);

module.exports = router;