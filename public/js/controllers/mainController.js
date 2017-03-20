app.controller('beersCtrl',function ($scope , beersService ){
  $scope.beers = beersService.beerList;
  $scope.updatingBeers = beersService.updatingBeers;
  $scope.edit = 0;
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
  $scope.updateBeer = beersService.updateBeer;
  $scope.getBeers = beersService.getBeers;
  $scope.getBeers();
  $scope.addReview = function (){
    beersService.addReview(0, {author : "Assaf" , text:"controller"});
    }

});
