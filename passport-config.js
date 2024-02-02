// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models/user'); 

passport.use(new LocalStrategy(User.authenticate())); // Use the authenticate method

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
