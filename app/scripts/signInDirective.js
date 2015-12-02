'use strict';

angular.module('blipApp')
  .directive('signIn', function ($http, $rootScope, Person) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/sign-in.html',
      controller: function ($scope) {
        $scope.signIn = function () {
          $http.get('http://blip-api-staging.herokuapp.com/auth/github').then(function (result) {
            if (result.data._id) {
              Person.set(result.data);
              $rootScope.authenticated = true;
            } else {
              var remote = require('remote');
              var BrowserWindow = remote.require('browser-window');
              var authWindow = new BrowserWindow({ width: 800, height: 600, 'node-integration': false });
              authWindow.openDevTools();
              authWindow.loadUrl('http://blip-api-staging.herokuapp.com/auth/twitter');
            }
          });
        };
      }
    };
  });
