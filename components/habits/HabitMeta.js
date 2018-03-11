import timeago from 'Lib/timeago'
import Link from 'next/link'
import _ from 'lodash'

const HabitMeta = ({ habit: { id, name, logs, description } }) => (
  <div>
    <h3 className="is-size-3">{name}</h3>

    <ul>
      <li>description: {description}</li>
      <li>last updated: {timeago(_.last(logs))}</li>
    </ul>

    <a className="button is-success">Add one</a>

    <Link href={`/admin/habits/edit?id=${id}`} as={`/admin/habits/edit/${id}`}>
      <a className="button is-danger is-outlined is-pulled-right">Edit</a>
    </Link>
  </div>
)

export default HabitMeta
