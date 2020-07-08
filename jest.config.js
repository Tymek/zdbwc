process.env.NODE_ENV = 'test'
process.env.TZ = 'Europe/Warsaw'

module.exports = {
	rootDir: '.',
	testEnvironment: 'jsdom',
	globals: {
		'ts-jest': {
			// https://github.com/zeit/next.js/issues/8663#issue-490553899
			tsConfig: './tsconfig.jest.json',
			babelConfig: true,
			diagnostics: false,
			packageJson: 'package.json',
		},
	},
	moduleDirectories: ['node_modules', 'src'],
	collectCoverageFrom: [
		'<rootDir>/src/**/*.{js,jsx,ts,tsx}',
		'!**/*.d.ts',
		'!**/node_modules/**',
		'!**/coverage/**',
		'!**/config/**',
		'!**/*.config.js',
		'!<rootDir>/src/utils/test/**/*',
		'!<rootDir>/src/generated/**/*', // codegen
	],
	setupFilesAfterEnv: [
		'<rootDir>/jest.setup.ts',
	],
	coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/index.tx',
		'\\.(css|less|scss|html)$': '<rootDir>/__mocks__/index.ts',
	},
	testPathIgnorePatterns: [
		'/node_modules/',
		'/.next/',
		'/src/utils/test/',
	],
	preset: 'ts-jest/presets/js-with-ts',
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
		// '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
	},
	transformIgnorePatterns: [
		'/node_modules/',
		'^.+\\.module\\.(css|sass|scss)$',
	],
	// moduleNameMapper: {
	//   '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
	// },
}
