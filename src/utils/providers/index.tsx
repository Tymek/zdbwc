import * as React from 'react'
import GraphQLProvider from './GraphQL'

const Providers = ({ children }) => (
  <>
    <GraphQLProvider>
      {children}
    </GraphQLProvider>
  </>
)

export default Providers
