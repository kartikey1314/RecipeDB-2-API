const express = require('express');
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
dotenv.config();
const Recipe=require('./src/models/recipe');
const indexRoutes = require("./src/routes/indexRoutes");
const verifyApiKey=require("./src/middleware/apikeymiddleware");
const recipeTimeRoutes = require("./src/routes/recipebytimeRoutes");
const recipeRoutes = require("./src/routes/recipeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(verifyApiKey);


//connecting database 
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
   // useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error('error in connecting to MongoDB', err);
});



//home Route 
app.use('/', indexRoutes);
app.use('/recipe',recipeRoutes);   //recipesinfo for recipes info
//recipeofday for gettinf recipe of the day.

app.use('/api/recipes', recipeTimeRoutes);





//start server 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });