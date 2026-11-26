import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function hasFinePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function initScrollFx() {
  return gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: 56,
        autoAlpha: 0,
        duration: 1.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })

    gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
      gsap.from(group.querySelectorAll('[data-reveal-item]'), {
        y: 40,
        autoAlpha: 0,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.14,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      })
    })

    gsap.utils.toArray<HTMLElement>('[data-draw]').forEach((el) => {
      gsap.from(el, {
        scaleX: 0,
        duration: 1.8,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
    })

    gsap.utils.toArray<SVGElement>('[data-draw-path]').forEach((el) => {
      gsap.fromTo(
        el,
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 2.4,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('[data-scrub-card]').forEach((cell) => {
      gsap.fromTo(
        cell.firstElementChild,
        { autoAlpha: 0.08, scale: 0.9, y: 72 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: { trigger: cell, start: 'top 100%', end: 'top 62%', scrub: 1.2 },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('[data-gauge]').forEach((el) => {
      gsap.from(el, {
        scaleX: 0,
        duration: 2,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 94%', once: true },
      })
    })

    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count)
      const counter = { value: 0 }
      gsap.to(counter, {
        value: target,
        duration: 2.2,
        ease: 'power3.out',
        onUpdate: () => {
          el.textContent = String(Math.round(counter.value))
        },
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
    })

    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
      const amount = Number(el.dataset.parallax)
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })
  })
}

export { gsap, ScrollTrigger }
