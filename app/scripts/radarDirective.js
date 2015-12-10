'use strict';

angular.module('blipApp')
  .directive('radar', function () {
    var createDataSet = function (scores, solidColor, transparentColor) {
      return {
        data: _.values(scores),
        fillColor: transparentColor,
        strokeColor: solidColor,
        pointColor: solidColor,
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: solidColor
      };
    };
    return {
      restrict: 'A',
      scope: {
        assessment: '='
      },
      link: function (scope, elem) {
        var datasets = [];

        var latestScores = scope.assessment.ratings[scope.assessment.ratings.length - 1].scores;
        datasets.push(createDataSet(latestScores, 'rgba(151,187,205,1)', 'rgba(151,187,205,0.2)'));

        if (scope.assessment.ratings.length > 1) {
          var previousScores = scope.assessment.ratings[scope.assessment.ratings.length - 2].scores;
          if (_.isEqual(_.sortBy(_.keys(previousScores)), _.sortBy(_.keys(latestScores)))) {
            datasets.push(createDataSet(previousScores, 'rgba(220,220,220,1)', 'rgba(220,220,220,0.2)'));
          }
        }

        var chartContent = {
          labels: Object.keys(latestScores),
          datasets: datasets
        };

        var context = elem[0].getContext('2d');
        scope.chart = new Chart(context).Radar(chartContent, {scaleShowLabels: true});
      }
    };
  });
