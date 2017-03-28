app.controller('authController',function ($scope  , authFactory, $state){
  var currentUser ={}

$scope.register = function(){
authFactory.register($scope.user)
.then(function(user){
  $state.go('home');
    }, function(err) {
      alert(err.data.message);
    });
}

$scope.login = function(){
authFactory.login($scope.user)
.then(function(user){
  $state.go('home');
    }, function(err) {
      console.log(err);
      alert(err.data.message);
    });
}
});
