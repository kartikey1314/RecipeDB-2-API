const mongoose = require('mongoose');

const instructionSchema = new mongoose.Schema({
  recipe_id: String,
  steps: String
}, { collection: 'RecipeDB_instructions' });

module.exports = mongoose.model('Instruction', instructionSchema);
