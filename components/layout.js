import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Navbar from './navbar'
import pkg from '../package.json'
import Login from './login'

import '../styles/styles.scss'

export default class Layout extends Component {
  state = {
    loggedIn: null
  }

  async componentWillMount () {
    const res = await fetch('https://inhji.de/api/loggedin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    this.setState({ loggedIn: res.ok })
  }

  render () {
    return (
      <div>
        <header>
          <Navbar />
        </header>

        <main id="site-content">
          <div className="section">
            <div className="container">
              {this.state.loggedIn === null ? (
                <div>loading</div>
              ) : this.state.loggedIn === false ? (
                <Login />
              ) : (
                this.props.children
              )}
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="container">Cthulhu v{pkg.version}</div>
        </footer>
      </div>
    )
  }
}
