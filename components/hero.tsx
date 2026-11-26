'use client'

import { useLayoutEffect, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight, Trophy } from 'lucide-react'
import { BiometricPortrait } from '@/components/biometric-portrait'
import { Magnetic } from '@/components/magnetic'
import { NeuralCanvas } from '@/components/neural-canvas'
import { useSiteReady } from '@/components/site-ready'
import { gsap, prefersReducedMotion } from '@/lib/scroll-fx'

const HEADLINE = "Hi, I'm Haadil Basha — AI/ML Engineer, Content Creator, & World Record Holder."

const TITLE_LINES: { text: string; tone?: 'cyan' | 'gold' }[][] = [
  [{ text: 'Hi,' }, { text: "I'm" }, { text: 'Haadil' }, { text: 'Basha' }, { text: '—' }],
  [
    { text: 'AI/ML', tone: 'cyan' },
    { text: 'Engineer,', tone: 'cyan' },
  ],
  [{ text: 'Content' }, { text: 'Creator,' }],
  [
    { text: '&' },
    { text: 'World', tone: 'gold' },
    { text: 'Record', tone: 'gold' },
    { text: 'Holder.', tone: 'gold' },
  ],
]

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const ready = useSiteReady()

  useLayoutEffect(() => {
    if (!ready || prefersReducedMotion()) return

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.split__inner', { yPercent: 118, duration: 1.8, stagger: 0.075 })
        .from('[data-hero-fade]', { y: 28, autoAlpha: 0, duration: 1.5, stagger: 0.14 }, 0.55)
        .from('.bio__header', { autoAlpha: 0, duration: 1.2 }, 0.4)
        .from('.bio__tilt', { scale: 0.8, autoAlpha: 0, duration: 2.2, ease: 'power3.out' }, 0.3)
        .from('.bio__rings', { scale: 0.7, autoAlpha: 0, duration: 2.6, ease: 'power3.out' }, 0.3)
        .fromTo(
          '.bio__leader',
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.5, stagger: 0.16, ease: 'power2.inOut' },
          1.3,
        )
        .from('.bio__leader-dot', { autoAlpha: 0, duration: 0.6, stagger: 0.16 }, 2.3)
        .from('.bio__callout', { autoAlpha: 0, y: 10, duration: 1, stagger: 0.16 }, 1.7)
        .from('.bio__readout', { autoAlpha: 0, duration: 1 }, 2.2)
    }, rootRef)

    return () => context.revert()
  }, [ready])

  return (
    <section className="hero" id="top" ref={rootRef}>
      <NeuralCanvas />
      <div className="hero__vignette" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow" data-hero-fade>
            {'System online // Portfolio 2026'}
          </p>

          <h1 className="hero__title">
            <span className="sr-only">{HEADLINE}</span>
            <span aria-hidden="true">
              {TITLE_LINES.map((line, lineIndex) => (
                <span className="hero__line" key={lineIndex}>
                  {line.map((word, wordIndex) => (
                    <span key={word.text}>
                      {wordIndex > 0 ? ' ' : null}
                      <span className={word.tone ? `split split--${word.tone}` : 'split'}>
                        <span className="split__inner">{word.text}</span>
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero__lede" data-hero-fade>
            B.Tech CSE at IIIT Sri City. I build deep learning systems that forecast instead of
            react — from driver drowsiness prediction with GRU/TCN to production-style regression
            pipelines — and break them down for other developers as @codeh.
          </p>

          <div className="hero__actions" data-hero-fade>
            <Magnetic>
              <a className="btn btn--primary" href="#deployments">
                View deployments
                <ArrowDownRight aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn--ghost" href="#transmit">
                Open a channel
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Magnetic>
          </div>

          <ul className="hero__badges" data-hero-fade>
            <li className="milestone">
              <Trophy aria-hidden="true" />
              {'Milestone // World Record Holder'}
            </li>
            <li className="milestone milestone--plain">GDG AI/ML Executive</li>
            <li className="milestone milestone--plain">@codeh</li>
          </ul>
        </div>

        <BiometricPortrait />
      </div>

      <p className="hero__scroll" aria-hidden="true">
        Scroll
      </p>
    </section>
  )
}
