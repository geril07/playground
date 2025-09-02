import { hc } from 'hono/client'
import type { AppType } from './app.js'

export const hcClient = hc<AppType>('')
