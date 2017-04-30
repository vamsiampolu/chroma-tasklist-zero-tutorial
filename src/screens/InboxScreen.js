import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import Inbox from './Inbox'
import TaskList from '../components/TaskList'

const withData = graphql(
  gql`query InboxQuery {
    me {
      pinnedTasks: tasks(state: TASK_PINNED) {
        ...TaskListFragment
      }
      inboxTasks: tasks(state: TASK_INBOX) {
        ...TaskListFragment
      }
    }
  }
  ${TaskList.fragments.task}
  `,
  {
    options: {
      fetchPolicy: 'network-only',
      pollInterval: 10 * 1000
    },
    props ({data: {loading, error, me}}) {
      // similar to mapStateToProps
      if (loading) {
        return {loading}
      }

      if (error) {
        return {error}
      }

      const {pinnedTasks, inboxTasks} = me
      return {pinnedTasks, inboxTasks}
    }
  }
)

const withOnSnoozeTask = graphql(
  gql`
    mutation onSnoozeTaskMutation($taskId: ID!) {
      updateTask(id: $taskId, input: { state: TASK_SNOOZED }) {
        ...TaskListFragment
      }
    }
    ${TaskList.fragments.task}`,
  {
    refetchQueries: ['InboxQuery'],
    props: ({mutate}) => ({
      onSnoozeTask: taskId => mutate({variables: {taskId}})
    })
  }
)

export default withOnSnoozeTask(withData(Inbox))
