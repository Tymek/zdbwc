module.exports = {
	root: true,
	extends: '@scrlk',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	'ignorePatterns': ['src/generated/**/*'],
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
		'no-void': ['off'],
		'react/static-property-placement': ['off'],
		'@typescript-eslint/no-unsafe-assignment': ['off'],
		'jsx-a11y/anchor-is-valid': ['off'], // next/link
		'react/jsx-indent-props': ['warn', 'tab'],
		'no-multiple-empty-lines': ['warn', { max: 2 }],
		// 'react/jsx-closing-tag-location': ['off'], // for <style> tag
	},
}
