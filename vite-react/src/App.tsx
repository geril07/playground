import { Link } from 'react-router'
import { routes } from './routes'

export function App() {
  return (
    <div className="flex gap-2 text-blue-400">
      {routes.map((route) => {
        return <Link to={route.path}>{route.path}</Link>
      })}
    </div>
  )
}
