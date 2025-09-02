import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'

export const todoController = new Hono()

todoController.get('/', describeRoute({}), (c) => {
  return
})
