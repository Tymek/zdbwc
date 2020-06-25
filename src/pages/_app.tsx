import React, { FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Providers from 'utils/providers'

const MyApp:FunctionComponent<AppProps> = ({ Component, pageProps }) => (
	<Providers>
		<Head>
			<title key="title">ZDBWC</title>
		</Head>
		<Component {...pageProps} />
	</Providers>
)

export default MyApp
