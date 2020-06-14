import * as React from 'react'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
})

import { ApolloProvider } from '@apollo/react-hooks'

const GraphqlProvider = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)

export default GraphqlProvider
