import { type DB } from '../../src/types/database.js'
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'

// Creates an isolated Kysely instance for tests.
// Uses the same env vars as the app; override with TEST_* if provided.
export const createTestDb = () => {
  const { Pool } = pg
  const host = process.env.TEST_PGHOST || process.env.PGHOST || 'localhost'
  const port = Number(process.env.TEST_PGPORT || process.env.PGPORT || 5432)
  const database = process.env.TEST_PGDATABASE || process.env.PGDATABASE || 'kysely_db'
  const user = process.env.TEST_PGUSER || process.env.PGUSER || 'kysely_user'
  const password = process.env.TEST_PGPASSWORD || process.env.PGPASSWORD || 'kysely_pass'

  const db = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({ host, port, database, user, password, max: 5 }) as any,
    }),
    plugins: [new CamelCasePlugin()],
  })

  return db
}
