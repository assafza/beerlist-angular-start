app.controller('beerController',function ($scope , $stateParams , beersService){
if(!$stateParams.beerParam){
  //we dont have params from the client
  //meaning the user clicked directly on a link eith beer ID
  //we need to fetch data from the server on this specific beerID

  beersService.getBeerByID($stateParams.id)
      .then(function(beer) {
        $scope.beer = beer;
      })
}
else{
  $scope.beer = $stateParams.beerParam;
}

$scope.addReview= function(){
  beersService.addReview($scope.beer._id ,
     {author : $scope.reviewAuthor , text : $scope.reviewText })
     .then(function(review){
       console.log(review)
       $scope.beer.reviews.push(review);
     })
}

$scope.delete= function(reviewID){
  beersService.deleteReview($scope.beer._id , reviewID )
     .then(function(beer){
       console.log(beer)
       $scope.beer = beer;
     })
}

});
