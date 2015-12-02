'use strict';

angular.module('blipApp')
  .factory('Person', function ($http, $q) {
    var personFilePath = __dirname + '/person.json';
    var fs = require('fs');
    var _person;
    return {
      set: function (person) {
        _person = person;
        _person.name = person.info.name;
        console.log(_person);
      },
      get: function () {
        return _person;
      },
      save: function (person) {
        return fs.writeFileSync(personFilePath, angular.toJson(person, true));
      }
    };
  });
