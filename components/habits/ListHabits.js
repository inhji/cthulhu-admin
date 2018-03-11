import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import HabitChart from 'Components/habits/HabitChart'
import timeago from 'Lib/timeago'
import _ from 'lodash'

const ListHabits = ({ data: { loading, habits } }) =>
  loading ? (
    <div>loading...</div>
  ) : (
    <div className="habits tiles is-ancestor">
      {habits.map(habit => (
        <div className="habit tile is-parent">
          <div className="tile is-child">
            <h2 className="is-size-3">{habit.name}</h2>

            <ul>
              <li>description: {habit.description}</li>
              <li>last updated: {timeago(_.last(habit.logs))}</li>
            </ul>
          </div>
          <div className="tile is-child">
            <HabitChart habit={habit} />
          </div>
        </div>
      ))}
    </div>
  )

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
