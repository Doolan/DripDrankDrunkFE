'use strict';

/**
 * @ngdoc function
 * @name dripdrankdrunkApp.controller:DayCtrl
 * @description
 * # DayCtrl
 * Controller of the dripdrankdrunkApp
 */
angular.module('dripdrankdrunkApp')
  .controller('DayCtrl', function ($scope, $stateParams) {
    console.log($stateParams.month, $stateParams.day, $stateParams.year);

    $scope.overview = {
      start: new Date(),
      end: new Date(),
      total: 0,
      startTime: moment()
    };

    var drinkData = {
      'person': 'Bob',
      '_id': '58837f98740342e3b68bcff7',
      'start': 'Tue Jan 05 2016 23:37:19 GMT-0500 (EST)',
      'drinks': [
        {
          'type': 'Shot',
          'time': 'Fri Jan 01 2016 01:21:09 GMT-0500 (EST)'
        },
        {
          'type': 'Mixed',
          'time': 'Fri Jan 01 2016 05:52:48 GMT-0500 (EST)'
        },
        {
          'type': 'Wine',
          'time': 'Fri Jan 01 2016 03:16:51 GMT-0500 (EST)'
        },
        {
          'type': 'Beer',
          'time': 'Fri Jan 01 2016 04:16:59 GMT-0500 (EST)'
        },
        {
          'type': 'Wine',
          'time': 'Fri Jan 01 2016 01:07:58 GMT-0500 (EST)'
        },
        {
          'type': 'Mixed',
          'time': 'Fri Jan 01 2016 03:59:23 GMT-0500 (EST)'
        },
        {
          'type': 'Beer',
          'time': 'Fri Jan 01 2016 03:27:56 GMT-0500 (EST)'
        },
        {
          'type': 'Shot',
          'time': 'Fri Jan 01 2016 02:11:10 GMT-0500 (EST)'
        },
        {
          'type': 'Wine',
          'time': 'Fri Jan 01 2016 04:50:12 GMT-0500 (EST)'
        },
        {
          'type': 'Wine',
          'time': 'Fri Jan 01 2016 03:00:15 GMT-0500 (EST)'
        },
        {
          'type': 'Mixed',
          'time': 'Fri Jan 01 2016 04:32:31 GMT-0500 (EST)'
        },
        {
          'type': 'Liquor',
          'time': 'Fri Jan 01 2016 02:04:41 GMT-0500 (EST)'
        }
      ]
    };

    var bodyData = {
      "height": 54,
      "weight": 180,
      "age": 24,
      "sex": "male"
    };

    var handleDrinkData = function (data) {
      var drinksArr = data.drinks.map(function (drink) {
        drink.time = moment(drink.time).add(-3, 'h');
        return drink;
      });
      drinksArr.sort(function (a, b) {
        if (a.time < b.time) {
          return -1;
        }
        else if (a.time === b.time) {
          return 0;
        } else {
          return 1;
        }
      });

      //Generate overview
      $scope.overview.start = drinksArr[0].time.format('dddd, h:mm a');
      $scope.overview.startTime = drinksArr[0].time;
      $scope.overview.end = drinksArr[drinksArr.length - 1].time.format('dddd, h:mm a');
      $scope.overview.total = drinksArr.length;

      //Generate Graph data
      generateScatter(drinksArr);
    };

    var bodyFactor = (bodyData.sex === 'male' ? 0.68 : 0.55) * bodyData.weight * 454;

    var generateScatter = function (drinks) {
        var residualBAC = 0.0;
        var pastTime = $scope.overview.startTime;
        var data = [];
        for(var i = 0; i< drinks.length; i ++){
          //calcuate bac for this point
          var bac = 14/bodyFactor * 100;
          //Account for residualBAC
          var timeOffset = drinks[i].time.diff(pastTime, 'hours',true);
          bac += Math.max(0, residualBAC - (timeOffset*0.015));
          var midBac = Math.max(0, residualBAC - ((timeOffset * (2/4))*0.015));

          var prevPoint = {
            x: drinks[i].time.diff($scope.overview.startTime, 'hours',true) - timeOffset/2,
            y:midBac
          };

          var point = {
            x: drinks[i].time.diff($scope.overview.startTime, 'hours',true),
            y: bac
          };
          
          residualBAC = bac;
          pastTime = drinks[i].time;
          data.push(prevPoint);          
          data.push(point);          
        }
        $scope.scatterData = data;
    };



    var chartSetup = function () {
      handleDrinkData(drinkData);
      var ctx = $('#BAC');
      $scope.scatterChart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Scatter Dataset',
            data:$scope.scatterData
          }]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }]
          }
        }
      });


    };
    chartSetup();
    
  });


