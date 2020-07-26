// HACK: @see https://github.com/thysultan/stylis.js/issues/234
const light = 'local("Roboto"), url("/static/fonts/roboto-light.woff2") format("woff2")'
const medium = 'local("Roboto"), url("/static/fonts/roboto-medium.woff2") format("woff2")'
const mono = 'local("Roboto Mono"), url("/static/fonts/roboto-mono-light.woff2") format("woff2")'

const Style: React.FC = () => (
	<style global jsx>{`
		@font-face {
			font-family: Roboto;
			font-weight: 300;
			font-display: swap;
			src: ${light};
		}

		@font-face {
			font-family: Roboto;
			font-weight: 500;
			font-display: swap;
			src: ${medium};
		}

		@font-face {
			font-family: "Roboto Mono";
			font-weight: 300;
			font-display: swap;
			src: ${mono};
		}

	`}
	</style>
)

export default Style
