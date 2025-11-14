import { hydrateRoot } from 'react-dom/client'
import App from './App'

// Hydrate the server-rendered HTML
hydrateRoot(document, <App />)

console.log('✨ Client hydrated!')
