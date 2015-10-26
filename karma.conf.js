module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-touch/angular-touch.js',
      'app/bower_components/chartjs/Chart.js',
      'app/bower_components/moment/moment.js',
      'app/bower_components/lodash/lodash.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/scripts/**/*.js',
      'app/scripts/*.html',
      'test/require.js',
      'test/**/*Spec.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'app/scripts/*.html': 'ng-html2js'
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false,

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    }
  });
};
