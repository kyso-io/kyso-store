// cucumber.js
let common = [
  '--require-module ts-node/register', // Load TypeScript module
  'test/features/**/*.feature', // Specify our feature files
  '--require test/step-definitions/**/*.ts', // Load step definitions
  '--format progress-bar', // Load custom formatter
  '--format html:./test-results/cucumber.html', // Load custom formatter
  '--format @cucumber/pretty-formatter',
].join(' ');

module.exports = {
  default: common,
};
