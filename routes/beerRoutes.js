var express = require('express');
var router = express.Router();
var Beer = require("../models/BeerModel");

//print all beers in DB on route /beers
router.get('/', function (req, res, next) {
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
router.post('/', function (req, res, next) {
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
router.delete('/:id', function(req, res, next) {
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
router.put('/:id', function (req,res,next){
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
router.put('/:id/rating', function (req,res,next){
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

//add review to a beer
router.post('/:id/reviews', function(req, res, next) {
  Beer.findById(req.params.id, function(err, foundBeer) {
    if (err) {
      console.error(err);
      return next(err);
    } else if (!foundBeer) {
      return res.send("Error! No beer found with that ID");
    } else {
      foundBeer.reviews.push(req.body)
      foundBeer.save(function(err, updatedBeer) {
        if (err) {
          return next(err);
        } else {
          res.send(req.body);
        }
      });
    }
  });
});

//delete specific review
router.delete('/:beerid/reviews/:reviewid', function(req, res, next) {
  Beer.findById(req.params.beerid, function(err, foundBeer) {
    if (err) {
      return next(err);
    } else if (!foundBeer) {
      return res.send("Error! No beer found with that ID");
    } else {
      var reviewToDelete = foundBeer.reviews.id(req.params.reviewid)
      if (reviewToDelete) {
        reviewToDelete.remove()
        foundBeer.save(function(err, updatedBeer) {
          if (err) {
            return next(err);
          } else {
            res.send(updatedBeer);
          }
        });
      } else {
        return res.send("Error! No review found with that ID");
      }
    }
  });
});

//get beer by ID
router.get('/:id', function(req, res, next) {
  Beer.findById(req.params.id, function(error, beer) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(beer);
    }
  });
});


module.exports = router;
