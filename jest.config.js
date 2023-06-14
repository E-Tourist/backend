const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig-common.json');

module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*-)(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleDirectories: ['node_modules'],
  resetMocks: true,
};
