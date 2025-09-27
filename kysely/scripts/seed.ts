import { DB } from '../src/types/database.js'
import { CamelCasePlugin, Kysely, PostgresDialect, sql } from 'kysely'
import pg from 'pg'

function parseArgs() {
  const args = process.argv.slice(2)
  const out: Record<string, string | number | boolean> = {}
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a.startsWith('--')) {
      const [k, v] = a.replace(/^--/, '').split('=')
      out[k] = v === undefined ? true : isNaN(Number(v)) ? v : Number(v)
    }
  }
  return out
}

async function main() {
  const { Pool } = pg
  const opts = parseArgs()
  const usersCount = Number(opts.users ?? 10)
  const todosPerUser = Number(opts.todos ?? 10)

  const db = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: process.env.PGHOST || 'localhost',
        port: Number(process.env.PGPORT || 5432),
        database: process.env.PGDATABASE || 'kysely_db',
        user: process.env.PGUSER || 'kysely_user',
        password: process.env.PGPASSWORD || 'kysely_pass',
        max: 10,
      }),
    }),
    plugins: [new CamelCasePlugin()],
  })

  // optional: clear tables
  await sql`TRUNCATE TABLE todos RESTART IDENTITY CASCADE`.execute(db).catch(() => {})
  await sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE`.execute(db).catch(() => {})

  // Insert users
  const userRows = Array.from({ length: usersCount }, (_, i) => ({
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    password: 'password',
  }))

  const insertedUsers = await db.insertInto('users').values(userRows).returning(['id']).execute()

  // Insert todos per user
  for (const u of insertedUsers) {
    const todos = Array.from({ length: todosPerUser }, (_, j) => ({
      userId: u.id,
      name: `Todo ${j + 1} for user ${u.id}`,
      completed: false,
    }))
    if (todos.length) {
      await db.insertInto('todos').values(todos).execute()
    }
  }

  console.log(`Seeded ${usersCount} users with ${todosPerUser} todos each.`)
  await db.destroy()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
