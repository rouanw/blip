'use strict';

angular.module('blipApp')
  .directive('radar', function () {
    return {
      restrict: 'A',
      scope: {
        assessment: '='
      },
      link: function (scope, elem) {
        var latestRatingIndex = scope.assessment.ratings.length - 1;
        var latestRating = scope.assessment.ratings[latestRatingIndex];

        var dataset = {
          data: _.values(latestRating)
        };

        var chartContent = {
          labels: Object.keys(latestRating),
          datasets: [dataset]
        };

        new Chart(elem[0].getContext('2d'))
              .Radar(chartContent, {scaleShowLabels: true});
      }
    };
  });
