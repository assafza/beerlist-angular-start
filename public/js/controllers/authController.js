app.controller('authController',function ($scope  , authFactory, $state){

$scope.register = function(){
authFactory.register($scope.user)
.then(function(user){
  $state.go('home');
    }, function(err) {
      alert(err.data.message);
    });
}
});
