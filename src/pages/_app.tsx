import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as GraphQLProvider } from 'utils/GraphQL'
import Layout from 'components/Layout'
import Style from 'components/Style'
import moment from 'moment'
import 'moment/locale/pl'

moment.locale('pl')

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => (
	<GraphQLProvider pageProps={pageProps}>
		<Head>
			<title key="title">zdbwc</title>
			<link rel="icon" href="/favicon.ico" />
			<link href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap" rel="stylesheet" />
			{/* TODO: local font */}
		</Head>
		<Layout>
			<Style />
			<Component {...pageProps} />
		</Layout>
	</GraphQLProvider>
)

export default MyApp
