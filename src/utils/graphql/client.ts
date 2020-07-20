import isofetch from 'isomorphic-unfetch'
import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client'
import { persistCache } from 'apollo-cache-persist'
import getEndpoint from './getEndpoint'
import resolvers, { typeDefs } from './resolvers'

const ssrMode = typeof window === 'undefined'

let uri = ssrMode
	? 'http://hasura:8080/v1/graphql'
	: getEndpoint(window.location.hostname)

if (process.env.NODE_ENV === 'test') {
	uri = 'http://localhost:3000/graphql'
}

let apolloClient: ApolloClient<NormalizedCacheObject>
const cache = new InMemoryCache()

const gqlClient = async (initialState?: NormalizedCacheObject): Promise<ApolloClient<NormalizedCacheObject>> => {
	if (!ssrMode) {
		await persistCache({
			cache,
			storage: window.localStorage,
			debug: process.env.DEBUG === 'true',
		} as unknown as Parameters<typeof persistCache>[0])
	}

	const client = apolloClient ?? new ApolloClient({
		ssrMode,
		link: ApolloLink.from([
			new HttpLink({
				uri,
				credentials: 'include', // NOTE: 'same-origin'?
				fetch: isofetch,
			}),
			// NOTE: error link?
		]),
		cache,
		typeDefs,
		resolvers,
	})

	if (initialState) {
		client.cache.restore(initialState)
	}

	if (!ssrMode) {
		apolloClient = apolloClient ?? client
	}

	return client
}

export default gqlClient
