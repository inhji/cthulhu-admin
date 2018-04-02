import Layout from 'Layout'
import EditPost from 'Components/posts/EditPost'
import withData from 'Lib/withData'

export default withData(({ url: { query: { id } } }) => (
  <Layout>
    <EditPost id={id} />
  </Layout>
))
