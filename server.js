
var express = require('express');
//a framework for authentication on node.js
var passport = require('passport');
//in order to create sessions for users
var expressSession = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var User = require("./models/userModel");

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));

var bodyParser = require('body-parser');// a package (npm install body-parser) to parse text and to POST
app.use(bodyParser.json());//default when using body-parser
app.use(bodyParser.urlencoded({ extended: false }));//default when using body-parser


//This tells express to use the express-session
//middleware and configure it with a secret key.
app.use(expressSession({ secret: 'thisIsASecret', resave: false, saveUninitialized: false }));;
app.use(passport.initialize());
//This makes sure our app is using passport's session middleware!
app.use(passport.session());
passport.use(User.createStrategy()); //Thanks to m-l-p there is no need to create a local strategy
//This code supplies passport with the serializeUser callback function
passport.serializeUser(function (user, done) {
  done(null, user.username);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beers');
// './' - this tells node that we are requiring a "local" module and not something we installed with NPM.
var beerRoutes = require('./routes/beerRoutes');
var userRoutes = require('./routes/userRoutes');

//This tells the server that when a request comes into '/beers'
//that it should use the routes in 'beerRoutes'
//and those are in our new beerRoutes.js file
app.use('/beers', beerRoutes);
app.use('/users', userRoutes);


app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
})

//error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.listen(8000, function() {
  console.log("Fullstack project. Listening on 8000.")

});
