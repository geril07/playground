// types.ts
export type ParagraphBlock = {
  type: 'paragraph'
  id?: string
  text: string
  className?: string // optional styling per block
}

export type Block = ParagraphBlock // extend later with | CodeBlock | TableBlock | ...
