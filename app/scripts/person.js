'use strict';

angular.module('blipApp')
  .factory('Person', function ($http, $q, $rootScope) {
    return {
      get: function () {
        return $http({url: 'http://blip-api.herokuapp.com/person', method: 'GET', withCredentials: true}).then(function (result) {
          if (result.data.uid) {
            return result.data;
          }
          $rootScope.unauthenticated = true;
          return;
        });
      },
      save: function (person) {
        return $http({
          url: 'http://blip-api.herokuapp.com/assessments',
          method: 'PUT',
          withCredentials: true,
          data: person.assessments
        });
      }
    };
  });
