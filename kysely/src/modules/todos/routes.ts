import { type TodosRepository } from './repository.js'
import { type FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

const todoIdSchema = z.object({
  id: z.string(),
})

const createTodoSchema = z.object({
  name: z.string(),
  userId: z.number(),
})

const toggleTodoSchema = z.object({
  completed: z.boolean(),
})

export const todosRoutes =
  (todosRepo: TodosRepository): FastifyPluginAsyncZod =>
  async (app, _opts) => {
    app.get('/todos', async (_request, _reply) => {
      const todos = await todosRepo.list()
      return todos
    })

    app.get(
      '/todos/:id',
      {
        schema: {
          params: todoIdSchema,
        },
      },
      async (request, _reply) => {
        const todo = await todosRepo.findById(Number(request.params.id))
        if (!todo) {
          return _reply.code(404).send({ error: 'Todo not found' })
        }
        return todo
      },
    )

    app.post(
      '/todos',
      {
        schema: {
          body: createTodoSchema,
        },
      },
      async (request, reply) => {
        const todo = await todosRepo.create({
          name: request.body.name,
          userId: request.body.userId,
          completed: false,
        })
        return reply.code(201).send(todo)
      },
    )

    app.patch(
      '/todos/:id/toggle',
      {
        schema: {
          params: todoIdSchema,
          body: toggleTodoSchema,
        },
      },
      async (request, _reply) => {
        const todo = await todosRepo.toggleComplete(
          Number(request.params.id),
          request.body.completed,
        )
        return todo
      },
    )
  }
