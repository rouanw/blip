'use strict';

angular.module('blipApp')
  .factory('Person', function ($http, $q) {
    var personFilePath = __dirname + '/data/person.json';
    var fs = require('fs');
    return {
      get: function () {
        return JSON.parse(fs.readFileSync(personFilePath));
      },
      save: function (person) {
        return fs.writeFileSync(personFilePath, JSON.stringify(person));
      }
    };
  });
