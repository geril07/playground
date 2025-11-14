import { renderToReadableStream } from 'react-dom/server'
import App from './App'

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url)

    // Serve the client-side hydration script
    if (url.pathname === '/client.js') {
      const bundle = await Bun.build({
        entrypoints: ['./src/client.tsx'],
        format: 'esm',
      })

      const output = bundle.outputs[0]
      if (!output) {
        return new Response('Build failed', { status: 500 })
      }
      return new Response(await output.text(), {
        headers: { 'Content-Type': 'application/javascript' },
      })
    }

    // Serve styles (optional placeholder)
    if (url.pathname === '/styles.css') {
      return new Response('body { font-family: system-ui; padding: 2rem; }', {
        headers: { 'Content-Type': 'text/css' },
      })
    }

    // SSR the React app
    if (url.pathname === '/') {
      const stream = await renderToReadableStream(<App />, {
        bootstrapModules: ['/client.js'],
      })

      // // Read the stream and inject the client script
      // const reader = stream.getReader()
      // const decoder = new TextDecoder()
      // let html = ''
      //
      // while (true) {
      //   const { done, value } = await reader.read()
      //   if (done) break
      //   html += decoder.decode(value, { stream: true })
      // }

      // // Inject the hydration script before closing body tag
      // const injected = html.replace(
      //   '</body>',
      //   '<script type="module" src="/client.js"></script></body>',
      // )

      return new Response(stream, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    }

    return new Response('Not Found', { status: 404 })
  },
})

console.log('🚀 Server running at http://localhost:3000')
