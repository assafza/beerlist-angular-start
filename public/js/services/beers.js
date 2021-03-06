app.factory('beersService', function($http){
var beerList = [];
var updatingBeers = [];

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
      beerList.push(response.data);
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
  var beerRating = beerList[beerIndex].rating;
  if (beerRating.counter !=0 ){
    return(beerRating.totalRanking / beerRating.counter).toFixed(2);
  }
  else {
    return 0;
  }
}

var editBeer = function(beer,index){
  updatingBeers[index]= angular.copy(beer);
}

var updateBeer = function(index){
    // console.log(id);
    return $http.put('/beers/'+updatingBeers[index]._id , updatingBeers[index])
      .then(function(response) {
        beerList[index] = response;
        updatingBeers[index] = null;
        getBeers();
        console.log(beerList);
      }, function(err) {
        console.error(err)
      });
  }

  var cancelEdit = function($index){

  updatingBeers[$index] = null;
  }

  var addReview = function(beerID, review){
    return $http.post('/beers/'+beerID+'/reviews', review)
    .then(function(updatedReview){
      console.log(updatedReview.data)
          return(updatedReview.data)
    }, function (err){
      console.log(err)
    })
  }

  var deleteReview = function(beerID, reviewID){
    return $http.delete('/beers/'+beerID+'/reviews/'+reviewID)
    .then(function(updatedBeer){
      console.log(updatedBeer);
          return(updatedBeer.data);
    }, function (err){
      console.log(err)
    })
  }

  var getBeerByID = function(id) {
   return $http.get('/beers/' + id)
     .then(function(response) {
       return response.data
     }, function(err) {
       console.error(err)
     });
 };

    return {
    beerList   : beerList,
    deleteBeer : deleteBeer,
    addBeer    : addBeer,
    getBeers   : getBeers,
    onItemRating : onItemRating,
    calcAvg    : calcAvg,
    editBeer   : editBeer,
    updateBeer : updateBeer,
    updatingBeers : updatingBeers,
    addReview : addReview,
    getBeerByID : getBeerByID,
    deleteReview : deleteReview,
    cancelEdit : cancelEdit
  };
});
