import { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Link from 'next/link'

class ListPosts extends Component {
  render () {
    if (this.props.data.loading) {
      return <div>loading...</div>
    }

    return (
      <div className="habits tiles is-ancestor">
        {this.props.data.posts.map(post => (
          <div className="post tile is-parent" key={post.id}>
            <div className="tile is-child">
              <ul>
                <li>
                  <strong>{post.title || 'Kein Titel'}</strong>
                </li>
                <li>Erstellt: {post.createdAt}</li>
              </ul>

              <div className="field is-grouped">
                <p className="control">
                  <Link
                    href={`/admin/posts/edit?id=${post.id}`}
                    as={`/admin/posts/edit/${post.id}`}
                  >
                    <a className="button is-danger is-outlined ">Edit</a>
                  </Link>
                </p>
              </div>
            </div>
            <div className="tile is-child">
              <div className="content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const allPosts = gql`
  query allPosts {
    posts {
      ... on Note {
        id
        type
        contentHtml
        createdAt
        tags
        hashid
      }
      ... on Article {
        id
        type
        title
        contentHtml
        tags
        createdAt
        hashid
      }
      ... on Bookmark {
        id
        type
        url
        title
        contentHtml
        tags
        hashid
        createdAt
      }
    }
  }
`

export default graphql(allPosts)(ListPosts)
