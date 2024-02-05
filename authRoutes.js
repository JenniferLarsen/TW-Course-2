const express = require('express');
const passport = require('passport');
var LocalStrategy = require('passport-local');

const { User } = require('./db'); // Update the path accordingly

const router = express.Router();

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, user);
    });
  });
}));

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
router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}), (req, res) => {
  res.json({ success: 'Login successful', user: req.user });
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ success: 'Logout successful' });
});

module.exports = router;
