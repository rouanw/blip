'use strict';

angular.module('blipApp')
  .directive('signIn', function ($http, $rootScope, Person, $cookies) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/sign-in.html',
      controller: function ($scope) {
        $scope.signIn = function (provider) {
          var authUrl = 'http://blip-api.herokuapp.com/auth/' + provider;
          $scope.authenticating = true;
          $http.get(authUrl).then(function (result) {
            var remote = require('remote');
            var BrowserWindow = remote.require('browser-window');
            var authWindow = new BrowserWindow({ width: 800, height: 600, 'node-integration': false, title: 'Sign in to Blip' });
            authWindow.loadUrl(authUrl);
            authWindow.webContents.on('did-stop-loading', function () {
              authWindow.webContents.session.cookies.get({}, function(error, cookies) {
                _.forEach(cookies, function (cookie) {
                  if (cookie.name === 'blipsession') {
                    $cookies.put(cookie.name, cookie.value);
                  }
                });
              });
            });
            authWindow.on('closed', function() {
              $rootScope.unauthenticated = false;
              $scope.authenticating = false;
              $rootScope.$digest();
            });
          });
        };
      }
    };
  });
