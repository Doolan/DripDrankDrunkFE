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

    $('.ui.form')
      .form({
        fields: {
          name: {
            identifier: 'name',
            rules: [
              {
                type: 'empty',
                prompt: 'Please enter your name'
              }
            ]
          },
          sex: {
            identifier: 'sex',
            rules: [
              {
                type: 'empty',
                prompt: 'Please select a gender'
              }
            ]
          },
          age: {
            identifier: 'age',
            rules: [
              {
                type: 'integer[0..200]',
                prompt: 'Please enter your age'
              }
            ]
          },
          weight: {
            identifier: 'weight',
            rules: [
              {
                type: 'number',
                prompt: 'Please enter your weight as a valid number'
              },
              {
                type: 'empty',
                prompt: 'Please enter your weight as a valid number'
              }
            ]
          },
          feet: {
            identifier: 'feet',
            rules: [
              {
                type: 'empty',
                prompt: 'Please select your height in feet'
              }
            ]
          },
          inches: {
            identifier: 'inches',
            rules: [
              {
                type: 'empty',
                prompt: 'Please select your height in inches'
              }
            ]
          }
        },
        inline: true
      })
      ;

  }]);
