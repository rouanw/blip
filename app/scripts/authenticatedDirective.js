'use strict';

angular.module('blipApp')
  .directive('authenticated', function ($cookies) {
    return {
      restrict: 'A',
      controller: function ($scope) {
        $scope.authenticated = function () {
          return $cookies.get('blipsession');
        };
      }
    };
  });
