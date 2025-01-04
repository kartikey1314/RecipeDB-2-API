const express = require('express');
const { getRecipesByRange } = require('../controllers/recipetimeController');
const validateRange = require('../middleware/validateTimeRange');

const router = express.Router();

// Define the route with middleware
router.get('/range', validateRange, getRecipesByRange);

module.exports = router;
