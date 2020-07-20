import theme from 'utils/theme.json' // eslint-disable-line import/extensions

const StyleVariables: React.FC = () => (
	<style global jsx>{`
		:root {
			--white: ${theme.white};
			--light: ${theme.light};
			--black: ${theme.black};
			--dark: ${theme.dark};
			--primary: ${theme.primary};
			--secondary: ${theme.secondary};
			--tertiary: ${theme.tertiary};
			--muted: ${theme.muted};
			--gray: ${theme.gray};
			--primary-darken: ${theme['primary-darken']};
			--primary-lighten: ${theme['primary-lighten']};
			--spacing: ${theme.spacing};
			--border-weight: ${theme['border-weight']};

			--font-family: ${theme['font-family']};
				"Droid Sans", "Helvetica Neue", Helvetica, sans-serif;
			--font-family-mono: ${theme['font-family-mono']};
			--font-weight-thin: ${theme['font-weight-thin']};
			--font-weight-light: ${theme['font-weight-light']};
			--font-weight-bold: ${theme['font-weight-bold']};

			--border-radius: ${theme['border-radius']};

			--box-shadow: ${theme['box-shadow']};
		}
	`}
	</style>
)

export default StyleVariables
