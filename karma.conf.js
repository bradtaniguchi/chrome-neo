// Karma configuration
// Generated on Thu Feb 09 2017 07:05:56 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({
    client: {
      captureConsole : true
    },
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './bower_components/angular/angular.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/moment/moment.js',
      './bower_components/angular-moment/angular-moment.js',
      './bower_components/angular-material/angular-material.js',
      './bower_components/angular-localforage/dist/angular-localForage.js',
      './bower_components/chart.js/dist/Chart.bundle.js',
      './bower_components/angular-chart.js/dist/angular-chart.js',
      './bower_components/angular-material/angular-material.js',
      './bower_components/angular-messages/angular-messages.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-aria/angular-aria.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './dist/app.js', //get all normal files
      './test/**/*.js' //get the test files
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
