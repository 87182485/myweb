/**
 * Created by Gary on 11/21/2014.
 */
(function () {
  angular.module('ngNewsApp')
    .factory('planService', planService);

  function planService($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);

    var plans = $firebase(ref.child('plans')).$asArray();

    var planService = {
      all: plans,
      create: function (plan) {
        return plans.$add(plan).then(function (planRef) {
          $firebase(ref.child('user_plans').child(plan.creatorUID))
            .$push(planRef.name());

          return planRef;
        });
      },
      get: function (planId) {
        return $firebase(ref.child('plans').child(planId)).$asObject();
      },
      delete: function (plan) {
        return plans.$remove(plan);
      },
      comments: function (planId) {
        return $firebase(ref.child('plan_comments').child(planId)).$asArray();
      }
    };

    return planService;
  }
})();
