/* global fetch:true */
import Router from 'next/router'

export default ({ location }) => (
  <div>
    <h1>Login</h1>
    <form
      onSubmit={async e => {
        e.preventDefault()

        const response = await fetch('https://api.inhji.de/login', {
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

        if (response.ok) {
          Router.push('/admin')
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
  </div>
)
