app.controller('beersCtrl',function ($scope , beersService ){
  $scope.beers = beersService.beerList;
  $scope.firstRate = 0;
   $scope.secondRate = 0;
   $scope.readOnly = true;

   $scope.delete = beersService.deleteBeer;
   $scope.addBeer = function(){
       beersService.addBeer({
       name : $scope.name,
       style : $scope.style,
       abv : $scope.abv,
       image : $scope.image,
       rating : $scope.secondRate
     });
   };

   $scope.onItemRating = function(rating , beerIndex){
     $scope.secondRate = rating;
     $scope.beers[beerIndex].rating.counter ++;
     $scope.beers[beerIndex].rating.totalRanking += rating;
    $scope.beers[beerIndex].rating.avg = $scope.avgRating(beerIndex);
   };

   $scope.avgRating = function(beerIndex){
      return ($scope.beers[beerIndex].rating.totalRanking / $scope.beers[beerIndex].rating.counter);
   }

});
