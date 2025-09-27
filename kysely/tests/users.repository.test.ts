import { UsersRepository } from '../src/modules/users/repository.js'
import type { DB } from '../src/types/database.js'
import { createTestDb } from './helpers/test-db.js'
import type { Kysely } from 'kysely'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let db: Kysely<DB>
let repo: UsersRepository

beforeAll(async () => {
  db = createTestDb()
  repo = new UsersRepository({ db })
  // Ensure schema exists. In real CI, run migrations beforehand.
})

afterAll(async () => {
  await db.destroy()
})

describe('UsersRepository', () => {
  it('creates and fetches a user by email', async () => {
    const email = `user_${Date.now()}@acme.test`
    const created = await repo.create({ email, name: 'Test User', password: 'secret' })
    expect(created.id).toBeTypeOf('number')
    expect(created.email).toBe(email)

    const fetched = await repo.getByEmail(email)
    expect(fetched?.id).toBe(created.id)
  })

  it('updates a user', async () => {
    const email = `upd_${Date.now()}@acme.test`
    const u = await repo.create({ email, name: 'Another', password: 'secret' })
    const patched = await repo.update(u.id, { email: `new_${email}` })
    expect(patched.email).toBe(`new_${email}`)
  })
})
