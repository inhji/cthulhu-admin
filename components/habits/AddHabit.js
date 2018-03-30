/* global localStorage */

import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Router from 'next/router'

class AddHabit extends Component {
  handleAdd = async e => {
    e.preventDefault()

    const authorId = localStorage.getItem('CTHULHU_USER_ID')

    const opts = {
      variables: {
        author: authorId,
        isGood: this.isGood.checked,
        days: 0,
        name: this.name.value,
        description: this.description.value,
        threshold: this.threshold.value
      }
    }

    try {
      await this.props.addHabit(opts)
      Router.push('/admin/habits')
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    return (
      <div>
        <h3 className="is-size-3">Add Habit</h3>

        <form className="form" onSubmit={this.handleAdd}>
          <div className="field">
            <label htmlFor="name" className="label">
              Name
            </label>
            <div className="control">
              <input type="text" className="input" ref={i => (this.name = i)} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="description" className="label">
              Description
            </label>
            <div className="control">
              <input type="text" className="input" ref={i => (this.description = i)} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="isGood" className="label">
              <input type="checkbox" ref={i => (this.isGood = i)} />
              Good Habit
            </label>
          </div>

          <div className="field">
            <label htmlFor="threshold" className="label">
              Threshold
            </label>
            <div className="control">
              <input type="number" className="input" ref={i => (this.threshold = i)} />
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

const addHabit = gql`
  mutation addHabit(
    $name: String!
    $description: String
    $isGood: Boolean!
    $threshold: Int!
    $days: Int!
    $author: ID!
  ) {
    createHabit(
      name: $name
      description: $description
      isGood: $isGood
      threshold: $threshold
      days: $days
      author: $author
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

export default graphql(addHabit, { name: 'addHabit' })(AddHabit)
