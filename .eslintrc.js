module.exports = {
	root: true,
	extends: '@scrlk',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	rules: {
		'import/no-extraneous-dependencies': ['warn', {
			'devDependencies': [
				'**/*.spec.ts',
				'**/*.spec.tsx',
				'./*.ts',
				'./*.js',
				'./src/utils/test/**/*',
			],
		}],
		'react/static-property-placement': ['off'],
		'@typescript-eslint/no-unsafe-assignment': ['off'],
		// 'react/jsx-closing-tag-location': ['off'], // for <style> tag
	},
}
