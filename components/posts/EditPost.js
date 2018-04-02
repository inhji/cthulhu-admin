import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import Router from 'next/router'
import { withFormik } from 'formik'

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <form className="form" onSubmit={handleSubmit}>
    <div className="field">
      <label htmlFor="title" className="label">
        Title
      </label>
      <div className="control">
        <input
          name="title"
          type="text"
          className="input"
          value={values.title}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="field">
      <label htmlFor="description" className="label">
        Content
      </label>
      <div className="control">
        <textarea
          name="content"
          cols="30"
          rows="10"
          className="textarea"
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>

    <div className="field is-grouped">
      <div className="control">
        <button className="button is-link">Submit</button>
      </div>
    </div>
  </form>
)

const PostForm = withFormik({
  mapPropsToValues: props => {
    if (props.post) {
      console.log(props)
      return { title: props.post.title, content: props.post.content }
    }

    return { title: '', content: '' }
  },
  validate: () => {
    return {}
  },
  handleSubmit: async (values, { props }) => {
    const id = props.post.id

    try {
      if (props.post.type === 'Bookmark') {
        await props.updateBookmark({
          variables: {
            id,
            content: values.content,
            title: values.title,
            tags: props.post.tags
          }
        })
      } else if (props.type === 'Note') {
        await props.updateNote({
          variables: {
            id,
            content: values.content,
            tags: props.post.tags
          }
        })
      }

      Router.push('/admin/posts')
    } catch (e) {
      console.log(e)
    }
  }
})(InnerForm)

const updateNoteMutation = gql`
  mutation UpdateNoteMutation($id: ID!, $content: String!, $tags: [String]!) {
    updateNote(id: $id, content: $content, tags: $tags) {
      id
      content
      tags
      hashid
    }
  }
`

const updateBookmarkMutation = gql`
  mutation UpdateBookmarkMutation($id: ID!, $content: String!, $tags: [String]!, $title: String) {
    updateBookmark(id: $id, content: $content, tags: $tags, title: $title) {
      id
      content
      title
      tags
      hashid
    }
  }
`

const postQuery = gql`
  query Post($id: ID!) {
    post(id: $id) {
      ... on Note {
        id
        type
        content
        contentHtml
        createdAt
        tags
        hashid
      }
      ... on Article {
        id
        type
        title
        content
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
        content
        contentHtml
        tags
        hashid
        createdAt
      }
    }
  }
`
const EditPost = ({ data: { loading, post }, id, updateNote, updateBookmark }) => (
  <div>
    {loading ? (
      <div>loading..</div>
    ) : (
      <PostForm post={post} updateBookmark={updateBookmark} updateNote={updateNote} />
    )}
  </div>
)

export default compose(
  graphql(postQuery, {
    options: props => ({
      variables: {
        id: props.id
      }
    })
  }),
  graphql(updateNoteMutation, { name: 'updateNote' }),
  graphql(updateBookmarkMutation, { name: 'updateBookmark' })
)(EditPost)
