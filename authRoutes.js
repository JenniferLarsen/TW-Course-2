const express = require('express');
const passport = require('passport');
const { User } = require('./db'); // Update the path accordingly

const router = express.Router();

// Registration route
router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error registering user' });
    } else {
      passport.authenticate('local')(req, res, () => {
        res.json({ success: 'User registered successfully' });
      });
    }
  });
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ success: 'Login successful', user: req.user });
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ success: 'Logout successful' });
});

module.exports = router;
