const express = require('express');
const viewController = require('./../Controllers/viewController');
const router = express.Router();
const path = require('path');


router.get('', viewController.getHomePage);
router.get('/about', viewController.getAboutPage);
router.get('/resume', viewController.getResumePage);
router.get('/services', viewController.getServicePage);
router.get('/portfolio', viewController.getPortfolioPage);
router.get('/detail-portfolio/:slug', viewController.getDetailPortfolioPage);
router.get('/contact', viewController.getContactPage);
router.get('/download/node', (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'files', 'bootcamp-node-uc.pdf');
  
  res.download(filePath, 'bootcamp-node-uc.pdf', (err) => {
    if (err) {
      console.error('File download error:', err);
      res.status(404).send('File not found or error occurred.');
    }
  });
});

router.get('/download/ai-camp', (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'files', '1002 - DSC 33 - Danny Alfandi.pdf');
  
  res.download(filePath, '1002 - DSC 33 - Danny Alfandi.pdf', (err) => {
    if (err) {
      console.error('File download error:', err);
      res.status(404).send('File not found or error occurred.');
    }
  });
});

router.get('/download/dasar-ai', (req, res) => {
  res.redirect('https://www.dicoding.com/certificates/EYX4KK7R5PDL');
});


module.exports = router;