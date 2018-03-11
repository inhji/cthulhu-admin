import Layout from 'Layout'
import EditHabit from 'Components/habits/EditHabit'
import withData from 'Lib/withData'

export default withData(({ url: { query: { id } } }) => (
  <Layout>
    <EditHabit id={id} />
  </Layout>
))
