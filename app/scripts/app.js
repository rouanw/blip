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
  .constant('Config', {
    apiUrl: 'http://blip-api.herokuapp.com'
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/view.html'
      })
      .when('/edit', {
        templateUrl: 'scripts/edit.html'
      });
  });
