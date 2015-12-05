'use strict';

angular.module('blipApp')
  .directive('signIn', function ($http, $rootScope, Person, $cookies, Config) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/sign-in.html',
      controller: function ($scope) {
        $scope.signIn = function (provider) {
          var authUrl = Config.apiUrl + '/auth/' + provider;
          $rootScope.authenticating = true;
          $http.get(authUrl).then(function (result) {
            var remote = require('remote');
            var BrowserWindow = remote.require('browser-window');
            var authWindow = new BrowserWindow({ width: 800, height: 600, 'node-integration': false, title: 'Sign in to Blip' });
            authWindow.loadUrl(authUrl);

            authWindow.webContents.on('did-get-response-details', function (event, status, newUrl) {
              authWindow.webContents.session.cookies.get({}, function(error, cookies) {
                _.forEach(cookies, function (cookie) {
                  if (cookie.name === 'blipsession') {
                    $cookies.put(cookie.name, cookie.value);
                  }
                });
              });
              if (newUrl.indexOf('/auth/' + provider + '/callback') > -1) {
                $rootScope.unauthenticated = false;
                authWindow.close();
              }
            });

            authWindow.on('closed', function () {
              $rootScope.authenticating = false;
              $rootScope.$digest();
            });
          });
        };
      }
    };
  });
