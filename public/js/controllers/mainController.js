app.controller('beersCtrl',function ($scope , beersService ){
  $scope.beers = beersService.beerList;
  $scope.firstRate = 0;
   $scope.secondRate = 0;
   $scope.readOnly = true;
   $scope.delete = beersService.deleteBeer;
   $scope.addBeer = function(){
     //validate abv number needed for validate integer value
       beersService.addBeer({
       name : $scope.name,
       style : $scope.style,
       abv : $scope.abv,
       image : $scope.image,
       rating : {
         counter : 0,
         totalRanking : $scope.secondRate
       }
     });
   };
  $scope.onItemRating = beersService.onItemRating;
  $scope.calcAvg = beersService.calcAvg;
  $scope.editBeer = beersService.editBeer;
  $scope.getBeers = beersService.getBeers;
   $scope.getBeers();
});
