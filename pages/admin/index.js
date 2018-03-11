import Link from 'next/link'

export default () => (
  <div>
    <ul>
      <li>
        <Link href="/admin">
          <a>index</a>
        </Link>
      </li>
      <li>
        <Link href="/admin/habits">
          <a>Habits</a>
        </Link>
      </li>
    </ul>
  </div>
)
