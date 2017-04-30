import React from 'react'
import {Route} from 'react-router-dom'

import InboxScreen from './InboxScreen'

export default function App () {
  return (
    <div>
      <div id='content-container'>
        <Route exact pattern='/' component={InboxScreen} />
      </div>
    </div>
  )
}
