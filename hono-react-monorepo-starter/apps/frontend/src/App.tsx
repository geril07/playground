import { hcClient } from '@repo/backend/client'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    hcClient.api.files
      .$get()
      .then((res) => res.json())
      .then(console.log)
  })
  return <div>Hello World</div>
}

export default App
