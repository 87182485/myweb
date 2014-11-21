/**
 * Created by Gary on 11/19/2014.
 */
(function(){
  'use strict';

  angular.module('ngNewsApp')
    .controller('postViewController', postViewController);

  function postViewController($scope, $routeParams, PostService, authService){
    $scope.post = PostService.get($routeParams.postId);

    $scope.comments = PostService.comments($routeParams.postId);

    $scope.signedIn = authService.signedIn;

    $scope.user = authService.user;

    $scope.addComment = addComment;
    $scope.deleteComment = deleteComment;

    function addComment(){
      if(!$scope.commentText || $scope.commentText === ''){
        return;
      }

      var comment = {
        text: $scope.commentText,
        creator: $scope.user.profile.username,
        creatorUID:$scope.user.uid
      };

      $scope.comments.$add(comment);
      $scope.commentText = '';
    }

    function deleteComment(comment){
      $scope.comments.$remove(comment);
    }
  }
})();
