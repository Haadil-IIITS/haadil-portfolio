'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, hasFinePointer, prefersReducedMotion } from '@/lib/scroll-fx'

export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !hasFinePointer() || prefersReducedMotion()) return

    const moveX = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'elastic.out(1, 0.45)' })
    const moveY = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'elastic.out(1, 0.45)' })

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      moveX((event.clientX - (rect.left + rect.width / 2)) * strength)
      moveY((event.clientY - (rect.top + rect.height / 2)) * strength)
    }
    const onLeave = () => {
      moveX(0)
      moveY(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      gsap.killTweensOf(el)
    }
  }, [strength])

  return (
    <span className="magnetic" ref={ref}>
      {children}
    </span>
  )
}
