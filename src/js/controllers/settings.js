'use strict';

/**
 * @ngdoc function
 * @name dripdrankdrunkApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the dripdrankdrunkApp
 */
angular.module('dripdrankdrunkApp')
  .controller('SettingsCtrl', ['$scope','DataService', function ($scope,DataService) {
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
          inline: true,
          onSuccess: function (event, fields) {
            //what happens when the form is filed in            
            if (event) {
              event.preventDefault();
            }
            var height = fields.feet*12 + fields.inches;
            DataService.setUserData(fields.name,fields.sex,fields.age,height,fields.weight);
            return false;

          }
      })
      ;

  }]);
