import { FunctionComponent } from 'react'

const Style: FunctionComponent = () => (
	<style global jsx>{`
		:root {
			--background: hsla(0, 0%, 90%, 1);
			--foreground: hsla(0, 0%, 10%, 0.9);
			--accent: #009ed1;
			--dark-background: #041A33;
			--accent-darken: hsl(195, 100%, 31%);
			--accent-lighten: hsl(195, 100%, 61%);

			--font: Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
				Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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
			background: var(--background);
			color: var(--foreground);
			font-family: var(--font);
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
		}


		/* Customization */

		*::-moz-selection {
			color: var(--background);
			background: var(--accent);
		}
		*::selection {
			color: var(--background);
			background: var(--accent);
		}

		a[href] {
			color: var(--accent);
		}

		a[href]:hover,
		a[href]:focus {
			color: var(--accent-lighten);
		}

		a[href]:visited {
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
