import Image from 'next/image'
import { ScrambleText } from '@/components/scramble-text'
import { creatorTopics, impactStats, profile, roles } from '@/lib/site-data'

export function Community() {
  return (
    <section className="paper community" id="signal" aria-labelledby="signal-title">
      <div className="stripes" aria-hidden="true" />
      <div className="container">
        <header className="section-head section-head--ink">
          <p className="section-head__tag">
            <ScrambleText text="LEADERSHIP // COMMUNITY IMPACT" />
          </p>
          <h2 className="section-head__title" id="signal-title" data-reveal>
            Building in public, leading in person
          </h2>
          <span className="section-head__rule" data-draw aria-hidden="true" />
        </header>

        <ul className="community__stats" data-reveal-group>
          {impactStats.map((stat) => (
            <li key={stat.label} data-reveal-item>
              <span className="community__value">
                <span data-count={stat.value}>{stat.value}</span>
                {stat.suffix}
              </span>
              <span className="community__label">{stat.label}</span>
              <span className="community__detail">{stat.detail}</span>
            </li>
          ))}
        </ul>

        <div className="community__grid">
          <figure className="photo-frame" data-reveal>
            <div className="photo-frame__media community__photo">
              <Image
                src="/images/haadil-speaking.jpg"
                alt="Sketch of Haadil presenting with a microphone in a blue shirt"
                fill
                sizes="(min-width: 1024px) 460px, 90vw"
                data-parallax="5"
              />
            </div>
            <figcaption>
              <span>Fig. 02</span>
              <span>Leading a technical session</span>
            </figcaption>
          </figure>

          <div className="community__content">
            <ul className="community__roles" data-reveal-group>
              {roles.map((role) => (
                <li key={role.org} data-reveal-item>
                  <p className="community__org">{role.org}</p>
                  <h3 className="community__role">{role.role}</h3>
                  <p className="community__role-text">{role.text}</p>
                </li>
              ))}
            </ul>

            <div className="creator" data-reveal>
              <div>
                <p className="creator__tag">{'Content creator hub // Technical breakdowns'}</p>
                <h3 className="creator__handle">{profile.creatorHandle}</h3>
                <p className="creator__text">
                  Educating developers on how real systems are put together — one build, one
                  breakdown at a time.
                </p>
                <ul className="creator__topics" aria-label="Topics covered">
                  {creatorTopics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>
              <div className="creator__photo">
                <Image
                  src="/images/haadil-seated.jpg"
                  alt="Sketch of Haadil seated and smiling"
                  fill
                  sizes="176px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
