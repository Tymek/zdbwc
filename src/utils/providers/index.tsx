import React, { FunctionComponent } from 'react'
import GraphQLProvider from './GraphQL'

const Providers:FunctionComponent = ({ children }) => (
  <>
    <GraphQLProvider>
      {children}
    </GraphQLProvider>
  </>
)

export default Providers
