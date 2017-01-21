'use strict';

/**
 * @ngdoc function
 * @name dripdrankdrunkApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the dripdrankdrunkApp
 */
angular.module('dripdrankdrunkApp')
  .controller('UserCtrl', ['$scope', function ($scope) {
    $scope.startDate = '1/15/2017';
    $scope.displays = {
      charts: {
        pie: {
          labels: [],
          data: []
        },
        bar: {
          labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          series: ['This Week', 'Average'],
          data: [[],[]],
          options: { legend: { display: true } }
        }
      },
      total:0 

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
      drinks: [1.5, 0, 0, 3.5, 3.5, 2.8]
    };

    var buildCircle = function(breakdown){
      var returnObj = {
        keys:[],
        vals:[],
        count:0
      };
      for(var key in breakdown){
        returnObj.keys.push(key);
        returnObj.vals.push(breakdown[key]);
        returnObj.count += parseInt(breakdown[key]);
      }

      $scope.displays.charts.pie.labels = returnObj.keys;
      $scope.displays.charts.pie.data = returnObj.vals;
      $scope.displays.total = returnObj.count;
      
      // return returnObj;
    };

    var updateDoubleBar = function(week, avg){
        if(week){
          $scope.displays.charts.bar.data[0] = week;
        }
        if(avg){
          $scope.displays.charts.bar.data[1] = avg;
        }
    };

    var setup = function () {
      updateDoubleBar($scope.weekData.drinks, $scope.weekAverage.drinks);
      buildCircle($scope.weekData.breakdown);
      console.log($scope.displays.charts);
    };

    $scope.$on('$viewContentLoaded', function () {
      setup();
    });


  }]);
