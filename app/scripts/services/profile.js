/**
 * Created by Gary on 11/20/2014.
 */
(function(){
  angular.module('ngNewsApp')
    .factory('profileService', profileService);

  function profileService($window, FIREBASE_URL, $firebase, PostService, $q){
    var ref = new $window.Firebase(FIREBASE_URL);

    var profileService = {
      get:get,
      getPosts:getPosts
    }

    function get(userId){
      return $firebase(ref.child('profile').child(userId)).$asObject();
    }

    function getPosts(userId){
      var defer = $q.defer();

      $firebase(ref.child('user_posts').child(userId))
        .$asArray()
        .$loaded()
        .then(function(data){
          var posts = {};

          for(var i = 0; i<data.length; i++) {
            var value = data[i].$value;
            posts[value] = PostService.get(value);
          }
          defer.resolve(posts);
        });

      return defer.promise;
    }

    return profileService;
  }
})();
