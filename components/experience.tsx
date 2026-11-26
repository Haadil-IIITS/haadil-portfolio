'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { Preloader } from '@/components/preloader'
import { SiteReadyContext } from '@/components/site-ready'
import { gsap, initScrollFx, prefersReducedMotion, ScrollTrigger } from '@/lib/scroll-fx'

const HEADER_OFFSET = -64

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Experience({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.9,
      anchors: { offset: HEADER_OFFSET },
    })
    lenisRef.current = lenis
    lenis.stop()

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const fx = initScrollFx()
    document.fonts.ready.then(() => ScrollTrigger.refresh())

    return () => {
      fx.revert()
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    lenisRef.current?.start()
    ScrollTrigger.refresh()
  }, [ready])

  const handleLoaded = useCallback(() => setReady(true), [])

  return (
    <SiteReadyContext.Provider value={ready}>
      <Preloader onComplete={handleLoaded} />
      {children}
    </SiteReadyContext.Provider>
  )
}
