app.controller('masterController',function ($scope , authFactory ){
  authFactory.getCurrentUser();
$scope.currentUser = authFactory.currentUser;
$scope.logout = authFactory.logout;
});
