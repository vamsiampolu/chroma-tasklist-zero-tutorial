import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Inbox from './Inbox'

function buildTask (attrs) {
  return {
    id: Math.round(Math.random() * 1000000).toString(),
    title: 'Test Task',
    subtitle: 'on Test Board',
    url: 'http://test.url',
    updatedAt: Date.now(),
    ...attrs
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

const onSnoozeTask = action('snooze task')
const onPinTask = action('pin task')
const events = {onPinTask, onSnoozeTask}

storiesOf('Inbox', module)
  .addDecorator(story => {
    return <div id='container'>{story()}</div>
  })
  .add('loading', () => {
    return <Inbox loading />
  })
  .add('error', () => {
    return <Inbox error={new Error('Foobar')} />
  })
  .add('no tasks', () => {
    return <Inbox pinnedTasks={[]} inboxTasks={[]} {...events} />
  })
  .add('no pinned tasks', () => {
    return <Inbox pinnedTasks={[]} inboxTasks={inboxTasks} {...events} />
  })
  .add('full', () => {
    const allProps = {pinnedTasks, inboxTasks, events}
    return <Inbox {...allProps} />
  })
