const mongoose = require('mongoose'); 

const recipeSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  Recipe_id: { type: String, required: true },
  Calories: { type: String, required: true },
  cook_time: { type: String, required: true },
  prep_time: { type: String, required: true },
  servings: { type: String, required: true },
  Recipe_title: { type: String, required: true },
  total_time: { type: String, required: true },
  url: { type: String, required: true },
  Region: { type: String, required: true },
  Sub_region: { type: String, required: true },
  Continent: { type: String, required: true },
  Source: { type: String, required: true },
  img_url: { type: String, required: true },
  'Carbohydrate, by difference (g)': { type: String, required: true },
  'Energy (kcal)': { type: String, required: true },
  'Protein (g)': { type: String, required: true },
  'Total lipid (fat) (g)': { type: String, required: true },
  Processes: { type: String, required: true },
  vegan: { type: String, required: true },
  pescetarian: { type: String, required: true },
  ovo_vegetarian: { type: String, required: true },
  lacto_vegetarian: { type: String, required: true },
  ovo_lacto_vegetarian: { type: String, required: true }
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'RecipeDB_general');
module.exports = Recipe;