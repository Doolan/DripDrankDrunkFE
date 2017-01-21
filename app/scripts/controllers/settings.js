'use strict';

/**
 * @ngdoc function
 * @name dripdrankdrunkApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the dripdrankdrunkApp
 */
angular.module('dripdrankdrunkApp')
  .controller('SettingsCtrl', ['$scope', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var settingsPageSetup = function () {
      
    };

    //on scope load
    $scope.$on('$viewContentLoaded', function () {
      settingsPageSetup();
    });


  }]);
