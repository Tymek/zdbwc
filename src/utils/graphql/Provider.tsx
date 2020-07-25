import React, { FunctionComponent, useState, useEffect } from 'react'
import { ApolloProvider, NormalizedCacheObject, ApolloClient } from '@apollo/client'
import gqlClient from './client'

export const pagePropsKey = 'initialApolloState'

export type PageProps = {
	[pagePropsKey]?: NormalizedCacheObject
}

const Provider:FunctionComponent<{pageProps: PageProps }> = ({ children, pageProps }) => {
	const initialState: NormalizedCacheObject | undefined = pageProps && pageProps[pagePropsKey]
	const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null)
	const removeClient = () => setClient(null)

	useEffect(() => {
		gqlClient(initialState)
			.then(setClient)
			.catch(removeClient)
	}, [initialState])

	return (
		<>
			{ client && (
				<ApolloProvider client={client}>
					{children}
				</ApolloProvider>
			)}
		</>
	)
}

export default Provider
