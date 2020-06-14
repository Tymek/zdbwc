import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Providers from '../utils/providers'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Providers>
    <Head>
      <title key="title">ZDBWC</title>
    </Head>
    <Component {...pageProps} />
  </Providers>
)

export default MyApp
