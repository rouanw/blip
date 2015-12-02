'use strict';

require('electron-cookies');

angular
  .module('blipApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/view.html'
      })
      .when('/edit', {
        templateUrl: 'scripts/edit.html'
      });
  });
