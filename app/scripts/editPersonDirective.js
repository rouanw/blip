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
        $scope.addRating = function (assessment) {
          assessment.ratings.push({});
        };
        $scope.addSkill = function (ratings, newRatingKey, newRatingValue) {
          ratings[newRatingKey] = newRatingValue;
        };
      }
    };
  });
