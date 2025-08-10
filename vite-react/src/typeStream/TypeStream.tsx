// TypeStream.tsx — a tiny renderer component with a blinking caret on the current block
import { useTypeStream } from './useTypeStream'
import type { Block, ParagraphBlock } from './types'
import './typestream.css'

type Props = {
  blocks: Block[]
  charMs?: number
  blockPauseMs?: number
  autoStart?: boolean
  showCursor?: boolean
}

export function TypeStream({
  blocks,
  charMs,
  blockPauseMs,
  autoStart = true,
  showCursor = true,
}: Props) {
  const {
    visibleBlocks,
    isDone,
    isRunning,
    index,
    start,
    pause,
    reset,
    skipToEnd,
  } = useTypeStream(blocks, { charMs, blockPauseMs, autoStart })

  return (
    <div aria-live="polite">
      {visibleBlocks.map((b: ParagraphBlock, i) => {
        const isCurrent = i === index.block && !isDone
        return (
          <p key={b.id ?? i} className={b.className}>
            {b.text}
            {showCursor && isCurrent && !isRunning && (
              <span className="ts-caret" aria-hidden>
                ▌
              </span>
            )}
          </p>
        )
      })}

      {/* Controls are optional; handy for demos/testing */}
      <div className="ts-controls">
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
        <button onClick={skipToEnd}>Skip</button>
      </div>
    </div>
  )
}
