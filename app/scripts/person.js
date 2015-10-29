'use strict';

angular.module('blipApp')
  .factory('Person', function ($http, $q) {
    var personFilePath = __dirname + '/person.json';
    var fs = require('fs');
    return {
      get: function () {
        try {
          var fileContents = fs.readFileSync(personFilePath);
          return JSON.parse(fileContents);
        } catch (error) {
          return {};
        }
      },
      save: function (person) {
        return fs.writeFileSync(personFilePath, angular.toJson(person, true));
      }
    };
  });
