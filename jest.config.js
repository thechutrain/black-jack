// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/__tests__/*.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
