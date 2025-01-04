const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/recipesinfo', recipeController.getRecipes);
router.get('/recipeofday', recipeController.getRecipeOfTheDay);

module.exports = router;
