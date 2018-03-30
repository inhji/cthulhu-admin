import { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import HabitChart from 'Components/habits/HabitChart'
import HabitMeta from 'Components/habits/HabitMeta'

class ListHabits extends Component {
  render () {
    if (this.props.data.loading) {
      return <div>loading...</div>
    }

    return (
      <div className="habits tiles is-ancestor">
        {this.props.data.habits.map(habit => (
          <div className="habit tile is-parent" key={habit.id}>
            <div className="tile is-child">
              <HabitMeta habit={habit} refetch={this.props.data.refetch} />
            </div>
            <div className="tile is-child">
              <HabitChart habit={habit} />
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const allHabits = gql`
  query allHabits {
    habits {
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

export default graphql(allHabits)(ListHabits)
