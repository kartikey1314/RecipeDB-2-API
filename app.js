const express = require('express');
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
dotenv.config();
const Recipe=require('./src/models/recipe');
const indexRoutes = require("./src/routes/indexRoutes");
const verifyApiKey=require("./src/middleware/apikeymiddleware");
const recipeRoutes = require("./src/routes/recipeRoutes");
const nutritionRoutes = require('./src/routes/nutritionRoutes');
const micronutrientsRoutes = require('./src/routes/micronutrientsRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(verifyApiKey);


//connecting database 
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error('error in connecting to MongoDB', err);
});

//home Route 
app.use('/', indexRoutes);
app.use('/recipe',recipeRoutes);
app.use('/recipe',nutritionRoutes)
app.use('/recipe',micronutrientsRoutes);
//start server 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });