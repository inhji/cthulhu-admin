import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Navbar from './navbar'
import pkg from '../package.json'
import '../styles/styles.scss'

export default class Layout extends Component {
  state = {
    loggedIn: null
  }

  async componentWillMount () {
    const res = await fetch('https://api.inhji.de/loggedin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    if (res.ok) {
      const { id } = await res.json()

      localStorage.setItem('CTHULHU_USER_ID', id)
    } else {
      localStorage.removeItem('CTHULHU_USER_ID')
    }

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
                <div>unauthorized</div>
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
