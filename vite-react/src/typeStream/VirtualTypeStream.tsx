// VirtualTypeStream.tsx
import * as React from 'react'
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual'
import { useTypeStream } from './useTypeStream'
import type { Block, ParagraphBlock } from './types'

type Props = {
  blocks: Block[]

  // typing controls (same as TypeStream)
  charMs?: number
  blockPauseMs?: number
  autoStart?: boolean
  showCursor?: boolean

  // virtualization controls
  height?: number // viewport height in px
  estimateRowPx?: number // initial size guess per row
  overscan?: number // # of extra rows to render above/below
}

export function VirtualTypeStream({
  blocks,
  // typing
  charMs = 50,
  blockPauseMs = 800,
  autoStart = true,
  showCursor = true,
  // virtualization
  height = 480,
  estimateRowPx = 80,
  overscan = 8,
}: Props) {
  const { visibleBlocks, index, isDone } = useTypeStream(blocks, {
    charMs,
    blockPauseMs,
    autoStart,
  })

  const parentRef = React.useRef<HTMLElement | null>(null)

  const virtualizer = useVirtualizer({
    count: blocks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateRowPx,
    overscan,
    getItemKey: (i) => (blocks[i] as ParagraphBlock)?.id ?? i,
  })

  return (
    <div
      ref={(ref) => {
        parentRef.current = ref as HTMLElement
      }}
      style={{ height, overflow: 'auto', position: 'relative' }}
      aria-live="polite"
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: 'relative',
          width: '100%',
        }}
      >
        {virtualizer.getVirtualItems().map((vi) => {
          const full = blocks[vi.index] as ParagraphBlock
          const vis = visibleBlocks[vi.index] as ParagraphBlock | undefined

          const isCurrent = !isDone && vi.index === index.block
          const text = vis?.text ?? (vi.index < index.block ? full?.text : '')

          return (
            <Row
              key={vi.key}
              virtualizer={virtualizer}
              virtualIndex={vi.index}
              start={vi.start}
              paragraph={full}
              text={text}
              showCursor={showCursor && isCurrent}
            />
          )
        })}
      </div>
    </div>
  )
}

function Row({
  virtualizer,
  virtualIndex,
  start,
  paragraph,
  text,
  showCursor,
}: {
  virtualizer: Virtualizer<HTMLElement, Element>
  virtualIndex: number
  start: number
  paragraph: ParagraphBlock
  text: string
  showCursor: boolean
}) {
  const ref = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (ref.current) virtualizer.measureElement(ref.current)
  }, [virtualizer])

  React.useEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(() => {
      if (ref.current) virtualizer.measureElement(ref.current)
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [virtualizer])

  return (
    <div
      ref={ref}
      data-index={virtualIndex}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        transform: `translateY(${start}px)`,
        contentVisibility: 'auto',
        containIntrinsicSize: '0 64px',
        padding: '8px 0',
      }}
      className={paragraph.className}
    >
      <p style={{ margin: 0 }}>
        {text}
        {showCursor && (
          <span style={{ marginLeft: 2 }} aria-hidden>
            ▌
          </span>
        )}
      </p>
    </div>
  )
}
