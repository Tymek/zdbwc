const GlobalStyle: React.FC = () => (
	<style global jsx>{`
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
			overflow-y: scroll;
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

export default GlobalStyle
