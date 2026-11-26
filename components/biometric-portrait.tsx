'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, hasFinePointer, prefersReducedMotion } from '@/lib/scroll-fx'
import { callouts } from '@/lib/site-data'

const OCTAGON = '22,0 78,0 100,19 100,81 78,100 22,100 0,81 0,19'

const LEADERS = [
  { path: 'M0 90 H150 L172 152', dot: [172, 152] },
  { path: 'M600 90 H450 L428 152', dot: [428, 152] },
  { path: 'M0 510 H150 L172 448', dot: [172, 448] },
  { path: 'M600 510 H450 L428 448', dot: [428, 448] },
]

const clamp = (value: number) => Math.max(-1, Math.min(1, value))
const pad = (value: number) => String(Math.max(0, Math.min(999, Math.round(value)))).padStart(3, '0')

export function BiometricPortrait() {
  const scopeRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const ringsRef = useRef<SVGSVGElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)
  const xRef = useRef<HTMLSpanElement>(null)
  const yRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const scope = scopeRef.current
    const tilt = tiltRef.current
    const rings = ringsRef.current
    if (!scope || !tilt || !rings) return

    if (!hasFinePointer() || prefersReducedMotion()) {
      if (statusRef.current) statusRef.current.textContent = 'STANDBY'
      return
    }

    const smooth = { duration: 1, ease: 'power3.out' }
    const rotateX = gsap.quickTo(tilt, 'rotationX', smooth)
    const rotateY = gsap.quickTo(tilt, 'rotationY', smooth)
    const ringsX = gsap.quickTo(rings, 'x', { duration: 1.4, ease: 'power3.out' })
    const ringsY = gsap.quickTo(rings, 'y', { duration: 1.4, ease: 'power3.out' })

    const onMove = (event: PointerEvent) => {
      const rect = scope.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return

      const nx = clamp((event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2))
      const ny = clamp((event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2))

      rotateY(nx * 18)
      rotateX(ny * -14)
      ringsX(nx * -12)
      ringsY(ny * -12)

      if (xRef.current) xRef.current.textContent = pad((event.clientX / window.innerWidth) * 999)
      if (yRef.current) yRef.current.textContent = pad((event.clientY / window.innerHeight) * 999)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      gsap.killTweensOf([tilt, rings])
    }
  }, [])

  return (
    <div className="bio">
      <p className="bio__header">{'Biometric // System Architect'}</p>

      <div className="bio__stage">
        <div className="bio__scope" ref={scopeRef}>
          <svg className="bio__rings" ref={ringsRef} viewBox="0 0 600 600" aria-hidden="true">
            <circle className="bio__ring bio__ring--a" cx="300" cy="300" r="268" />
            <circle className="bio__ring bio__ring--e" cx="300" cy="300" r="256" />
            <circle className="bio__ring bio__ring--b" cx="300" cy="300" r="244" />
            <circle className="bio__ring bio__ring--c" cx="300" cy="300" r="244" />
            <circle className="bio__ring bio__ring--d" cx="300" cy="300" r="226" />

            <path className="bio__tick" d="M300 14 V46 M300 554 V586 M14 300 H46 M554 300 H586" />
            <text className="bio__degree" x="308" y="26">
              000°
            </text>
            <text className="bio__degree" x="308" y="584">
              180°
            </text>

            {LEADERS.map((leader) => (
              <g key={leader.path}>
                <path className="bio__leader" d={leader.path} pathLength={1} />
                <circle className="bio__leader-dot" cx={leader.dot[0]} cy={leader.dot[1]} r="3.5" />
              </g>
            ))}
          </svg>

          <div className="bio__tilt" ref={tiltRef}>
            <div className="bio__viewport">
              <Image
                src="/images/haadil-portrait.jpg"
                alt="Illustrated portrait of Haadil Basha wearing glasses and a cream zip-collar shirt"
                fill
                priority
                sizes="(min-width: 900px) 300px, 60vw"
              />
              <div className="bio__tint" aria-hidden="true" />
              <div className="bio__glass" aria-hidden="true" />
              <div className="bio__scan" aria-hidden="true" />
            </div>
            <svg
              className="bio__frame"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points={OCTAGON} />
            </svg>
            <span className="bio__id" aria-hidden="true">
              {'Subject // H. Basha'}
            </span>
          </div>
        </div>

        <ul className="bio__callouts">
          {callouts.map((callout) => (
            <li className={`bio__callout bio__callout--${callout.slot}`} key={callout.key}>
              <span className="bio__callout-key">{`${callout.key} //`}</span>
              {callout.value}
            </li>
          ))}
        </ul>
      </div>

      <p className="bio__readout" aria-hidden="true">
        {'Tracking: '}
        <span ref={statusRef}>ACTIVE</span>
        {' // X:'}
        <span ref={xRef}>000</span>
        {' Y:'}
        <span ref={yRef}>000</span>
      </p>
    </div>
  )
}
