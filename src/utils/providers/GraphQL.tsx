import React, { FunctionComponent } from 'react'
import isofetch from 'isomorphic-unfetch'
import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
	ApolloProvider
} from '@apollo/client'

let uri = typeof window === 'undefined' ?
	'http://hasura:8080/v1/graphql' :
	'http://localhost:8080/v1/graphql'

if (process.env.NODE_ENV === 'test') {
	uri = 'http://localhost:3000/graphql'
}

const httpLink = new HttpLink({
	fetch: (...args) => process.env.NODE_ENV === 'test' ? fetch(...args) : isofetch(...args),
	uri,
	credentials: 'include',
})

const client = new ApolloClient({
	link: ApolloLink.from([
		// NOTE: errorLink,
		httpLink
	]),
	cache: new InMemoryCache()
})

const GraphqlProvider:FunctionComponent = ({ children }) => (
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>
)

export default GraphqlProvider
