const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/html/cucumber-html-report.html',
  reportSuiteAsScenarios: true,
  launchReport: false,
};

reporter.generate(options);
