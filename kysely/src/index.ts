import { TodosRepository } from './modules/todos/repository.js'
import { todosRoutes } from './modules/todos/routes.js'
import { UsersRepository } from './modules/users/repository.js'
import { usersRoutes } from './modules/users/routes.js'
import { DB } from './types/database.js'
import fastify from 'fastify'
import { ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'

const { Pool } = pg

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

const usersRepo = new UsersRepository({ db })
const todosRepo = new TodosRepository({ db })

const app = fastify({ logger: true })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

const typedApp = app.withTypeProvider<ZodTypeProvider>()

// Register routes
await typedApp.register(usersRoutes(usersRepo))
await typedApp.register(todosRoutes(todosRepo))

// Start server
const start = async () => {
  try {
    await typedApp.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    typedApp.log.error(err)
    process.exit(1)
  }
}

start()
