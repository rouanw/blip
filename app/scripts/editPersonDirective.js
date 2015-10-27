'use strict';

angular.module('blipApp')
  .directive('editPerson', function (Person) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/edit-person.html',
      controller: function ($scope) {
        $scope.person = Person.get();
        $scope.save = function (person) {
          Person.save(person);
        };
      }
    };
  });
