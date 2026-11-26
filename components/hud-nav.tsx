'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ScrambleText } from '@/components/scramble-text'
import { navLinks } from '@/lib/site-data'

const clockFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

function SystemClock() {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const update = () => setTime(clockFormat.format(new Date()))
    update()
    const id = window.setInterval(update, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className="hud-nav__clock" aria-label="Local time in India">
      {time} IST
    </span>
  )
}

export function HudNav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="hud-nav">
      <div className="container hud-nav__inner">
        <a className="hud-nav__brand" href="#top" aria-label="Haadil Basha, back to top">
          <span className="hud-nav__mark" aria-hidden="true">
            HB
          </span>
          <span className="hud-nav__brand-text">{'// SYS.ARCHITECT'}</span>
        </a>

        <nav aria-label="Primary">
          <ul className={open ? 'hud-nav__links hud-nav__links--open' : 'hud-nav__links'} id="hud-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  className="hud-nav__link"
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <ScrambleText text={link.label} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hud-nav__meta">
          <span className="hud-nav__status">
            <span className="hud-nav__dot" aria-hidden="true" />
            Online
          </span>
          <SystemClock />
          <button
            className="hud-nav__toggle"
            type="button"
            aria-expanded={open}
            aria-controls="hud-links"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
