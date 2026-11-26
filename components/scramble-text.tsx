'use client'

import { useEffect, useRef } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>_'

export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const visualRef = useRef<HTMLSpanElement>(null)
  const frameRef = useRef(0)

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  const run = () => {
    const el = visualRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    cancelAnimationFrame(frameRef.current)
    let frame = 0

    const step = () => {
      const revealed = Math.floor(frame / 2)
      if (revealed >= text.length) {
        el.textContent = text
        return
      }
      el.textContent = text
        .split('')
        .map((char, index) =>
          index < revealed || char === ' '
            ? char
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        )
        .join('')
      frame += 1
      frameRef.current = requestAnimationFrame(step)
    }

    step()
  }

  return (
    <span className={className ? `scramble ${className}` : 'scramble'} onPointerEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" ref={visualRef}>
        {text}
      </span>
    </span>
  )
}
