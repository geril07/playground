import type { RouteObject } from 'react-router'
import { App } from './App'
import { AppTanstackForm } from './tanstackForm/AppTanstackForm'
import { AppTypeStream } from './typeStream/AppTypeStream'

export const routes = [
  { path: '/', Component: App },
  { path: '/typeStream', Component: AppTypeStream },
  { path: '/tanstackForm', Component: AppTanstackForm },
] satisfies RouteObject[]
