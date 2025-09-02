import * as v from 'valibot'
import { z } from 'zod'

const vLoginSchema = v.object({
  login: v.pipe(v.string(), v.minLength(3), v.maxLength(32)),
  password: v.pipe(v.string(), v.minLength(8), v.maxLength(72)),
})

export const zLoginSchema = z.object({
  login: z.string().min(3).max(32),
  password: z.string().min(8).max(72),
})

const vTodo = v.object({
  id: v.number(),
  title: v.pipe(v.string(), v.minLength(1)),
  completed: v.boolean(),
})
const vTodos = v.array(vTodo)

const zTodo = z.object({
  id: z.number(),
  title: z.string().min(1),
  completed: z.boolean(),
})

const zTodos = z.array(zTodo)

const loginData = Array.from({ length: 1_100_000 }).map((_, idx) => ({
  login: String(Math.random() * idx),
  password: String(Math.random() * idx),
}))

const todosData = Array.from({ length: 1_100_000 }).map((_, idx) => ({
  login: String(Math.random() * idx),
  password: String(Math.random() * idx),
}))

console.time('valibot')
for (const item of loginData) {
  v.safeParse(vLoginSchema, item, { abortEarly: false })
}
console.timeEnd('valibot')

console.time('zod')
for (const item of loginData) {
  zLoginSchema.safeParse(item)
}
console.timeEnd('zod')

console.time('valibot')
for (const item of todosData) {
  v.safeParse(vLoginSchema, item, { abortEarly: false })
}
console.timeEnd('valibot')

console.time('zod')
for (const item of todosData) {
  zLoginSchema.safeParse(item)
}
console.timeEnd('zod')
