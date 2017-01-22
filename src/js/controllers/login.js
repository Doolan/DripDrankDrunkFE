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
                    onSuccess: function (event, fields) {
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



        //on scope load
        $scope.$on('$viewContentLoaded', function () {
            loginPageSetup();
        });


        var stopButtons = function () {
            $('.ui.button').addClass('disabled');
        };

        var freeButtons = function () {
            $('.ui.button').removeClass('disabled');
        };

        $scope.registerFunc = function () {
            DataService.newUser(fields.regusername, fields.regpassword);
        };

        $scope.register = function () {
            if(!$('#login').form('is valid'))
                return;
            stopButtons();
            var fields = $('#login').form('get values');
            DataService.newUser(fields.username, fields.password);
        };

        $scope.authenticate = function (fields) {
            if(!$('#login').form('is valid'))
                return;
            stopButtons();
            var fields = $('#login').form('get values');
            AuthService.login(fields.username, fields.password, function (token, err) {
                if (err) {
                    $('.ui.error.message').html(
                        '<ui class="list"><li>Invalid Username or Password</li></ui>').show();
                    freeButtons();
                } else {
                    $state.go('user.history');
                }
            });
        }
    }]);
