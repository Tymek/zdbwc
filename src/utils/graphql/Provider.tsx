import React, { FunctionComponent, useState, useEffect } from 'react'
import { ApolloProvider, NormalizedCacheObject, ApolloClient } from '@apollo/client'
import gqlClient from './client'

export const pagePropsKey = 'initialApolloState'

type PageProps = {
	[pagePropsKey]?: NormalizedCacheObject
}

const Provider:FunctionComponent<{pageProps: PageProps }> = ({ children, pageProps }) => {
	const initialState: NormalizedCacheObject | undefined = pageProps && pageProps[pagePropsKey]
	const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null)
	useEffect(() => {
		gqlClient(initialState).then(setClient).catch(() => setClient(null))
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const precacheQuery = (query: QueryOptions<Record<string, any>>) => async (): Promise<any> => {
// 	const client = gqlClient()
//
// 	await client.query(query)
//
// 	return {
// 		props: {
// 			[pagePropsKey]: client.cache.extract(),
// 		},
// 		unstable_revalidate: 1,
// 	}
// }
