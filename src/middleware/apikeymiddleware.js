// Middleware to verify API key
const verifyApiKey = (req, res, next) => {
    const userApiKey = req.headers["api-key"];
    const API_KEY = process.env.API_KEY;
  
    if (userApiKey !== API_KEY) {
      return res.status(403).json({ error: "Forbidden: Invalid API Key" });
    }
    next();
  };
  
  module.exports = verifyApiKey;
  