module.exports = {
  globals: {
    'ts-jest': {
      // https://github.com/zeit/next.js/issues/8663#issue-490553899
      tsConfig: 'tsconfig.jest.json',
    },
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/config/**',
    '!**/*.config.js',
  ],
  // setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],

  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest",
  //   '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  //   // '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
  // },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  // moduleNameMapper: {
  //   '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  // },
}
