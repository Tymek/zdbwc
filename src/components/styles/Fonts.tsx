// HACK: @see https://github.com/thysultan/stylis.js/issues/234
const normal = 'local("Roboto"), url("/static/fonts/roboto-light.woff2") format("woff2")'
const bold = 'local("Roboto"), url("/static/fonts/roboto-bold.woff2") format("woff2")'
const mono = 'local("Roboto Mono"), url("/static/fonts/roboto-mono-light.woff2") format("woff2")'

const Style: React.FC = () => (
	<style global jsx>{`
		@font-face {
			font-family: Roboto;
			font-weight: 300;
			font-display: swap;
			src: ${normal};
		}

		@font-face {
			font-family: Roboto;
			font-weight: 700;
			font-display: swap;
			src: ${bold};
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
