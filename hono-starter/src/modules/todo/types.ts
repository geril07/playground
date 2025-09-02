import type z from 'zod'
import type { newTodoSchema } from './schema'

export type NewTodo = z.infer<typeof newTodoSchema>
