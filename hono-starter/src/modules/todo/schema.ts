import z from 'zod'

export const newTodoSchema = z.object({
  title: z.string(),
  completed: z.boolean().default(false),
})

export const todoSchema = newTodoSchema.extend({
  id: z.number(),
})
