const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const FavoriteRecipe = mongoose.model('FavoriteRecipe', recipeSchema);

module.exports = FavoriteRecipe;
