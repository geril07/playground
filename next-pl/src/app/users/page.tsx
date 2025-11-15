import { jpClient } from '@/lib/ky/jpClient'
import { User } from '@/types/jp'
import Link from 'next/link'

export default async function UsersPage() {
  const users = await await new Promise((res) => setTimeout(res, 5000)).then(
    () => jpClient.get('users').json<User[]>(),
  )

  return (
    <div>
      <span>Users</span>

      <div className="flex flex-col">
        {users.map((user) => (
          <Link key={user.id} href={`/users/${user.id}`}>
            {user.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
