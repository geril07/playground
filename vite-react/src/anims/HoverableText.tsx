import type { ComponentProps } from 'react'

const ANIMATION_INITIAL_DURATION = 250
const ANIMATION_STEP = 35

export const HoverableText = ({
  content,
  ...props
}: { content: string } & Omit<ComponentProps<'div'>, 'children'>) => {
  return (
    <div
      {...props}
      className="inline-block group overflow-hidden relative cursor-pointer select-none"
      style={{ minWidth: `${content.length}ch` }}
    >
      <div className="hover flex">
        {content.split('').map((char, idx) => (
          <div
            key={idx}
            className="linear group-hover:transform-[translateY(-100%)] transition-transform"
            style={{
              transitionDuration: `${ANIMATION_INITIAL_DURATION + ANIMATION_STEP * idx}ms`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 italic flex">
        {content.split('').map((char, idx) => (
          <div
            key={idx}
            className="linear transition-transform transform-[translateY(100%)] group-hover:transform-[translateY(0)]"
            style={{
              transitionDuration: `${ANIMATION_INITIAL_DURATION + ANIMATION_STEP * idx}ms`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </div>
        ))}
      </div>
    </div>
  )
}
