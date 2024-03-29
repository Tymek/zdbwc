import { AppProps } from 'next/app'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Provider as GraphQLProvider } from 'utils/graphql'
import Layout from 'components/Layout'
import { pathOr } from 'ramda'
import Analytics from 'components/Analytics'
import 'components/styles/fonts.scss'
import 'core-js/features/array/flat-map'

const ServiceWorker = dynamic(() => import(/* webpackChunk sw-client */ 'components/ServiceWorker'), { ssr: false })

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
	<>
		<Head>
			<title key="title">Konferencja Zdobywcy</title>
		</Head>
		<GraphQLProvider pageProps={pageProps}>
			{
				pathOr(true, ['defaultLayout'], pageProps) ? (
					<Layout>
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
