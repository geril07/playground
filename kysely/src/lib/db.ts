import { DB } from '../types/database.js'
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'

const { Pool } = pg

export const db = new Kysely<DB>({
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
