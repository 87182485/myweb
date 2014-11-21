/**
 * Created by Gary on 11/19/2014.
 */
(function(){
  'use strict';

  angular.module('ngNewsApp')
    .factory('authService', authService);

  function authService($firebaseSimpleLogin, FIREBASE_URL, $rootScope, $firebase){
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(ref);

    var authService = {
      register: function(user){
        return auth.$createUser(user.email,user.password);
      },
      createProfile: function(user){
        var profile = {
          username: user.username,
          md5_hash: user.md5_hash
        };

        var profileRef = $firebase(ref.child('profile'));
        return profileRef.$set(user.uid, profile);
      },
      login: function(user){
        return auth.$login('password', user);
      },

      logout: function(){
        auth.$logout();
      },

      resolveUser: function(){
        return auth.$getCurrentUser();
      },

      signedIn: function(){
        return !!authService.user.provider;
      },
      user:{

      }
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user){
      angular.copy(user, authService.user);
      authService.user.profile = $firebase(ref.child('profile').child(authService.user.uid)).$asObject();

      //console.log(authService.user);
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function(){
      console.log('logged out');

      if(authService.user && authService.user.profile){
        authService.user.profile.$destroy();
      }
      angular.copy({}, authService.user);
    });

    return authService;
  }
})();
