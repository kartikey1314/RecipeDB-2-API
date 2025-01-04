const express = require('express');
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
const Recipe=require('./src/models/recipe')

app.get("/", (req,res)=>{
    res.send("Hello World");
})
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error('error in connecting to MongoDB', err);
});


//fetch recipe by id API
app.get('/recipes/:id', async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ Recipe_id: req.params.id }); // Fetch by Recipe_id
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching recipe', details: err });
    }
  });





//start server 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });