module.exports = (req, res, next) => {
    const { min, max, page, limit } = req.query;
  
    if (!min || !max || isNaN(min) || isNaN(max)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid range. Please provide valid min and max query parameters.',
      });
    }
  
    if (page && isNaN(page)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid page number. Please provide a valid number.',
      });
    }
  
    if (limit && isNaN(limit)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid limit value. Please provide a valid number.',
      });
    }
  
    next();
  };
  