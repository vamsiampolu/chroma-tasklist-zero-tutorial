import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools'
import {mockNetworkInterfaceWithSchema} from 'apollo-test-utils'
import ApolloClient from 'apollo-client'
import {ApolloProvider} from 'react-apollo'

import InboxScreen from './InboxScreen'
import typeDefs from '../schema'

const schema = makeExecutableSchema({typeDefs})

const mockTasks = {
  pinned: [],
  inbox: []
}

const mocks = {
  Query: () => {
    return {
      me: () => {
        return {
          tasks (_, {state}) {
            switch (state) {
              case 'TASK_PINNED':
                return mockTasks.pinned
              default:
                return mockTasks.inbox
            }
          }
        }
      }
    }
  },
  Mutation: () => {
    return {
      updateTask: action('updateTask')
    }
  }
}

addMockFunctionsToSchema({schema, mocks})
const mockNetworkInterface = mockNetworkInterfaceWithSchema({schema})
const client = new ApolloClient({networkInterface: mockNetworkInterface})

function MockedProvider ({children}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

function buildTask (attributes) {
  return {
    id: Math.round(Math.random() * 1000000).toString(),
    title: 'Test Task',
    subtitle: 'on Test Board',
    url: 'http://test.url',
    subtitle_url: 'http://test2.url',
    ...attributes
  }
}

const pinnedTasks = [
  buildTask({state: 'TASK_PINNED'}),
  buildTask({state: 'TASK_PINNED'}),
  buildTask({state: 'TASK_PINNED'})
]

const inboxTasks = [
  buildTask({state: 'TASK_INBOX'}),
  buildTask({state: 'TASK_INBOX'}),
  buildTask({state: 'TASK_INBOX'})
]

storiesOf('InboxScreen', module)
  .addDecorator(story => <MockedProvider>{story()}</MockedProvider>)
  .add('no data', () => {
    mockTasks.pinned = []
    mockTasks.inbox = []
    return <InboxScreen key='none' />
  })
  .add('only inbox', () => {
    mockTasks.inbox = inboxTasks
    mockTasks.pinned = []
    return <InboxScreen key='none' />
  })
  .add('only pinned', () => {
    mockTasks.pinned = pinnedTasks
    mockTasks.inbox = []
    return <InboxScreen key='pinned' />
  })
  .add('full data', () => {
    mockTasks.pinned = pinnedTasks
    mockTasks.inbox = inboxTasks
    return <InboxScreen key='none' />
  })
