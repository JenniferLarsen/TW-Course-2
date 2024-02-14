const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{
        recipeName: String,
        recipeUrl: String,
        // Add other fields relevant to favorites
    }],
    history: [{
        recipeName: String,
        recipeUrl: String,
        // Add other fields relevant to history
    }]
});


// Hash the password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

// Function to add a favorite to user's favorites
userSchema.methods.addFavorite = async function (recipeName, recipeUrl) {
    this.favorites.push({ recipeName, recipeUrl });
    await this.save();
};

// Function to get user's favorites
userSchema.methods.getFavorites = function () {
    return this.favorites;
};

// Function to update a favorite by ID
userSchema.methods.updateFavorite = async function (favoriteId, updatedData) {
    const favoriteIndex = this.favorites.findIndex(fav => fav._id == favoriteId);
    if (favoriteIndex !== -1) {
        this.favorites[favoriteIndex] = { ...this.favorites[favoriteIndex], ...updatedData };
        await this.save();
        return this.favorites[favoriteIndex];
    }
    return null; // Favorite not found
};


const User = mongoose.model('User', userSchema);

module.exports = User;
