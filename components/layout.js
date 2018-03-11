import '../styles/styles.scss'

export default ({ children, title = 'Home' }) => (
  <div>
    <main id="site-content">
      <div className="section">
        <div className="container">{children}</div>
      </div>
    </main>
  </div>
)
