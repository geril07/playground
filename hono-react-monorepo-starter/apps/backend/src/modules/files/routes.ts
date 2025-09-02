import { Hono } from 'hono'

export const makeFilesRoutes = () => {
  return new Hono().get('/', (c) => {
    return c.json([])
  })
}
