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
          if (!assessment.ratings) {
            assessment.ratings = [];
          }
          assessment.ratings.push({});
        };
        $scope.addSkill = function (ratings, newRating) {
          ratings[newRating.key] = newRating.value;
          newRating.key = undefined;
          newRating.value = undefined;
        };
        $scope.addAssessment = function (person) {
          if (!person.assessments) {
            person.assessments = [];
          }
          person.assessments.push({});
        };
      }
    };
  });
