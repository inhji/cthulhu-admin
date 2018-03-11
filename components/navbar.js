import Link from 'next/link'

export default () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link href="/admin">
        <a className="navbar-item">
          <img src="/static/cthulhu.png" />
        </a>
      </Link>

      <div className="navbar-burger">
        <span />
        <span />
        <span />
      </div>
    </div>

    <div className="navbar-menu">
      <Link href="/admin/habits">
        <a className="navbar-item">Habits</a>
      </Link>
    </div>
  </nav>
)
