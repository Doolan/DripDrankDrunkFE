/**
 * Created by Steven on 2/20/2016.
 */
(function () {
    var app = angular.module('DataManager', []);

    var host = "http://23.99.27.197:5000/";
    var token = getToken('auth-token');
    app.service('AuthService', ['$http', function ($http) {
        var self = this;

        self.login = function (username, password, callback) {
            var pkt = { email: username, password: password };
            $http({
                method: 'POST',
                url: host + "login",
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                }
            }).then(function (data) {
                console.log('SUCCESS - login', data.data, data.data.access_token);
                setToken('auth-token', 'Bearer ' + data.data.access_token);
                $http.defaults.headers.common.Authorization = 'Bearer ' + data.data.access_token;
                token = 'Bearer ' + data.data.access_token;
                callback(data.data.access_token);
            }, function errorCallback(response) {
                console.log('error occured: ', response);
                callback('', response);
                //UPDATE STUFF FOR INCORRECT USER NAME PASSWORD VS SERVER ERROR
            });
        };
    }]);

    app.service('DataService', ['$http', '$state', function ($http, $state) {
        var self = this;

        self.getWeekly = function (y, m, d, callback) {
            var pkt = { startDate: y + ',' + m + ',' + d };
            $http({
                method: 'POST',
                url: host + "getWeekData",
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': token
                }
            }).then(function (response) {
                callback(response.data);
            });
        };

        self.getDay = function (y, m, d, callback) {
            var pkt = { date: y + '/' + m + '/' + d };
            $http({
                method: 'POST',
                url: host + "getTonight",
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': token
                }
            }).then(function (response) {
                callback(response.data.drinkBreakdown);
            });
        };

        self.getBio = function (callback) {
            $http({
                method: 'GET',
                url: host + "getBio",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': token
                }
            }).then(function (response) {
                callback(response.data);
            });
        };

        self.newUser = function (username, pwd) {
            var pkt = { email: username, password: pwd };
            $http({
                method: 'POST',
                url: host + "newUser",
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                }
            }).then(function (response) {
                setToken('auth-token', response.data.access_token);
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token;
                token = 'Bearer ' + response.data.access_token;
                $state.go('user.settings');
            }, function errorCallback(response) {
                console.log('error occured: ', response);
                callback('', response);
            });
        };

        self.setUserData = function (name, sex, age, height, weight) {
            var pkt = { dateofbirth: age, name: name, sex: sex, height: height, weight: weight };
            $http({
                method: 'POST',
                url: host + "setUserData",
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': token
                }
            }).then(function(response){
                $state.go('user.history');
            });
        };
    }]);
})();

