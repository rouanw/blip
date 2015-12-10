'use strict';

angular.module('blipApp')
  .directive('radar', function () {
    return {
      restrict: 'A',
      scope: {
        assessment: '='
      },
      link: function (scope, elem) {
        var datasets = [];

        var latestRatingIndex = scope.assessment.ratings.length - 1;
        var latestRating = scope.assessment.ratings[latestRatingIndex].scores;
        var latestDataset = {
          data: _.values(latestRating),
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)'
        };
        datasets.push(latestDataset);

        var previousRatingIndex = scope.assessment.ratings.length - 2;
        if (previousRatingIndex >= 0) {
          var previousRating = scope.assessment.ratings[previousRatingIndex].scores;
          var previousDataset = {
            data: _.values(previousRating),
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)'
          };
          datasets.push(previousDataset);
        }

        var chartContent = {
          labels: Object.keys(latestRating),
          datasets: datasets
        };

        var context = elem[0].getContext('2d');
        scope.chart = new Chart(context).Radar(chartContent, {scaleShowLabels: true});
      }
    };
  });
