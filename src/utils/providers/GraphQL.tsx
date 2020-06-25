import React, { FunctionComponent } from 'react'
import fetch from 'isomorphic-unfetch'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloProvider } from '@apollo/react-hooks'

const uri = typeof window === 'undefined' ?
  'http://hasura:8080/v1/graphql' :
  'http://localhost:8080/v1/graphql'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(
      ({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${String(locations)}, Path: ${String(path)}`)
    )
  if (networkError)
    console.log(`[Network error]: ${String(networkError)}`)
})

const httpLink = createHttpLink({
  fetch,
  uri,
  credentials: 'include',
})

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
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
