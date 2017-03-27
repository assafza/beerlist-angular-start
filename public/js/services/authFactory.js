app.factory('authFactory', function($http) {
  var auth = {};

  auth.register = function(user) {
    return $http.post('/users/register' , user)
      .then(function(response) {
      return(response.data);
      }, function(err) {
        console.error(err);
      });
  };

  return auth;
});
