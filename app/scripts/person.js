'use strict';

angular.module('blipApp')
  .factory('Person', function ($http, $q, $rootScope) {
    var personFilePath = __dirname + '/person.json';
    var fs = require('fs');
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
        return fs.writeFileSync(personFilePath, angular.toJson(person, true));
      }
    };
  });
