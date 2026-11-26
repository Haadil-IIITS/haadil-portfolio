import { ArrowUpRight } from 'lucide-react'
import { CopyEmail } from '@/components/copy-email'
import { Magnetic } from '@/components/magnetic'
import { ScrambleText } from '@/components/scramble-text'
import { profile } from '@/lib/site-data'

const PROMPT = 'haadil@iiits:~$'

export function ContactTerminal() {
  return (
    <section className="contact" id="transmit" aria-labelledby="transmit-title">
      <div className="container">
        <header className="section-head">
          <p className="section-head__tag">
            <ScrambleText text="04 // TRANSMIT" />
          </p>
          <h2 className="section-head__title" id="transmit-title" data-reveal>
            Open a channel
          </h2>
          <span className="section-head__rule" data-draw aria-hidden="true" />
        </header>

        <div className="contact__grid">
          <div className="contact__pitch" data-reveal>
            <p>
              Available for December 2026 hackathons, research collaborations and engineering
              roles. The fastest route is email.
            </p>
            <Magnetic strength={0.45}>
              <a className="btn btn--primary btn--lg" href={`mailto:${profile.email}`}>
                Initiate transmission
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Magnetic>
          </div>

          <div className="terminal" data-reveal>
            <div className="terminal__bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>transmit.sh</span>
            </div>
            <div className="terminal__body">
              <p className="terminal__line">
                <b>{PROMPT}</b> whoami
              </p>
              <p className="terminal__out">
                {profile.fullName} — AI/ML engineer, content creator, world record holder
              </p>

              <p className="terminal__line">
                <b>{PROMPT}</b> contact --list
              </p>
              <ul className="terminal__rows">
                <li>
                  <span className="terminal__key">Email</span>
                  <a className="terminal__value" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                  <CopyEmail email={profile.email} />
                </li>
                <li>
                  <span className="terminal__key">GitHub</span>
                  <span className="terminal__value">{`github.com/${profile.githubHandle}`}</span>
                  <a
                    className="terminal__action"
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open
                    <ArrowUpRight aria-hidden="true" />
                    <span className="sr-only"> GitHub profile in a new tab</span>
                  </a>
                </li>
                {profile.linkedinUrl ? (
                  <li>
                    <span className="terminal__key">LinkedIn</span>
                    <span className="terminal__value">
                      {profile.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                    <a
                      className="terminal__action"
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open
                      <ArrowUpRight aria-hidden="true" />
                      <span className="sr-only"> LinkedIn profile in a new tab</span>
                    </a>
                  </li>
                ) : null}
              </ul>

              <p className="terminal__line">
                <b>{PROMPT}</b> status
              </p>
              <p className="terminal__out terminal__out--ok">{profile.availability}</p>

              <p className="terminal__line" aria-hidden="true">
                <b>{PROMPT}</b> <span className="terminal__cursor" />
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <span>{`© 2026 ${profile.fullName}`}</span>
          <span>Next.js • GSAP • Lenis • Three.js</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </section>
  )
}
