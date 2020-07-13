const Style: React.FC = () => (
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

		/* Reset */

		html {
			position: relative;
			height: 100%;
		}

		body {
			display: flex;
			flex-direction: column;
			position: relative;
			min-height: 100%;
			background: var(--light);
			color: var(--black);
			font-family: var(--font-family);
			font-weight: var(--font-weight-light);
		}

		html,
		body {
			padding: 0;
			margin: 0;
			scroll-behavior: smooth;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}

		* {
			box-sizing: border-box;
			-webkit-tap-highlight-color: rgba(0,0,0,0);
			-webkit-tap-highlight-color: transparent;
			-webkit-appearance: none;
		}


		/* Customization */

		*::-moz-selection {
			color: var(--light);
			background: var(--primary);
		}
		*::selection {
			color: var(--light);
			background: var(--primary);
		}

		a {
			color: var(--primary);
			transition: all 150ms ease-out;
		}

		a:hover,
		a:focus {
			color: var(--primary-lighten);
		}

		a:visited {
			color: var(--primary-darken);
		}


		/* Framework-specific configuration */

		#__next {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
		}

/* 
		input {
			border-radius: var(--border-radius);
			border: 1px solid var(--dark);
			line-height: 1.5em;
			font-size: 1em;
			padding: 0.25em 0.5em;
			box-shadow: none;
			font-family: inherit;
		}
	
		textarea {
			border-radius: var(--border-radius);
			border: 1px solid var(--dark);
			font-size: 1em;
			padding: 0.25em 0.5em;
			box-shadow: none;
			font-family: inherit;
		}

		button, input[type="submit"], input[type="reset"] {
			font-family: inherit;
			box-shadow: none;
			border: 1px solid var(--dark);
			border-radius: var(--border-radius);
			background: var(--dark);
			color: var(--white);
			box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.2);
			line-height: 1.5em;
			font-size: 1em;
			padding: 0.25em 0.5em;
			cursor: pointer;
		} */

	`}
	</style>
)

export default Style
