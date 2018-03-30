/* global localStorage */
import Router from 'next/router'
import fetch from 'isomorphic-fetch'

export default () => (
  <div className="columns">
    <div className="column is-half is-offset-one-quarter">
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

          if (!response.ok) {
            console.error(response)
          }

          const { id } = await response.json()

          localStorage.setItem('CTHULHU_USER_ID', id)

          Router.push('/admin')
        }}
      >
        <div className="field">
          <label htmlFor="email" className="label">
            Email
          </label>
          <div className="control">
            <input
              type="email"
              className="input"
              placeholder="Email"
              required
              ref={input => (this.email = input)}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="Password"
              required
              ref={input => (this.password = input)}
            />
          </div>
        </div>

        <button type="submit" className="button is-primary">
          Go!
        </button>
      </form>
    </div>
  </div>
)
