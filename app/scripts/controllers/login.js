'use strict';

/**
 * @ngdoc function
 * @name dripdrankdrunkApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dripdrankdrunkApp
 */
angular.module('dripdrankdrunkApp')
  .controller('LoginCtrl', ['$scope', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var loginPageSetup = function () {
      
    };

    //on scope load
    $scope.$on('$viewContentLoaded', function () {
        loginPageSetup();
    });
  }]);
