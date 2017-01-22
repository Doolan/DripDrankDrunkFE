'use strict';

/**
 * @ngdoc function
 * @name dripdrankdrunkApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dripdrankdrunkApp
 */
angular.module('dripdrankdrunkApp')
  .controller('LoginCtrl', ['$scope', 'AuthService', '$state', 'DataService', function ($scope, AuthService, $state, DataService) {

    var loginPageSetup = function () {

      $('#login')
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
          onSuccess: function (event,fields) {
            if (event) {
              event.preventDefault();
            }
            return false;
          },
          onFailure: function (formErrors, fields) {
            return;
            
          }

        });
    };

    $scope.loginFunc = function () {
      $('#login').validate();
      authenticate(fields);
    }
    $scope.registerFunc = function () {
      DataService.newUser(fields.regusername, fields.regpassword);
    }


    //on scope load
    $scope.$on('$viewContentLoaded', function () {
      loginPageSetup();
    })





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
    }
  }]);
