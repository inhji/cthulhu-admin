import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import Router from 'next/router'

class EditHabit extends Component {
  handleDelete = () => {}

  handleUpdate = async e => {
    e.preventDefault()

    const habit = this.props.data.habit

    const opts = {
      variables: {
        id: habit.id,
        isGood: habit.isGood,
        days: habit.days,
        name: this.name.value,
        description: this.description.value,
        threshold: this.threshold.value
      }
    }

    try {
      await this.props.updateHabit(opts)
      Router.push('/admin/habits')
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    const { loading, habit } = this.props.data
    return loading ? (
      <div>loading</div>
    ) : (
      <div>
        <h3 className="is-size-3">Edit Habit</h3>

        <form className="form" onSubmit={this.handleUpdate}>
          <div className="field">
            <label htmlFor="name" className="label">
              Name
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                defaultValue={habit.name}
                ref={i => (this.name = i)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="description" className="label">
              Description
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                defaultValue={habit.description}
                ref={i => (this.description = i)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="threshold" className="label">
              Threshold
            </label>
            <div className="control">
              <input
                type="number"
                className="input"
                defaultValue={habit.threshold}
                ref={i => (this.threshold = i)}
              />
            </div>
          </div>

          <div className="field is-pulled-right ">
            <div className="control">
              <button className="button is-danger" onClick={this.handleDelete}>
                Delete
              </button>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button is-text">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const habit = gql`
  query HabitQuery($id: ID!) {
    habit(id: $id) {
      id
      name
      description
      days
      isGood
      threshold
      logs
      author {
        id
        name
      }
    }
  }
`

export const updateHabit = gql`
  mutation UpdateHabit(
    $id: ID!
    $name: String!
    $description: String
    $isGood: Boolean!
    $threshold: Int!
    $days: Int!
  ) {
    updateHabit(
      id: $id
      name: $name
      description: $description
      isGood: $isGood
      threshold: $threshold
      days: $days
    ) {
      id
      name
      description
      days
      isGood
      threshold
      author {
        id
        name
      }
    }
  }
`

const deleteHabit = gql`
  mutation DeleteHabit($id: ID!) {
    deleteHabit(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(habit, {
    options: props => ({
      variables: {
        id: props.id
      }
    })
  }),
  graphql(updateHabit, { name: 'updateHabit' }),
  graphql(deleteHabit, { name: 'deleteHabit' })
)(EditHabit)
