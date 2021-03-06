'use strict';

angular.module('blipApp')
  .directive('person', function (Person, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/person.html',
      controller: function ($scope) {
        Person.get().then(function (person) {
          $scope.person = person;
        });
        $scope.hasEnoughSkillsForRadar = function (assessment) {
          if (!assessment.ratings) {
            return false;
          }
          var mostRecentScores = assessment.ratings[assessment.ratings.length - 1].scores;
          return Object.keys(mostRecentScores).length > 2;
        };
      }
    };
  });
