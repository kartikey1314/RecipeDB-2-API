const Nutrition = require('../models/nutritionModel');
const Recipe = require('../models/recipe');

exports.getNutritionInfo = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;
  
      const nutritionData = await Nutrition.aggregate([
        {
          $lookup: {
            from: 'RecipeDB_general',
            localField: 'Recipe_id',
            foreignField: 'Recipe_id',
            as: 'recipeInfo',
          },
        },
        { $unwind: { path: '$recipeInfo', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            recipeTitle: '$recipeInfo.Recipe_title',
            _id: 1,
            Recipe_id: 1,
            ndb_id: 1,
            "Ash (g)": 1,
            "Calcium, Ca (mg)": 1,
            "Carbohydrate, by difference (g)": 1,
            "Cholesterol (mg)": 1,
            "Copper, Cu (mg)": 1,
            "Energy (kJ)": 1,
            "Energy (kcal)": 1,
            "Fatty acids, total monounsaturated (g)": 1,
            "Fatty acids, total polyunsaturated (g)": 1,
            "Fatty acids, total saturated (g)": 1,
            "Fatty acids, total saturated 14:0 (g)": 1,
            "Fatty acids, total saturated 16:0 (g)": 1,
            "Fatty acids, total saturated 16:1 undifferentiated (g)": 1,
            "Fatty acids, total saturated 18:0 (g)": 1,
            "Fatty acids, total saturated 18:1 undifferentiated (g)": 1,
            "Fatty acids, total saturated 18:2 undifferentiated (g)": 1,
            "Fiber, total dietary (g)": 1,
            "Folate, DFE (g)": 1,
            "Folate, food (g)": 1,
            "Folate, total (g)": 1,
            "Folic acid (g)": 1,
            "Iron, Fe (mg)": 1,
            "Magnesium, Mg (mg)": 1,
            "Manganese, Mn (mg)": 1,
            "Niacin (mg)": 1,
            "Phosphorus, P (mg)": 1,
            "Phytosterols (mg)": 1,
            "Potassium, K (mg)": 1,
            "Protein (g)": 1,
            "Retinol (g)": 1,
            "Riboflavin (mg)": 1,
            "Selenium, Se (g)": 1,
            "Sodium, Na (mg)": 1,
            "Thiamin (mg)": 1,
            "Total lipid (fat) (g)": 1,
            "Vitamin A, IU (IU)": 1,
            "Vitamin A, RAE (g)": 1,
            "Vitamin B-12 (g)": 1,
            "Vitamin C, total ascorbic acid (mg)": 1,
            "Vitamin D (D2 + D3) (g)": 1,
            "Vitamin D (IU)": 1,
            "Water (g)": 1,
            "Zinc, Zn (mg)": 1,
          },
        },
        { $skip: skip },
        { $limit: parseInt(limit) },
      ]);
  
      const reorderedData = nutritionData.map((item) => {
        const { recipeTitle, ...rest } = item;
        return { recipeTitle, ...rest };
      });
  
      const totalCount = await Nutrition.countDocuments();
  
      res.status(200).json({
        success: 'true',
        message: 'Nutrition information fetched successfully.',
        payload: {
          data: reorderedData,
          pagination: {
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: parseInt(page),
            itemsPerPage: parseInt(limit),
          },
        },
      });
    } catch (err) {
      console.error('Error fetching nutrition info:', err);
      res.status(500).json({ success: 'false', message: 'Error fetching nutrition info', error: err });
    }
  };
  
