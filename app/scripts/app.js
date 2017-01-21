'use strict';

/**
 * @ngdoc overview
 * @name dripdrankdrunkApp
 * @description
 * # dripdrankdrunkApp
 *
 * Main module of the application.
 */
angular
  .module('dripdrankdrunkApp', [
    'DataManager',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'chart.js',
    'rzModule',
    'ngTouch'
  ])
  .run(function ($state, $rootScope) {
    $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {
      if (angular.isObject(error) && angular.isString(error.code)) {
        switch (error.code) {
          case 'NOT_AUTH':
            // go to the login page
            $state.go('home');
            break;
          case 'ALREADY_AUTH':
            //go to the dash board
            $state.go('user.history');
            break;
          default:
            // set the error object on the error state and go there
            $state.get('error').error = error;
            $state.go('error');
        }
      }
      else {
        // unexpected error
        $state.go('techpoint.login');
      }
    });
  })
  .config(function ($stateProvider, $urlRouterProvider) {//, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $urlRouterProvider.when('/user', '/user/history');

    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('user', {
        url: '/user',
        abstract: true,
        resolve: {
          security: ['$q', function ($q) {
            if (!hasAccess()) {
              return $q.reject({ code: 'NOT_AUTH' });
            }
          }]
        },
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .state('user.history', {
        url: '/history',
        abstract: false,
        templateUrl: 'views/history.html',
        controller: 'HistoryCtrl',
        controllerAs: 'history'
      })
      .state('user.day', {
        url: '/day/:month/:day/:year',
        abstract: false,
        templateUrl: 'views/day.html',
        controller: 'DayCtrl',
        controllerAs: 'day'
      })
      .state('user.habits', {
        url: '/habits',
        templateUrl: 'views/habits.html',
        controller: 'HabitsCtrl',
        controllerAs: 'habits'
      })
      .state('user.settings', {
        url: '/settings',
        abstract: false,
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings'
      })
      .state('home', {
        url: '/',
        abstract: false,
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        resolve: {
          security: ['$q', function ($q) {
            if (hasAccess()) {
              return $q.reject({ code: 'ALREADY_AUTH' });
            }
          }]
        },
      })

  });
