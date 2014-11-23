/**
 * Created by Gary on 11/23/2014.
 */
(function () {
  angular.module('ngNewsApp')
    .factory('planDetailService', planDetailService);

  function planDetailService($window, FIREBASE_URL, $firebase, planService, $q) {
    var ref = new $window.Firebase(FIREBASE_URL);

    var planDetailService = {
      get: get,
      getPlans: getPlans
    }

    function get(planId) {
      return $firebase(ref.child('plans').child(planId)).$asObject();
    }

    function getPlans(userId) {
      var defer = $q.defer();

      $firebase(ref.child('user_plans').child(userId))
        .$asArray()
        .$loaded()
        .then(function (data) {
          var posts = {};

          for (var i = 0; i < data.length; i++) {
            var value = data[i].$value;
            posts[value] = planService.get(value);
          }

          defer.resolve(posts);
        });

      return defer.promise;
    }

    return planDetailService;
  }
})();
