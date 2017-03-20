
var express = require('express');
var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));

var bodyParser = require('body-parser');// a package (npm install body-parser) to parse text and to POST
app.use(bodyParser.json());//default when using body-parser
app.use(bodyParser.urlencoded({ extended: false }));//default when using body-parser

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beers');
// './' - this tells node that we are requiring a "local" module and not something we installed with NPM.
var Beer = require("./models/BeerModel");

app.get('/', function(req, res, next) {
  res.send('Testing Server')
})

//print all beers in DB on route /beers
app.get('/beers', function (req, res, next) {
  Beer.find(function (error, beers) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(beers);
    }
  });
});

//post request route that takes body object and save it to DB
app.post('/beers', function (req, res, next) {
  var beer = new Beer(req.body);//create a new beer instance with request.body params
  beer.save(function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send(beer);
    }
  });
});

//post request route that takes body object and save it to DB
app.delete('/beers/:id', function(req, res, next) {
  Beer.remove({ _id: req.params.id }, function(err) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send("Beer Deleted");
    }
  });
});
//put request to update specific item in the DB
app.put('/beers/:id', function (req,res,next){
  Beer.findOneAndUpdate({_id : req.params.id}, req.body, {new : true}, function (err , updatedBeer){
      if (err){
        console.error(err)
        return next(err);
      }
      else{
        res.send(updatedBeer);
      }
  });
});



//put request to update specific item in the DB
app.put('/beers/:id/rating', function (req,res,next){
  Beer.findOneAndUpdate({_id : req.params.id}, {
    "$inc": {
        "rating.counter" : 1,
        "rating.totalRanking" : req.body.newRating
    }
}, {new : true}, function (err , updatedBeer){
      if (err){
        console.error(err)
        return next(err);
      }
      else{
        res.send(updatedBeer);
      }
  });
});

// error handler to catch 404 and forward to main error handler
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
