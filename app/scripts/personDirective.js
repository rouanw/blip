'use strict';

angular.module('blipApp')
  .directive('person', function (Person) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/person.html',
      controller: function ($scope) {
        $scope.person = Person.get();
      }
    };
  });
