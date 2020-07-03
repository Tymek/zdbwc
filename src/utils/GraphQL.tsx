import React, { FunctionComponent, useMemo } from 'react'
import isofetch from 'isomorphic-unfetch'
import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
	ApolloProvider,
	NormalizedCacheObject,
	HttpOptions,
	QueryOptions,
} from '@apollo/client'

const ssrMode = typeof window === 'undefined'
export const pagePropsKey = 'initialApolloState'

let uri = ssrMode
	? 'http://hasura:8080/v1/graphql'
	: 'http://localhost:8080/v1/graphql'

const httpLinkhttpLinkOptions: HttpOptions = {
	uri,
	credentials: 'include', // NOTE: 'same-origin'?
}

if (process.env.NODE_ENV === 'test') {
	uri = 'http://localhost:3000/graphql'
	httpLinkhttpLinkOptions.fetch = isofetch
}

let apolloClient: ApolloClient<NormalizedCacheObject>

export function gqlClient(initialState?: NormalizedCacheObject): ApolloClient<NormalizedCacheObject> {
	const client = apolloClient ?? new ApolloClient({
		ssrMode,
		link: ApolloLink.from([
			new HttpLink(httpLinkhttpLinkOptions),
		]),
		cache: new InMemoryCache(),
	})

	if (initialState) {
		client.cache.restore(initialState)
	}

	if (!ssrMode) {
		apolloClient = apolloClient ?? client
	}

	return client
}

type PageProps = {
	[pagePropsKey]?: NormalizedCacheObject
}

export const Provider:FunctionComponent<{pageProps: PageProps }> = ({ children, pageProps }) => {
	const initialState: NormalizedCacheObject | undefined = pageProps && pageProps[pagePropsKey]
	const client = useMemo(() => gqlClient(initialState), [initialState])

	return (
		<ApolloProvider client={client}>
			{children}
		</ApolloProvider>
	)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const precacheQuery = (query: QueryOptions<Record<string, any>>) => async (): Promise<any> => {
	const client = gqlClient()

	await client.query(query)

	return {
		props: {
			[pagePropsKey]: client.cache.extract(),
		},
		unstable_revalidate: 1,
	}
}
