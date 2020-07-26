import { AppProps } from 'next/app'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Provider as GraphQLProvider } from 'utils/graphql'
import Layout from 'components/Layout'
import StyleVariables from 'components/styles/Variables'
import GlobalStyle from 'components/styles/Global'
import Fonts from 'components/styles/Fonts'
import { pathOr } from 'ramda'
import Analytics from 'components/Analytics'
import { primary } from 'utils/theme.json' // eslint-disable-line import/extensions

const ServiceWorker = dynamic(() => import(/* webpackChunk sw-client */ 'components/ServiceWorker'), { ssr: false })

const Metadata: React.FC = () => (
	<Head>
		<title key="title">zdbwc</title>
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
		<link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="/static/fonts/roboto-light.woff2" />
		<link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="/static/fonts/roboto-medium.woff2" />
		<link
			rel="preload"
			as="font"
			type="font/woff2"
			crossOrigin="anonymous"
			href="/static/fonts/roboto-mono-light.woff2"
		/>

		{/* TODO: https://github.com/shadowwalker/next-pwa#step-3-add-head-meta-example */}
	</Head>
)

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
	<>
		<GraphQLProvider pageProps={pageProps}>
			<Metadata />
			{
				pathOr(true, ['defaultLayout'], pageProps) ? (
					<Layout>
						<StyleVariables />
						<GlobalStyle />
						<Fonts />
						<Component {...pageProps} />
					</Layout>
				) : (
					<Component {...pageProps} />
				)
			}
			<ServiceWorker />
		</GraphQLProvider>
		{
			pathOr(true, ['analytics'], pageProps) ? (
				<Analytics />
			) : null
		}
	</>
)

export default MyApp
