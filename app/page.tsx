import { Community } from '@/components/community'
import { ContactTerminal } from '@/components/contact-terminal'
import { Deployments } from '@/components/deployments'
import { Experience } from '@/components/experience'
import { Hero } from '@/components/hero'
import { HudNav } from '@/components/hud-nav'
import { Philosophy } from '@/components/philosophy'
import { StackMatrix } from '@/components/stack-matrix'
import { Ticker } from '@/components/ticker'

export default function Page() {
  return (
    <Experience>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <HudNav />
      <main id="main">
        <Hero />
        <Ticker />
        <Philosophy />
        <Deployments />
        <StackMatrix />
        <Community />
        <ContactTerminal />
      </main>
    </Experience>
  )
}
