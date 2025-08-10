import { createBrowserRouter } from 'react-router'
import { App } from './App'
import { AppTypeStream } from './typeStream/AppTypeStream'
import { AppTanstackForm } from './tanstack-form/AppTanstackForm'

export const router = createBrowserRouter([
  { path: '/', Component: App },
  { path: '/typeStream', Component: AppTypeStream },
  { path: '/tanstack-form', Component: AppTanstackForm },
])
