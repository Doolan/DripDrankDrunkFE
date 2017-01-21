'use strict';

/**
 * @ngdoc function
 * @name dripdrankdrunkApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the dripdrankdrunkApp
 */
angular.module('dripdrankdrunkApp')
  .controller('UserCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.logout = function () {
      //  $cookies.remove('auth-token');
      clearTokens();
      $http.defaults.headers.common.Authorization = '';
      //$state.go('login');
      location.reload(true);//Hard reload clears cache and anything left behind
    };

  }]);
