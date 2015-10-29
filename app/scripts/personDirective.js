'use strict';

angular.module('blipApp')
  .directive('person', function (Person) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/person.html',
      controller: function ($scope) {
        $scope.person = Person.get();
        $scope.hasEnoughSkillsForRadar = function (assessment) {
          var mostRecentScores = assessment.ratings[assessment.ratings.length - 1].scores;
          return Object.keys(mostRecentScores).length > 2;
        }
      }
    };
  });