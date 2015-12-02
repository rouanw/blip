'use strict';

angular.module('blipApp')
  .directive('signIn', function ($http, $rootScope, Person, $cookies) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/sign-in.html',
      controller: function ($scope) {
        var authWindow;
        $rootScope.$on('loggedin', function () {
          console.log('logged in');
          $rootScope.$digest();
        });

        $scope.signIn = function () {
          $scope.authenticating = true;
          $http.get('http://localhost:5000/auth/twitter').then(function (result) {
            if (result.data.uid) {
                Person.set(result.data);
                $rootScope.authenticated = true;
            } else {
                var remote = require('remote');
                var BrowserWindow = remote.require('browser-window');
                authWindow = new BrowserWindow({ width: 800, height: 600, 'node-integration': false });
                authWindow.openDevTools();
                authWindow.loadUrl('http://localhost:5000/auth/twitter');
                authWindow.webContents.on('did-stop-loading', function () {
                  authWindow.webContents.session.cookies.get({},
                      function(error, cookies) {
                        _.forEach(cookies, function (cookie) {
                          if (cookie.name === 'blipsession') {
                            $cookies.put(cookie.name, cookie.value);
                          }
                        });
                  });
                });
                authWindow.on('closed', function() {
                  authWindow = null;
                  var $body = angular.element(document.body);
                  var $rootScope = $body.injector().get('$rootScope')
                  $rootScope.$emit('loggedin');
                  $scope.authenticating = false;
                });
            }
          });
        };
      }
    };
  });
