const Recipe = require('../models/recipe');

exports.getRecipesByRange = async (req, res) => {
    const { min, max, field = 'total_time', page = 1, limit = 10 } = req.query;
  
    // Pagination settings
    const skip = (page - 1) * limit;
  
    try {
      // Validate the field parameter
      if (!['total_time', 'prep_time', 'cook_time'].includes(field)) {
        return res.status(400).json({
          success: false,
          message: `Invalid field provided. Choose from 'total_time', 'prep_time', or 'cook_time'.`,
        });
      }
  
      // Aggregation pipeline for filtering and pagination
      const pipeline = [
        {
          $addFields: {
            [field]: {
              $convert: {
                input: `$${field}`, // Target the field
                to: 'double', // Convert to a number (allows handling of floats)
                onError: 0, // If conversion fails, set the value to 0
                onNull: 0, // If the value is null, set it to 0
              },
            },
          },
        },
        {
          $match: {
            [field]: { $gte: Number(min), $lte: Number(max) }, // Filter by range
          },
        },
        {
          $project: {
            Recipe_id: 1,
            Recipe_title: 1,
            total_time: 1,
            prep_time: 1,
            cook_time: 1,
            Region: 1,
            Sub_region: 1,
            Source: 1,
          },
        },
        { $skip: skip }, // Pagination: Skip records
        { $limit: Number(limit) }, // Pagination: Limit the number of records
      ];
  
      // Execute the pipeline
      const recipes = await Recipe.aggregate(pipeline);
  
      // Count total matching documents (for pagination metadata)
      const totalPipeline = [
        {
          $addFields: {
            [field]: {
              $convert: {
                input: `$${field}`, // Target the field
                to: 'double', // Convert to a number (allows handling of floats)
                onError: 0, // If conversion fails, set the value to 0
                onNull: 0, // If the value is null, set it to 0
              },
            },
          },
        },
        {
          $match: {
            [field]: { $gte: Number(min), $lte: Number(max) }, // Filter by range
          },
        },
        { $count: 'count' }, // Count total documents
      ];
      const totalResult = await Recipe.aggregate(totalPipeline);
      const totalCount = totalResult.length > 0 ? totalResult[0].count : 0;
  
      res.status(200).json({
        success: true,
        page: Number(page),
        totalPages: Math.ceil(totalCount / limit),
        totalResults: totalCount,
        data: recipes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch recipes',
        error: error.message,
      });
    }
  };
  
  
  
