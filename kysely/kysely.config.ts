import { defineConfig } from 'kysely-ctl'
import pg from 'pg'

const { Pool } = pg

export default defineConfig({
  dialect: {
    createAdapter() {
      return new (require('kysely').PostgresAdapter)()
    },
    createDriver() {
      const { PostgresDriver } = require('kysely')
      return new PostgresDriver({
        pool: new Pool({
          host: process.env.PGHOST || 'localhost',
          port: Number(process.env.PGPORT || 5432),
          database: process.env.PGDATABASE || 'kysely_db',
          user: process.env.PGUSER || 'kysely_user',
          password: process.env.PGPASSWORD || 'kysely_pass',
        }),
      })
    },
    createIntrospector(db: any) {
      const { PostgresIntrospector } = require('kysely')
      return new PostgresIntrospector(db)
    },
    createQueryCompiler() {
      const { PostgresQueryCompiler } = require('kysely')
      return new PostgresQueryCompiler()
    },
  },
  migrations: {
    migrationFolder: './migrations',
  },
})
