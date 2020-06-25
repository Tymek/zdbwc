module.exports = {
	root: true,
	extends: '@scrlk',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname
	},
	plugins: ['import', 'jest-dom']
}
