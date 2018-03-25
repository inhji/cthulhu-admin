import Router from 'next/router'
import fetch from 'isomorphic-fetch'
import Layout from 'Layout'

export default ({ location }) => (
  <Layout>
    <h1>Login</h1>
    <form
      onSubmit={async e => {
        e.preventDefault()

        const response = await fetch('https://inhji.de/api/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email.value,
            password: this.password.value
          })
        })

        console.log(response)

        if (response.ok) {
          // Router.push('/admin')
        }
      }}
    >
      <input type="email" placeholder="email" required ref={input => (this.email = input)} />
      <input
        type="password"
        placeholder="password"
        required
        ref={input => (this.password = input)}
      />

      <button type="submit">Go!</button>
    </form>
  </Layout>
)
