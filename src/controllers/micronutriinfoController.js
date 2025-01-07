const Micronutrient = require('../models/micronutrientsModel'); 

exports.getMicronutrients = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; 
        const skip = (page - 1) * limit; 
        const micronutrients = await Micronutrient.aggregate([
            { $skip: skip }, 
            { $limit: parseInt(limit) }, 
        ]);
        const totalCount = await Micronutrient.countDocuments();
        res.status(200).json({
            success: true,
            message: 'Micronutrient records fetched successfully.',
            payload: {
                data: micronutrients,
                pagination: {
                    totalCount,
                    totalPages: Math.ceil(totalCount / limit),
                    currentPage: parseInt(page),
                    itemsPerPage: parseInt(limit),
                },
            },
        });
    } catch (error) {
        console.error('Error fetching micronutrient records:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching micronutrient records.',
            error: error.message,
        });
    }
};
