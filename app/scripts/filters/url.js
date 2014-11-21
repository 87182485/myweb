/**
 * Created by Gary on 11/19/2014.
 */
(function(){
  'use strict';

  angular.module('ngNewsApp')
    .filter('hostnameFromUrl', hostnameFromUrl);

  function hostnameFromUrl(){
    return function(str){
      var url = document.createElement('a');

      url.href = str;

      return url.hostname;
    };
  }
})()
