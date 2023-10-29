module.exports = {
  displayName: 'api',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.(t|j)s'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.*\\.integration.spec\\.ts$',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', '<rootDir>/../tsconfig.json'],
  },
};
