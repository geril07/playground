import { jpClient } from '@/lib/ky/jpClient'
import { User } from '@/types/jp'

export default async function UserPage({
  params,
}: {
  params: Promise<{ id?: string }>
}) {
  const { id: userId } = await params

  if (!userId) return <div>User not found</div>

  const user = await jpClient(`users/${userId}`).json<User>()

  return <div className="flex flex-col">{JSON.stringify(user, null, 2)}</div>
}
