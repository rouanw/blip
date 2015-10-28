'use strict';

angular.module('blipApp')
  .directive('person', function (Person) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/person.html',
      controller: function ($scope) {
        $scope.person = Person.get();
        $scope.hasEnoughSkillsForRadar = function (assessment) {
          var mostRecentRating = assessment.ratings[assessment.ratings.length - 1];
          return Object.keys(mostRecentRating).length > 2;
        }
      }
    };
  });
