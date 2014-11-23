/**
 * Created by Gary on 11/21/2014.
 */
(function () {
  angular.module('ngNewsApp')
    .controller('planController', planController);

  function planController($scope, $location, authService, planService, $timeout) {
    $scope.plans = planService.all;

    $scope.user = authService.user;

    $scope.plan = {
      name: '',
      from: '',
      to: '',
      type: ''
    }

    $scope.create = create;
    $scope.openStartCalendar = openStartCalendar;
    $scope.openEndCalendar = openEndCalendar;

    function create() {
      $scope.plan.creator = $scope.user.profile.username;
      $scope.plan.creatorUID = $scope.user.uid;
      $scope.plan.from = $scope.plan.from.toString();
      $scope.plan.to = $scope.plan.to.toString();
      planService.create($scope.plan).then(function (ref) {
        $location.path('/plan-detail/' + ref.name());
        $scope.plan = {
          name: '',
          from: '',
          to: '',
          type: ''
        }
      });
    }

    function openEndCalendar() {
      $timeout(function () {
        $scope.endCalendarOpened = true;
      });
    };

    function openStartCalendar() {
      $timeout(function () {
        $scope.startCalendarOpened = true;
      });
    };
  }
})();
