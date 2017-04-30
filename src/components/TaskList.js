import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import {propType} from 'graphql-anywhere'
import Task from './Task'

export default function TaskList (props) {
  const {tasks, onSnoozeTask, onPinTask} = props
  const events = {
    onSnoozeTask,
    onPinTask
  }

  return (
    <div className='list-items'>
      {tasks.map(task => <Task key={task.id} task={task} {...events} />)}
    </div>
  )
}

// I have to understand how TaskList fragment accepts Task fragment
TaskList.fragments = {
  task: gql`
    fragment TaskListFragment on Task {
      id
      updatedAt
      ...TaskFragment
    }
    ${Task.fragments.task}
  `
}

const {func, arrayOf} = PropTypes

TaskList.propTypes = {
  tasks: arrayOf(propType(Task.fragments.task)).isRequired,
  onSnoozeTask: func,
  onPinTask: func
}
