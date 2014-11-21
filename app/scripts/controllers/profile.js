/**
 * Created by Gary on 11/20/2014.
 */
(function(){
  angular.module('ngNewsApp')
    .controller('profileController',profileController);

  function profileController($scope, $routeParams, profileService){
    var uid = $routeParams.userId;

    $scope.profile = profileService.get(uid);
    profileService.getPosts(uid).then(function(posts){
      $scope.posts = posts;
    })
  }
})();
