import { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as GraphQLProvider } from 'utils/graphql'
import Layout from 'components/Layout'
import StyleVariables from 'components/styles/Variables'
import GlobalStyle from 'components/styles/Global'
import Fonts from 'components/styles/Fonts'
import { pathOr } from 'ramda'
import { register } from 'service/client'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	useEffect(() => {
		register((accept, version) => { // TODO: incorporate into notifications
			// eslint-disable-next-line no-alert, no-restricted-globals
			if (confirm(`${version ? `Wersja ${version}` : 'Nowa wersja'} jest dostępna. Zaktualizować teraz?`)) {
				void accept()
			}
		})
	}, [])

	return (
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
		</GraphQLProvider>
	)
}

export default MyApp
