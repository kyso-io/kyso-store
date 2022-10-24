/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const currentDate = new Date();

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 70000,
  coverageDirectory: './test-results',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './test-results',
        filename: 'index.html',
        pageTitle: `Automatic Test Results. Execution: ${currentDate.toLocaleString()}`,
      },
    ],
  ],
};
