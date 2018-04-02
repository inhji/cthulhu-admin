import ListPosts from 'Components/posts/ListPosts'
import withData from 'Lib/withData'
import Layout from 'Layout'

export default withData(() => (
  <Layout>
    <ListPosts />
  </Layout>
))
