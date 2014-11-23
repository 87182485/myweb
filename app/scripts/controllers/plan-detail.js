/**
 * Created by Gary on 11/23/2014.
 */
(function () {
  angular.module('ngNewsApp')
    .controller('planDetailController', planDetailController);

  function planDetailController($scope, $routeParams, planDetailService) {
    var pid = $routeParams.planId;

    $scope.planDetail = planDetailService.get(pid);

    $scope.getPlanStatus = getPlanStatus;

    function getPlanStatus() {
      var toDate = new Date($scope.planDetail.to);

      var fromDate = new Date($scope.planDetail.from);

      var daysLeft = DateDiff(toDate, new Date());
      var daysBegan = DateDiff(new Date(), fromDate);

      var getPlanStatus = {
        daysBegin: daysBegan,
        daysLeft: Math.round(daysLeft),
        progress: daysBegan <= 0 ? 0 : daysBegan / (daysBegan + daysLeft) * 100,
        type: daysLeft <= 0 ? 'success' : 'info'
      };

      return getPlanStatus;
    }

    function DateDiff(date1, date2) {
      var datediff = date1.getTime() - date2.getTime();
      //store the getTime diff - or +
      return (datediff / (24 * 60 * 60 * 1000));
      //Convert values to -/+ days and return value
    }
  }
})()
