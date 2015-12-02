'use strict';

angular.module('blipApp')
  .factory('Person', function ($http, $q) {
    var personFilePath = __dirname + '/person.json';
    var fs = require('fs');
    return {
      get: function () {
        return $http({url: 'http://localhost:5000/person', method: 'GET'}).then(function (result) {
          return result.data;
        });
      },
      save: function (person) {
        return fs.writeFileSync(personFilePath, angular.toJson(person, true));
      }
    };
  });
