'use strict';

/**
 * @ngdoc function
 * @name dripdrankdrunkApp.controller:HistoryCtrl
 * @description
 * # HistoryCtrl
 * Controller of the dripdrankdrunkApp
 */
angular.module('dripdrankdrunkApp')
  .controller('HistoryCtrl', ['$scope', '$state', function ($scope, $state) {
    var weekStartDate = moment().weekday(0);
    if(weekStartDate.day() === moment().day()){
      weekStartDate = moment().weekday(-7);
    }
    // console.log(moment().weekday(0).toString());
    $scope.startDate = weekStartDate.format('MMMM Do YYYY');
    $scope.displays = {
      charts: {
        pie: {
          labels: [],
          data: []
        },
        bar: {
          labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          series: ['This Week', 'Average'],
          data: [[], []],
          options: { legend: { display: true } },
          onClick: function (legendItem, event) {
            if (legendItem && legendItem.length >0) {
              console.log(legendItem);
              console.log(legendItem[0]._index);
              var dateClicked = weekStartDate.add(legendItem._index, 'days');
              // console.log(weekStartDate, dateClicked, {month: dateClicked.month()+1, day:dateClicked.date() , year: dateClicked.year()});
              $state.go('user.day', {month: dateClicked.month()+1, day:dateClicked.date() , year: dateClicked.year()});
            }
          }
        }
      },
      total: 0

    };


    $scope.weekData = {
      drinks: [1, 0, 0, 2, 5, 3, 7],
      breakdown: {
        wine: 3,
        liquor: 8,
        beer: 5,
        mixed: 1
      },
      total: 17
    };

    $scope.weekAverage = {
      drinks: [1.5, 0, 0, 3.5, 3.5, 2.8, 5]
    };

    var buildCircle = function (breakdown) {
      var returnObj = {
        keys: [],
        vals: [],
        count: 0
      };
      for (var key in breakdown) {
        returnObj.keys.push(key);
        returnObj.vals.push(breakdown[key]);
        returnObj.count += parseInt(breakdown[key]);
      }

      $scope.displays.charts.pie.labels = returnObj.keys;
      $scope.displays.charts.pie.data = returnObj.vals;
      $scope.displays.total = returnObj.count;

      // return returnObj;
    };

    var updateDoubleBar = function (week, avg) {
      if (week) {
        $scope.displays.charts.bar.data[0] = week;
      }
      if (avg) {
        $scope.displays.charts.bar.data[1] = avg;
      }
    };

    var setup = function () {
      updateDoubleBar($scope.weekData.drinks, $scope.weekAverage.drinks);
      buildCircle($scope.weekData.breakdown);
    };

    $scope.$on('$viewContentLoaded', function () {
      setup();
    });





  }]);
