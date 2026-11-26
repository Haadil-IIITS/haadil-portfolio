'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/scroll-fx'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const counter = { value: 0 }

    const timeline = gsap.timeline()
    timeline
      .to(counter, {
        value: 100,
        duration: reduced ? 0.2 : 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0')
          }
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${counter.value / 100})`
          }
        },
      })
      .call(onComplete, undefined, '+=0.15')
      .to(rootRef.current, {
        yPercent: -100,
        duration: reduced ? 0.01 : 1.2,
        ease: 'expo.inOut',
      })
      .call(() => setDone(true))

    return () => {
      timeline.kill()
    }
  }, [onComplete])

  if (done) return null

  return (
    <div className="preloader" ref={rootRef} role="status">
      <span className="sr-only">Loading portfolio</span>
      <div className="preloader__inner" aria-hidden="true">
        <p className="preloader__tag">HB // Boot sequence</p>
        <p className="preloader__count">
          <span ref={countRef}>000</span>
          <span className="preloader__pct">%</span>
        </p>
        <div className="preloader__bar">
          <span ref={barRef} />
        </div>
        <ul className="preloader__log">
          <li>Init smooth-scroll kernel</li>
          <li>Mount neural canvas</li>
          <li>Calibrate biometric HUD</li>
        </ul>
      </div>
    </div>
  )
}
