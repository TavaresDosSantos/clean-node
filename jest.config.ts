export default {
  roots: ['./src'],
  collectCoverageFrom: ['./src/**/*.ts>'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
