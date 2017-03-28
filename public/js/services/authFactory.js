app.factory('authFactory', function($http) {
  var auth = {};

  auth.currentUser = {};

  auth.register = function(user) {
    return $http.post('/users/register' , user)
      .then(function(response) {
      auth.currentUser.username = response.data;
      console.log("successful registerred in as : " ,auth.currentUser.username);
      });
  };

  auth.login = function(user) {
    return $http.post('/users/login' , user)
      .then(function(response,err) {
        auth.currentUser.username = response.data;
        console.log("logged in as : " ,auth.currentUser.username);
    });
  };

  auth.getCurrentUser = function() {
   return $http.get('/users/currentuser')
     .then(function(response) {
       auth.currentUser.username = response.data;
     });;
 }

 auth.logout = function() {
  return $http.get('/users/logout')
    .then(function(response) {
      auth.currentUser.username = null;
    });;
}

  return auth;
});
