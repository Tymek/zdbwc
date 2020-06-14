import React, { FunctionComponent } from 'react'
import ApolloClient from 'apollo-boost'

import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
})

const GraphqlProvider:FunctionComponent = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)

export default GraphqlProvider
