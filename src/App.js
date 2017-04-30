import React, {Component} from 'react'
import ApolloClient, {createNetworkInterface} from 'apollo-client'
import {ApolloProvider} from 'react-apollo'
import {BrowserRouter} from 'react-router-dom'
import './App.css'

const {REACT_APP_API_HOST = 'http://localhost:3000'} = process.env
const networkInterface = createNetworkInterface({
  uri: `${REACT_APP_API_HOST}/graphql`
})
const client = new ApolloClient({networkInterface})

class App extends Component {
  render () {
    return <ApolloProvider client={client}><BrowserRouter /></ApolloProvider>
  }
}

export default App
