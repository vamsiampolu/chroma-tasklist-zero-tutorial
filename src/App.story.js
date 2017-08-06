import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools'
import {mockNetworkInterfaceWithSchema} from 'apollo-test-utils'

import ApolloClient from 'apollo-client'
import {ApolloProvider} from 'react-apollo'
import {MemoryRouter} from 'react-router'

import App from './App'

const schema = makeExecutableSchema({schema})
const mocks = {
  Query: () => {},
  Mutation: () => {}
}

addMockFunctionsToSchema({schema, mocks})

const mockNetworkInterface = mockNetworkInterfaceWithSchema({schema})

const client = new ApolloClient({
  networkInterface: mockNetworkInterface
})

function MockProvider (props) {
  const {children, client} = props
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
