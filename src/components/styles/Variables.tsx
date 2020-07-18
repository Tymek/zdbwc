const StyleVariables: React.FC = () => (
	<style global jsx>{`
		:root {
			--white: #ffffff;
			--light: #f2f2f2;
			--black: #000000;
			--dark: #1a1a1a;
			--primary: #009ed1;
			--secondary: #f29146;
			--tertiary: #8bc751;
			--muted: #e6e6e6;
			--gray: #808080;
			--primary-darken: #00779e;
			--primary-lighten: #38cdff;
			--spacing: 0.5rem;
			--border-weight: 1px;

			--font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, "Fira Sans",
				"Droid Sans", "Helvetica Neue", Helvetica, sans-serif;
			--font-family-mono: "Roboto Mono", Consolas, monospace;
			--font-weight-thin: 200;
			--font-weight-light: 300;
			--font-weight-bold: 600;

			--border-radius: 0.1875rem;

			--box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.1);
		}
	`}
	</style>
)

export default StyleVariables
