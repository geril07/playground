import React, { useEffect, useState } from 'react'
import { Stage, Layer, Circle, Text } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'cyan', 'purple']

const AR = 0.9
export const KonvaShapes = () => {
  const [size, setSize] = useState({
    width: window.innerWidth * AR,
    height: window.innerHeight * AR,
  })

  const [tooltipProps, setTooltipProps] = React.useState({
    text: '',
    visible: false,
    x: 0,
    y: 0,
  })

  const circles = React.useMemo(() => {
    const items = []
    let colorIndex = 0

    for (let i = 0; i < 10000; i++) {
      const color = colors[colorIndex++]
      if (colorIndex >= colors.length) {
        colorIndex = 0
      }

      items.push({
        id: i,
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        color,
      })
    }
    return items
  }, [size])

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!e.target) return

    const mousePos = e.target.getStage()!.getPointerPosition()!

    setTooltipProps({
      text: `node: ${e.target.name()}, color: ${e.target.attrs.fill}`,
      visible: true,
      x: mousePos.x + 5,
      y: mousePos.y + 5,
    })
  }

  const handleMouseOut = () => {
    setTooltipProps((prev) => ({ ...prev, visible: false }))
  }

  useEffect(() => {
    const ac = new AbortController()
    window.addEventListener(
      'resize',
      () => {
        setSize({
          height: window.innerHeight * AR,
          width: window.innerWidth * AR,
        })
      },
      { signal: ac.signal },
    )
    return () => ac.abort()
  }, [])

  console.log(size)
  return (
    <>
      <Stage {...size}>
        <Layer onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
          {circles.map(({ id, x, y, color }) => (
            <Circle
              key={id}
              x={x}
              y={y}
              radius={3}
              fill={color}
              name={id.toString()}
            />
          ))}
        </Layer>
        <Layer>
          <Text
            {...tooltipProps}
            fontFamily="Calibri"
            fontSize={12}
            padding={5}
            fill="black"
            opacity={0.75}
          />
        </Layer>
      </Stage>
      <button
        onClick={() => {
          setSize((prev) => ({
            ...prev,
          }))
        }}
      >
        Recreate
      </button>
    </>
  )
}
