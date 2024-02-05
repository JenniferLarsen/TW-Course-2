// // models/user.js
// const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String,
// });

// userSchema.plugin(passportLocalMongoose);

// const User = mongoose.model('User', userSchema);

// module.exports = User;


// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
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

const User = mongoose.model('User', userSchema);

module.exports = User;
