import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Task from './Task'

function buildStory (attrs) {
  const task = {
    id: Math.round(Math.random() * 1000000).toString(),
    title: 'Test Task',
    subtitle: 'on Test Board',
    url: 'http://test.url',
    state: 'TASK_INBOX',
    updatedAt: Date.now(),
    ...attrs
  }
  const onPinTask = action('onPinTask')
  const onSnoozeTask = action('onSnoozeTask')

  return <Task {...{task, onPinTask, onSnoozeTask}} />
}

storiesOf('Task', module)
  .addDecorator(story => {
    return (
      <div className='list-items' style={{background: 'white'}}>{story()}</div>
    )
  })
  .add('inbox task', () => {
    return buildStory({
      state: 'TASK_INBOX'
    })
  })
  .add('snoozed task', () => {
    return buildStory({
      state: 'TASK_SNOOZED'
    })
  })
  .add('pinned task', () => {
    return buildStory({
      state: 'TASK_PINNED'
    })
  })
  .add('archived task', () => {
    return buildStory({
      state: 'TASK_ARCHIVED'
    })
  })
