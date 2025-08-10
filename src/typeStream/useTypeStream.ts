// useTypeStream.tsx
import * as React from 'react'
import type { Block, ParagraphBlock } from './types'

type Options = {
  charMs?: number // typing speed per char
  blockPauseMs?: number // pause after finishing a block
  startIndex?: { block: number; char: number } // resume support
  autoStart?: boolean // start immediately
}

type UseTypeStreamReturn = {
  visibleBlocks: ParagraphBlock[] // same blocks, but current one is sliced
  isDone: boolean
  isRunning: boolean
  index: { block: number; char: number }
  start: () => void
  pause: () => void
  reset: () => void
  skipToEnd: () => void
}

function sliceParagraph(p: ParagraphBlock, upto: number): ParagraphBlock {
  return { ...p, text: p.text.slice(0, upto) }
}

export function useTypeStream(
  blocks: Block[],
  {
    charMs = 60,
    blockPauseMs = 600,
    startIndex = { block: 0, char: 0 },
    autoStart = true,
  }: Options = {},
): UseTypeStreamReturn {
  // filter to supported blocks (paragraphs for now)
  const paragraphs = React.useMemo(
    () => blocks.filter((b): b is ParagraphBlock => b.type === 'paragraph'),
    [blocks],
  )

  const [running, setRunning] = React.useState(autoStart)
  const [bIdx, setBIdx] = React.useState(startIndex.block)
  const [cIdx, setCIdx] = React.useState(startIndex.char)
  const [delay, setDelay] = React.useState(charMs)

  const isDone = bIdx >= paragraphs.length

  // Exposed controls
  const start = React.useCallback(() => setRunning(true), [])
  const pause = React.useCallback(() => setRunning(false), [])
  const reset = React.useCallback(() => {
    setRunning(false)
    setBIdx(0)
    setCIdx(0)
    setDelay(charMs)
  }, [charMs])
  const skipToEnd = React.useCallback(() => {
    setRunning(false)
    setBIdx(paragraphs.length)
    setCIdx(0)
  }, [paragraphs.length])

  // Core typing loop (variable timeout per tick)
  React.useEffect(() => {
    if (!running || isDone || paragraphs.length === 0) return
    const current = paragraphs[bIdx]
    const atEndOfBlock = cIdx >= current.text.length

    // If we just finished a block, pause before moving on
    if (atEndOfBlock) {
      const t = setTimeout(() => {
        const nextBlock = bIdx + 1
        if (nextBlock >= paragraphs.length) {
          // all blocks done
          setBIdx(paragraphs.length) // mark done
          setCIdx(0)
          return
        }
        setBIdx(nextBlock)
        setCIdx(0)
        setDelay(charMs) // reset to normal speed
      }, blockPauseMs)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => {
      setCIdx((n) => n + 1)
      setDelay(charMs)
    }, delay)

    return () => clearTimeout(t)
  }, [running, isDone, paragraphs, bIdx, cIdx, delay, charMs, blockPauseMs])

  // Build visible blocks: finished ones are full text; current is sliced
  const visibleBlocks: ParagraphBlock[] = React.useMemo(() => {
    if (paragraphs.length === 0) return []
    if (isDone) return paragraphs
    return paragraphs.map((p, i) => {
      if (i < bIdx) return p
      if (i > bIdx) return { ...p, text: '' }
      return sliceParagraph(p, Math.min(cIdx, p.text.length))
    })
  }, [paragraphs, bIdx, cIdx, isDone])

  return {
    visibleBlocks,
    isDone,
    isRunning: running,
    index: { block: bIdx, char: cIdx },
    start,
    pause,
    reset,
    skipToEnd,
  }
}
