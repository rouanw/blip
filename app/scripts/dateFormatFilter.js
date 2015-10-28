'use strict';

angular.module('blipApp')
  .filter('dateFormat', function() {
    return function (date) {
      return moment(date).format('Do MMMM YYYY');
    };
  });
