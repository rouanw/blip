'use strict';

angular.module('blipApp')
  .factory('Person', function ($http, $q, $rootScope, Config) {
    return {
      get: function () {
        return $http({url: Config.apiUrl + '/person', method: 'GET', withCredentials: true}).then(function (result) {
          if (result.data.uid) {
            return result.data;
          }
          $rootScope.unauthenticated = true;
          return;
        });
      },
      save: function (person) {
        return $http({
          url: Config.apiUrl + '/assessments',
          method: 'PUT',
          withCredentials: true,
          data: person.assessments
        });
      }
    };
  });
