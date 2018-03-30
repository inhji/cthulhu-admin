import Layout from 'Layout'
import AddHabit from 'Components/habits/AddHabit'
import withData from 'Lib/withData'

export default withData(() => (
  <Layout>
    <AddHabit />
  </Layout>
))
