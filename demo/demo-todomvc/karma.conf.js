module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      { pattern: 'js/*.js' },
      { pattern: 'tests/*.js' }
    ],
    reporters: ['mocha'],
    browsers: ['ChromeHeadless'],
    failOnEmptyTestSuite: false
  });
};