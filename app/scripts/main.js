/**
 * Created by Gary on 11/15/2014.
 */
(function(){
  'use strict';

  var app = angular.module('phoneApp', ['ngResource']);

  app.controller("AppCtrl", function ($scope, $resource, $log, productService) {
    $scope.products = [];

    $scope.getProduct = function(){
      var promise = productService.getProducts();

      promise.then(
        function(response) {
          $scope.products = response.data;
          console.log(response);
        },
        function(error) {
          $log.error('failure loading movie', error);
          console.log(error);
        }
      );
    };

    $scope.getProduct();
  });

  app.directive('panel', function(){
    return {
      restrict: 'E',
      transclude: true,
      template: '<div class="panel" ng-transclude>This is a panel component</div>'
    }
  });

  app.factory('productService', function($http) {
    return {
      getProducts: function() {
        return $http.get('http://garyhome.azurewebsites.net/api/productsapi/getproducts');
      }
    }
  });
})()
