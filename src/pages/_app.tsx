import { AppProps } from 'next/app'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Provider as GraphQLProvider } from 'utils/graphql'
import Layout from 'components/Layout'
import StyleVariables from 'components/styles/Variables'
import GlobalStyle from 'components/styles/Global'
import Fonts from 'components/styles/Fonts'
import { pathOr } from 'ramda'

const ServiceWorker = dynamic(() => import(/* webpackChunk sw-client */ 'components/ServiceWorker'), { ssr: false })

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
	<GraphQLProvider pageProps={pageProps}>
		<Head>
			<title key="title">zdbwc</title>
			<meta name="description" content="Konferencja Zdobywcy" />
			<meta name="theme-color" content="#009ed1" />
			<link rel="icon" href="/favicon.ico" />
			<link rel="manifest" href="/pwa.webmanifest" />
		</Head>
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
)

export default MyApp
