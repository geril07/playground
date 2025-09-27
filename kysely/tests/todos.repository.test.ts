import { TodosRepository } from '../src/modules/todos/repository.js'
import { UsersRepository } from '../src/modules/users/repository.js'
import type { DB } from '../src/types/database.js'
import { createTestDb } from './helpers/test-db.js'
import type { Kysely } from 'kysely'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let db: Kysely<DB>
let todos: TodosRepository
let users: UsersRepository

beforeAll(async () => {
  db = createTestDb()
  todos = new TodosRepository({ db })
  users = new UsersRepository({ db })
})

afterAll(async () => {
  await db.destroy()
})

describe('TodosRepository', () => {
  it('creates, lists and toggles todos by user', async () => {
    const u = await users.create({
      email: `todo_${Date.now()}@acme.test`,
      name: 'T U',
      password: 'secret',
    })
    const t = await todos.create({ userId: u.id, name: 'Test', completed: false })

    const listed = await todos.listByUser(u.id)
    expect(listed.some((x) => x.id === t.id)).toBe(true)

    const toggled = await todos.toggleComplete(t.id, true)
    expect(toggled.completed).toBe(true)
  })
})
