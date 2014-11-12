'use strict';

/**
 * @ngdoc function
 * @name mywebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mywebApp
 */
angular.module('mywebApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
