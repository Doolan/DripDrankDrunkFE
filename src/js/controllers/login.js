'use strict';

/**
 * @ngdoc function
 * @name dripdrankdrunkApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dripdrankdrunkApp
 */
angular.module('dripdrankdrunkApp')
  .controller('LoginCtrl', ['$scope', 'AuthService', '$state', function ($scope, AuthService, $state) {
    var loginPageSetup = function () {
      $('.ui.form')
        .form({
          fields: {
            username: {
              identifier: 'username',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please enter your username'
                }
              ]
            },
            password: {
              identifier: 'password',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please enter your password'
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
            authenticate(fields);
            return false;

          },
          onFailure: function (formErrors, fields) {
            return; // What happens when the form is not filed out
          }
        });
    };

    //on scope load
    $scope.$on('$viewContentLoaded', function () {
      loginPageSetup();
    });





    var authenticate = function (fields) {
      $('.ui.login.button').addClass('disabled');
      AuthService.login(fields.username, fields.password, function (token, err) {
        if (err) {
          $('.ui.error.message').html(
            '<ui class="list"><li>Invalid Username or Password</li></ui>').show();
          $('.ui.login.button').removeClass('disabled');
        } else {
          $state.go('user.history');
        }
      });
    };
  }]);
