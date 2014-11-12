'use strict';

/**
 * @ngdoc function
 * @name mywebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mywebApp
 */
angular.module('mywebApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
