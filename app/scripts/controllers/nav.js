/**
 * Created by Gary on 11/19/2014.
 */
(function(){
  'use strict';

  angular.module('ngNewsApp')
    .controller('navController', navController);

  function navController($scope, $location, PostService, authService){
    $scope.post = {url: 'http://', title:''};

    $scope.submitPost = submitPost;

    $scope.signedIn = authService.signedIn;

    $scope.logout = authService.logout;

    $scope.user = authService.user;

    function submitPost(){
      $scope.post.creator = $scope.user.profile.username;
      $scope.post.creatorUID = $scope.user.uid;
      PostService.create($scope.post).then(function (ref) {
        $location.path('/posts/' + ref.name());
        $scope.post = {url: 'http://', title: ''};
      });
    }
  }
})()
