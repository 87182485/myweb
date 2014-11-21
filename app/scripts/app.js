'use strict';

/**
 * @ngdoc overview
 * @name mywebApp
 * @description
 * # mywebApp
 *
 * Main module of the application.
 */
angular
  .module('ngNewsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'postController'
      })
      .when('/posts/:postId', {
        templateUrl: 'views/showpost.html',
        controller: 'postViewController'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'authController',
        resolve:{
          user: function(authService){
            return authService.resolveUser();
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'authController',
        resolve:{
          user:function(authService){
            return authService.resolveUser();
          }
        }
      })
      .when('/users/:userId',{
        templateUrl: 'views/profile.html',
        controller: 'profileController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FIREBASE_URL', 'https://sizzling-torch-8651.firebaseio.com/');
