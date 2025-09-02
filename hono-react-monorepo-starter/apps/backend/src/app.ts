import { Hono } from 'hono'
import { makeFilesRoutes } from './modules/files/routes.js'
import { logger } from 'hono/logger'

export const app = new Hono()
  .use(logger())
  .basePath('/api')
  .route('/files', makeFilesRoutes())

export type AppType = typeof app
