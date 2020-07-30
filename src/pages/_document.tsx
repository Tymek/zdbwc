import Document, {
	Html,
	Main,
	Head,
	NextScript,
	// DocumentContext,
	// DocumentInitialProps,
} from 'next/document'
import { primary } from 'utils/theme.json' // eslint-disable-line import/extensions

export const lang = 'pl'

class MyDocument extends Document {
	// static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
	// 	const initialProps = await Document.getInitialProps(ctx)
	// 	return { ...initialProps }
	// }

	render(): JSX.Element {
		return (
			<Html lang={lang}>
				<Head>
					<meta name="apple-mobile-web-app-title" content="zdbwc" />
					<meta name="application-name" content="zdbwc" />

					<meta name="description" content="Konferencja Zdobywcy" />

					{/* Colors */}
					<meta name="theme-color" content={primary} />
					<meta name="msapplication-TileColor" content={primary} />

					{/* Icons */}
					<link rel="icon" type="image/png" href="/static/icons/favicon.png" sizes="32x32" />
					<link rel="icon" type="image/png" href="/static/icons/android-chrome-196x196.png" sizes="196x196" />
					<link rel="apple-touch-icon" href="/static/icons/apple-touch-icon.png" />
					<link rel="apple-touch-icon" href="/static/icons/apple-touch-icon-152x152.png" sizes="152x152" />
					<link rel="apple-touch-icon" href="/static/icons/apple-touch-icon-167x167.png" sizes="167x167" />
					<link rel="apple-touch-icon" href="/static/icons/apple-touch-icon-180x180.png" sizes="180x180" />
					<link rel="icon" href="/favicon.ico" />
					<link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color={primary} />
					<meta name="msapplication-TileImage" content="/static/icons/mstile-144x144.png" />

					{/* Config manifests */}
					<link rel="manifest" href="/static/config/pwa.webmanifest" />
					<meta name="msapplication-config" content="/static/config/browserconfig.xml" />

					{/* Fonts */}
					<link
						rel="preload"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
						href="/static/fonts/roboto-300.woff2"
					/>
					<link
						rel="preload"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
						href="/static/fonts/roboto-500.woff2"
					/>
					<link
						rel="preload"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
						href="/static/fonts/roboto_mono-300.woff2"
					/>

					{/* TODO: https://github.com/shadowwalker/next-pwa#step-3-add-head-meta-example */}
				</Head>
				<body>
					<Main />
					<NextScript />
					<noscript>
						<p>Ta strona wymaga obsługi JavaScriptu.</p>
						<p>Alternatywnie, <span lang="en">GraphQL API introspection</span> z wiersza poleceń. 🤓</p>
						<code>
							curl -X POST https://api.zdbwc.scrlk.pl/v1/graphql
							{' -H \'Content-Type: application/json; charset=utf-8\''}
							{' --data \'{ "query": "{__type(name:\\"session\\"){fields{name}}}" }\''}
						</code>
					</noscript>
				</body>
			</Html>
		)
	}
}

export default MyDocument
