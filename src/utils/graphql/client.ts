import isofetch from 'isomorphic-unfetch'
import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client'
// import { resolvers, typeDefs } from './resolvers'

const ssrMode = typeof window === 'undefined'

let uri = ssrMode
	? 'http://hasura:8080/v1/graphql'
	: `https://api.${window.location.hostname}/v1/graphql`

if (process.env.NODE_ENV === 'development' && !ssrMode) {
	uri = `http://${window.location.hostname}:8080/v1/graphql`
}

if (process.env.NODE_ENV === 'test') {
	uri = 'http://localhost:3000/graphql'
}

let apolloClient: ApolloClient<NormalizedCacheObject>
const cache = new InMemoryCache()

export default function gqlClient(initialState?: NormalizedCacheObject): ApolloClient<NormalizedCacheObject> {
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
		// typeDefs,
		// resolvers,
	})

	if (initialState) {
		client.cache.restore(initialState)
	}

	if (!ssrMode) {
		apolloClient = apolloClient ?? client
	}

	return client
}
