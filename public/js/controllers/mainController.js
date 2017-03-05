app.controller('beersCtrl',function ($scope , beersService ){
  $scope.beers = beersService.beerList;

  $scope.delete = function(beerIndex){
    $scope.beers.splice(beerIndex,1);
  };

  $scope.addBeer = function(){
    alert("hey");
    $scope.beers.push({
      name : $scope.name,
      style : $scope.style,
      abv : $scope.abv,
      image : $scope.image
    });
  };
});
