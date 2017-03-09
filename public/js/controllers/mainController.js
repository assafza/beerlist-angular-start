app.controller('beersCtrl',function ($scope , beersService ){
  $scope.beers = beersService.beerList;
  $scope.firstRate = 0;
   $scope.secondRate = 0;
   $scope.readOnly = true;

  $scope.delete = function(beerIndex){
    $scope.beers.splice(beerIndex,1);
  };

  $scope.addBeer = function(){
    $scope.beers.push({
      name : $scope.name,
      style : $scope.style,
      abv : $scope.abv,
      image : $scope.image,
      rating : $scope.secondRate
    });
    console.log($scope.beers);
  };

   $scope.onItemRating = function(rating , beerIndex){
     $scope.secondRate = rating;
   };

});
