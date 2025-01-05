const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');

router.get('/nutritioninfo', nutritionController.getNutritionInfo);

module.exports = router;
