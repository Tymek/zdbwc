const Style: React.FunctionComponent = () => (
	<style global jsx>{`
		:root {
			--white: #ffffff;
			--light: hsla(0, 0%, 90%, 1);
			--black: hsla(0, 0%, 10%, 0.9);
			--accent: #009ed1;
			--dark: #041A33;
			--accent-darken: hsl(195, 100%, 31%);
			--accent-lighten: hsl(195, 100%, 61%);
			--spacing: 0.5rem;

			--font: Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
				Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

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
			font-family: var(--font);
			font-weight: 300;
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
			background: var(--accent);
		}
		*::selection {
			color: var(--light);
			background: var(--accent);
		}

		a {
			color: var(--accent);
			transition: all 150ms ease-out;
		}

		a:hover,
		a:focus {
			color: var(--accent-lighten);
		}

		a:visited {
			color: var(--accent-darken);
		}


		/* Framework-specific configuration */

		#__next {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
		}

	`}
	</style>
)

export default Style
