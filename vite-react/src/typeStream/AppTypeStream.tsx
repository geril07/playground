// App.tsx
import { TypeStream } from './TypeStream'
import type { Block } from './types'

const blocks = Array.from({ length: 1000 }).map<Block>((_, idx) => ({
  type: 'paragraph',
  text: Array.from({ length: Math.random() * (idx + 1) })
    .map(() => String(Math.random() * 10000))
    .join(' '),
}))

export function AppTypeStream() {
  return (
    <main
      style={{
        maxWidth: 680,
        margin: '48px auto',
        fontSize: '1.1rem',
        lineHeight: 1.6,
      }}
    >
      <TypeStream
        blocks={blocks}
        charMs={5}
        blockPauseMs={100}
        autoStart
      />
    </main>
  )
}
