'use strict';

/**
 * @ngdoc function
 * @name dripdrankdrunkApp.controller:HabitsCtrl
 * @description
 * # HabitsCtrl
 * Controller of the dripdrankdrunkApp
 */
angular.module('dripdrankdrunkApp')
  .controller('HabitsCtrl', ['$scope', function ($scope) {
    $scope.controls = {
      weekendBttns: 1,
      weekendSlider: {
        value: 0,
        options: {
          id: 'weekend',
          floor: 0,
          ceil: 18,
          step: 0.5,
          precision: 1,
          onChange: function () {
            refreshCharts();
          }
        }
      },
      weekdaySlider: {
        value: 0,
        options: {
          id: 'weekday',
          floor: 0,
          ceil: 18,
          step: 0.5,
          precision: 1,
          onChange: function () {
            refreshCharts();
          }
        }
      },
      weekdayBttns: 1
    };

    $scope.money = { day: 0, end: 0 };
    $scope.updateMoney = function () {
      // console.log('hit', $scope.money);
      refreshCharts();
    };

    $scope.updateWeekday = function (val) {
      $scope.controls.weekdayBttns = val;
      refreshCharts();
    };

    $scope.updateWeekend = function (val) {
      $scope.controls.weekendBttns = val;
      refreshCharts();
    };

    $scope.options = {
      scales: {
        xAxes: [{
          display: false,
          ticks: {
            max: 125,
            min: -125,
            stepSize: 10
          }
        }],
        yAxes: [{
          display: false,
          ticks: {
            max: 125,
            min: -125,
            stepSize: 10
          }
        }]
      }
    };


    // $interval(createChart, 2000);

    function createChart() {
      $scope.series = [];
      $scope.data = [];
      //weekday
      $scope.series.push('Weekday');
      var day = [];
      // if ($scope.controls.weekdaySlider.value > 0) {
      for (var i = 0; i < $scope.controls.weekdayBttns * 4; i++) {
        // $scope.data.push([{
        day.push({
          x: randomScalingFactor(),
          y: randomScalingFactor(),
          r: ($scope.controls.weekdaySlider.value + 2) * 2
        });
      }
      // }
      $scope.data.push(day);
      $scope.series.push('');
      $scope.data.push([]);
      //weekend
      $scope.series.push('Weekend');
      var end = [];
      // if ($scope.controls.weekendSlider.value > 0) {
      for (var j = 0; j < $scope.controls.weekendBttns * 4; j++) {
        // $scope.data.push([{
        end.push({
          x: randomScalingFactor(),
          y: randomScalingFactor(),
          r: ($scope.controls.weekendSlider.value + 2) * 2
        });
      }
      // }
      $scope.data.push(end);
    }

    function randomScalingFactor() {
      return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    }

    var refreshCharts = function () {
      createChart();
      generateLineChart();
    };

    $scope.moneyChart = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      data: [[]],
      series: ['Money Spent']
      // data: [
      //   [65, 59, 80, 81, 56, 55, 40],
      //   [28, 48, 40, 19, 86, 27, 90]],
      // series: ['Series A', 'Series B'],
      // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    };

    var generateLineChart = function () {
      var runningTotal = 0;
      var data = [];
      for (var i = 0; i < 4; i++) {//Four Weeks
        for (var j = 0; j < 4; j++) {//Four Weekdays
          if (j < $scope.controls.weekdayBttns) {
            runningTotal += $scope.money.day;
          }
          data.push(runningTotal);
        }
        for (var k = 0; k < 3; k++) {//Three Weekend days
          if (k < $scope.controls.weekendBttns) {
            runningTotal += $scope.money.end;
          }
          data.push(runningTotal);
        }
      }
      $scope.moneyChart.data = [data];
    };
    refreshCharts();
  }]);
