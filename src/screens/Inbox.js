import React from 'react'
import PropTypes from 'prop-types'
import TaskList from '../components/TaskList'
import {propType} from 'graphql-anywhere'

export default function Inbox (props) {
  const {
    loading,
    error,
    pinnedTasks,
    inboxTasks,
    onSnoozeTask,
    onPinTask
  } = props
  const events = {onSnoozeTask, onPinTask}
  let title
  let lists = []
  if (loading) {
    title = 'Get the task, put in box'
  } else if (error) {
    title = error.toString()
  } else {
    title = 'Taskbox'
    if (pinnedTasks.length > 0) {
      lists = lists.concat([
        <h4 className='list-heading' key='pinned-title'>Important</h4>,
        <TaskList key='pinned-tasks' tasks={pinnedTasks} {...events} />
      ])
    }

    if (inboxTasks.length > 0) {
      lists = lists.concat([
        <h4 className='list-heading' key='inbox-title'>Tasks</h4>,
        <TaskList key='inbox-tasks' tasks={inboxTasks} {...events} />
      ])
    }
  }

  return (
    <div className='page lists-show'>
      <nav>
        <h3 className='js-edit-list title-page' style={{textAlign: 'center'}}>
          <span className='title-wrapper'>{title}</span>
        </h3>
      </nav>
      {lists.length &&
        <div
          className='content-scrollable list-items'
          style={{paddingTop: '48px'}}
        >
          {lists}
        </div>}
    </div>
  )
}

const {bool, object, func, arrayOf} = PropTypes

Inbox.propTypes = {
  loading: bool,
  error: object,
  inboxTasks: arrayOf(propType(TaskList.fragments.task)),
  pinnedTasks: arrayOf(propType(TaskList.fragments.task)),
  onSnoozeTask: func,
  onPinTask: func
}
