import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import HabitChart from 'Components/habits/HabitChart'
import HabitMeta from 'Components/habits/HabitMeta'

const ListHabits = ({ data: { loading, habits } }) =>
  loading ? (
    <div>loading...</div>
  ) : (
    <div className="habits tiles is-ancestor">
      {habits.map(habit => (
        <div className="habit tile is-parent" key={habit.id}>
          <div className="tile is-child">
            <HabitMeta habit={habit} />
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
