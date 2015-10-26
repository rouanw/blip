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
          data: _.values(latestRating),
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)'
        };

        var chartContent = {
          labels: Object.keys(latestRating),
          datasets: [dataset]
        };

        var ctx = elem[0].getContext('2d');
        scope.chart = new Chart(ctx).Radar(chartContent, {scaleShowLabels: true});
      }
    };
  });
