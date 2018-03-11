import Navbar from './navbar'
import '../styles/styles.scss'
import pkg from '../package.json'

export default ({ children, title = 'Home' }) => (
  <div>
    <header>
      <Navbar />
    </header>

    <main id="site-content">
      <div className="section">
        <div className="container">{children}</div>
      </div>
    </main>

    <footer className="footer">
      <div className="container">Cthulhu v{pkg.version}</div>
    </footer>
  </div>
)
