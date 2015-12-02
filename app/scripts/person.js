'use strict';

angular.module('blipApp')
  .factory('Person', function ($http, $q, $rootScope) {
    return {
      get: function () {
        return $http({url: 'http://localhost:5000/person', method: 'GET', withCredentials: true}).then(function (result) {
          if (result.data.uid) {
            return result.data;
          }
          $rootScope.unauthenticated = true;
          return;
        });
      },
      save: function (person) {
        $http({
          url: 'http://localhost:5000/assessments',
          method: 'PUT',
          withCredentials: true,
          data: person.assessments
        });
      }
    };
  });
