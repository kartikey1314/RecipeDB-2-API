const express = require('express');
const router = express.Router();
const micronutriinfoController = require('../controllers/micronutriinfoController');

router.get('/micronutritioninfo', micronutriinfoController.getMicronutrients);

module.exports = router;
