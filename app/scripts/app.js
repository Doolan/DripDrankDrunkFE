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
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'chart.js',
    'rzModule',
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {//, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $urlRouterProvider.when('/user', '/user/history');
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('user', {
        url: '/user',
        abstract: true,
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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        abstract: false,
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      });
  });
