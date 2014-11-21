/**
 * Created by Gary on 11/19/2014.
 */
(function(){
  angular.module('ngNewsApp')
    .controller('authController', authController);

  function authController($scope, $location, authService){
    if(authService.signedIn()){
      $location.path('/');
    }

    $scope.login = login;
    $scope.register = register;

    function login(){
      authService.login($scope.user).then(function(){
        $location.path('/');
      }, function (error) {
        $scope.error = error.toString();
      })
    }

    function register(){
      authService.register($scope.user).then(function(user){
        return authService.login($scope.user).then(function(){
          user.username = $scope.user.username;
          return authService.createProfile(user);
        }).then(function(){
          $location.path('/');
        });
      }, function (error) {
        $scope.error = error.toString();
      });
    }
  }
})();
