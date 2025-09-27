import { type UsersRepository } from './repository.js'
import { type FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

const userIdSchema = z.object({
  id: z.string(),
})

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
})

export const usersRoutes =
  (usersRepo: UsersRepository): FastifyPluginAsyncZod =>
  async (app, _opts) => {
    app.get('/users', async (_request, _reply) => {
      const users = await usersRepo.list()
      return users
    })

    app.get(
      '/users/:id',
      {
        schema: {
          params: userIdSchema,
        },
      },
      async (request, _reply) => {
        const user = await usersRepo.findById(Number(request.params.id))
        if (!user) {
          return _reply.code(404).send({ error: 'User not found' })
        }
        return user
      },
    )

    app.post(
      '/users',
      {
        schema: {
          body: createUserSchema,
        },
      },
      async (request, reply) => {
        const user = await usersRepo.create(request.body)
        return reply.code(201).send(user)
      },
    )
  }
