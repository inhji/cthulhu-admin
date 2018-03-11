import ListHabits from 'Components/habits/ListHabits'
import withData from 'Lib/withData'
import Layout from 'Layout'

export default withData(() => (
  <Layout>
    <ListHabits />
  </Layout>
))
