'use strict';

angular.module('blipApp')
  .directive('editPerson', function (Person, $window) {
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
          var scores = {};
          if (assessment.ratings.length > 0) {
            scores = _.mapValues(_.last(assessment.ratings).scores, function () {
              return undefined;
            });
          }
          assessment.ratings.push({
            ratedAt: moment().format(),
            scores: scores
          });
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
        $scope.discardChanges = function () {
          $window.location.reload();
        };
      }
    };
  });
