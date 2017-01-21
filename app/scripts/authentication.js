'use strict';

var setToken = function(type, token) {
    sessionStorage.setItem(type, token);
};

var getToken = function(tokenName) {
    return sessionStorage.getItem(tokenName);
};

var removeToken = function(token) {
    sessionStorage.removeItem(token);
};

var clearTokens = function() {
    var tokenList = ['auth-token'];
    tokenList.forEach(function(token) {
        removeToken(token);
    });
};

var hasAccess = function() {
    var token = getToken('auth-token');
    if (!token) {
        return false;
    } else {
        return true;
    }
};

