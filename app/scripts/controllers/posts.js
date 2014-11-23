/**
 * Created by Gary on 11/19/2014.
 */

angular.module('ngNewsApp')
.controller('postController', postController);

function postController($scope, $location, PostService, authService) {
  $scope.posts = PostService.all;

  $scope.user = authService.user;

  $scope.post = {
    url:'http://'
  }

  $scope.deletePost = deletePost;

  function deletePost(post){
    PostService.delete(post)
  };
}
