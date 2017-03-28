var express = require('express');
var router = express.Router();
var User = require("../models/userModel");
var passport = require('passport');

router.post('/register', function(req, res, next) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.log('Error registering!', err);
      return next(err);
    }
    req.login(user, function(err) {
      if (err) {
        console.log('Error login!', err);
        return next(err);
      }
      console.log('registered and login', req.user.username);
      res.send(req.user.username);
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
    res.send(req.user.username);
});

router.get('/logout', function(req, res) {
  req.logout();//
  res.send('Logged Out');
});

router.get('/currentuser', function(req, res) {
  if (req.user) {
    console.log("this is user" , req.user);
  res.send(req.user.username)
} else {
  console.log("no user");
  res.send(null)
}
});
module.exports = router;
