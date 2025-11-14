import { useState } from 'react'

export default function App() {
  const [counter, setCounter] = useState(0)
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles.css"></link>
        <title>My app</title>
      </head>
      <body>
        <div id="app">
          <div>Hello world</div>
          <div>{counter}</div>
          <div>
            <button onClick={() => setCounter((prev) => ++prev)}>Inc</button>
          </div>
        </div>
      </body>
    </html>
  )
}
