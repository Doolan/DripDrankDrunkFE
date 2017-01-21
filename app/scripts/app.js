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
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    // $urlRouterProvider.when('/instructor', '/instructor/TaNeeds');
    // $urlRouterProvider.when('/admin', '/admin/courseMap');
    // $urlRouterProvider.when('/student', '/student/apply/CSSE/201720');
    // .when('/user', {
    //   templateUrl: 'views/user.html',
    //   controller: 'UserCtrl',
    //   controllerAs: 'user'
    // })
    $urlRouterProvider.otherwise('/');
    $stateProvider
      // .state('login', {
      //   url: '/login',
      //   abstract: false,
      //   params: {
      //     'toState': '',
      //     'toParams': {}
      //   },
      //   controller: 'LoginController',
      //   templateUrl: 'modules/login/login.html',
      //   resolve: {
      //   }
      // })
      // .state('')
      .state('home', {
        url: '/',
        abstract: false,
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/',
        abstract: false,
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      });
  });
