var app = angular.module('beerList', ['ui.router' , 'jkAngularRatingStars']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home' ,
  {
    url : '/home',
    controller: 'mainController',
    templateUrl : '/templates/home.html'
  } )

  .state('beer',
  {
    url : '/beer/:id',
    controller: 'beerController',
    templateUrl : '/templates/beer.html',
    params: {
        beerParam: null
      }
  })

  .state('register', {
  url: '/register',
  templateUrl: '/templates/register.html',
  controller: 'authController'
  })

});
