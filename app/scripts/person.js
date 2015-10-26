'use strict';

angular.module('blipApp')
  .factory('Person', function ($http, $q) {
    return {
      get: function () {
        var fs = require('fs');
        return fs.readFileSync(__dirname + 'data/person.json');
      }
    };
  });
