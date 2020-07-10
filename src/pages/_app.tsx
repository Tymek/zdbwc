import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as GraphQLProvider } from 'utils/GraphQL'
import Layout from 'components/Layout'
import Style from 'components/Style'
import { pathOr } from 'ramda'

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => (
	<GraphQLProvider pageProps={pageProps}>
		<Head>
			<title key="title">zdbwc</title>
			<link rel="icon" href="/favicon.ico" />
			<link
				href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&amp;display=swap"
				rel="stylesheet"
			/>
			{/* TODO: local font */}
		</Head>
		{
			pathOr(true, ['defaultLayout'], pageProps) ? (
				<Layout>
					<Style />
					<Component {...pageProps} />
				</Layout>
			) : (
				<Component {...pageProps} />
			)
		}
	</GraphQLProvider>
)

export default MyApp
