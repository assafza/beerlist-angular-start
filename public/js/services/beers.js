app.factory('beersService', function($http){
var beerList = [];

var deleteBeer = function(beerID){
  return $http.delete('/beers/'+beerID)
    .then(function(response) {
      getBeers();
    }, function(err) {
      console.error(err)
    });
}

var addBeer = function(beer){
  return $http.post('/beers' , beer)
    .then(function(response) {
      console.log(beerList)
      getBeers();
    }, function(err) {
      console.error(err)
    });
  // beerList.push(beer);
};

var getBeers = function() {
  return $http.get('/beers')
    .then(function(response) {
      angular.copy(response.data, beerList);
    }, function(err) {
      console.error(err)
    });
};

var updateBeer = function(beerID){
  return $http.delete('/beers/'+beerID)
    .then(function(response) {
      getBeers();
    }, function(err) {
      console.error(err)
    });
  // beerList.splice(beerIndex,1);
}
var onItemRating = function(rating , beerID){
  return $http.put('/beers/'+beerID+'/rating',{newRating:rating})
    .then(function(response) {
      getBeers();
      console.log(beerList);
    }, function(err) {
      console.error(err)
    });
}

var calcAvg = function (beerIndex){
  if (beerList[beerIndex].rating.counter !=0 ){
    return(beerList[beerIndex].rating.totalRanking / beerList[beerIndex].rating.counter);
  }
  else {
    return 0;
  }
}

  var editBeer = function(beer){
    // console.log(id);
    return $http.put('/beers/'+beer._id , beer)
      .then(function(response) {
        getBeers();
        console.log(beerList);
      }, function(err) {
        console.error(err)
      });
  }

    return {
    beerList   : beerList,
    deleteBeer : deleteBeer,
    addBeer    : addBeer,
    getBeers   : getBeers,
    onItemRating : onItemRating,
    calcAvg    : calcAvg,
    editBeer   : editBeer
  };
});
