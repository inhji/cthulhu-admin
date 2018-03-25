import { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import timeago from 'Lib/timeago'
import Link from 'next/link'
import _ from 'lodash'

class HabitMeta extends Component {
  handleAdd = async () => {
    this.props
      .addHabitLog({ variables: { id: this.props.habit.id } })
      .then(r => console.log('res', r))
      .catch(e => console.log('err', e))
  }

  render () {
    const { id, name, logs, description } = this.props.habit

    return (
      <div>
        <h3 className="is-size-3">{name}</h3>

        <ul>
          <li>description: {description}</li>
          <li>last updated: {timeago(_.last(logs))}</li>
        </ul>

        <a className="button is-success" onClick={this.handleAdd}>
          Add one
        </a>

        <Link href={`/admin/habits/edit?id=${id}`} as={`/admin/habits/edit/${id}`}>
          <a className="button is-danger is-outlined is-pulled-right">Edit</a>
        </Link>
      </div>
    )
  }
}

const addHabitLog = gql`
  mutation AddHabitLog($id: ID!) {
    createHabitLog(id: $id) {
      id
    }
  }
`

export default graphql(addHabitLog, { name: 'addHabitLog' })(HabitMeta)
