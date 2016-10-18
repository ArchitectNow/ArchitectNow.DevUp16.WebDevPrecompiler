var helpers = require('./helpers');
var webpackConfig = require('./webpack.test');

module.exports = function (config) {
  var _config = {

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: helpers.root(),

    // Not including the plugin property means karma will load all plugins 
    // starting with karma-* from your node_modules folder 
    // plugins : [],
    
    /*
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine', 'source-map-support'],

    // list of files to exclude
    exclude: [],

    /*
     * list of files / patterns to load in the browser
     *
     * we are building the test environment in ./karma-test-shim.js
     */
    files: [
      {pattern: helpers.config('karma-test-shim.js'), watched: false}
    ],

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: {
      'Config/karma-test-shim.js': ['coverage', 'webpack', 'sourcemap'],
    },

    // Webpack Config at ./webpack.test.js
    webpack: webpackConfig,


    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        {type: 'text-summary', subdir: '.'},
        {type: 'json', subdir: '.'},
        {type: 'html', subdir: '.'}
      ]
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    // Webpack please don't spam the console when running in karma!
    webpackServer: {
      noInfo: true
    },


    /*
     * test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['mocha', 'coverage'],
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    /*
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: [
      'Chrome',
      // 'PhantomJS'
    ],

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: false
  };

  config.set(_config);
};
