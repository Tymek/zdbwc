import { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as GraphQLProvider } from 'utils/graphql'
import Layout from 'components/Layout'
import Style from 'components/Style'
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
				<link rel="icon" href="/favicon.ico" />
				<link
					href={`${
						'https://fonts.googleapis.com/css2?'
					}${
						'family=Roboto:wght@300;700&'
					}${
						'family=Roboto+Mono:wght@300&'
					}${
						'display=swap'
					}`}
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
}

export default MyApp
