import React, { FunctionComponent, useMemo } from 'react'
import { ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import gqlClient from './client'

export const pagePropsKey = 'initialApolloState'

type PageProps = {
	[pagePropsKey]?: NormalizedCacheObject
}

const Provider:FunctionComponent<{pageProps: PageProps }> = ({ children, pageProps }) => {
	const initialState: NormalizedCacheObject | undefined = pageProps && pageProps[pagePropsKey]
	const client = useMemo(() => gqlClient(initialState), [initialState])

	return (
		<ApolloProvider client={client}>
			{children}
		</ApolloProvider>
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
