const Recipe = require('../models/recipe');
const Instruction = require('../models/instructionModel');

exports.getRecipes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;
    const recipes = await Recipe.aggregate([
      {
        $lookup: {
          from: 'RecipeDB_instructions',
          localField: 'Recipe_id',
          foreignField: 'recipe_id',
          as: 'instructions'
        }
      },
      { $unwind: { path: '$instructions', preserveNullAndEmptyArrays: true } },
      { $project: { "instructions._id": 0, "instructions.recipe_id": 0 } },
      { $skip: skip },
      { $limit: parseInt(limit) }
    ]);

    const totalCount = await Recipe.countDocuments();

    res.status(200).json({
      success: "true",
      message: "Recipes fetched successfully.",
      payload: {
        data: recipes,
        pagination: {
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: parseInt(page),
          itemsPerPage: parseInt(limit),
        }
      }
    });
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ success: "false", message: 'Error fetching recipes', error: err });
  }
};

const cache = {
  lastRecipe: null,
  lastDate: null,
};

exports.getRecipeOfTheDay = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; 

    if (cache.lastDate !== today || !cache.lastRecipe) {
      const randomRecipe = await Recipe.aggregate([{ $sample: { size: 1 } }]);

      if (randomRecipe.length === 0) {
        return res.status(404).json({ success: "false", message: 'No recipe found' });
      }

      const recipe = randomRecipe[0];
      const instructions = await Instruction.findOne({ recipe_id: recipe.Recipe_id });

      cache.lastRecipe = {
        ...recipe,
        instructions: instructions ? instructions.steps : 'Instructions not found',
      };
      cache.lastDate = today;
    }

    res.status(200).json({
      success: "true",
      message: "Recipe fetched successfully.",
      payload: { data: cache.lastRecipe },
    });
  } catch (err) {
    console.error('Error fetching recipe:', err);
    res.status(500).json({ success: "false", message: 'Error fetching recipe', error: err });
  }
};

