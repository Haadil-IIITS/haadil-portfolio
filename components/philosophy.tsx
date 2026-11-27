import Image from 'next/image'
import { ScrambleText } from '@/components/scramble-text'
import { credential, education, principles } from '@/lib/site-data'

export function Philosophy() {
  return (
    <section className="paper philosophy" id="architecture" aria-labelledby="architecture-title">
      <div className="stripes" aria-hidden="true" />
      <div className="container">
        <header className="section-head section-head--ink">
          <p className="section-head__tag">
            <ScrambleText text="01 // ARCHITECTURE" />
          </p>
          <h2 className="section-head__title" id="architecture-title" data-reveal>
            Engineering philosophy
          </h2>
          <span className="section-head__rule" data-draw aria-hidden="true" />
        </header>

        <div className="philosophy__grid">
          <div>
            <p className="philosophy__lead" data-reveal>
              I treat machine learning like systems engineering: <em>measure the signal</em>,
              forecast the failure, ship the pipeline.
            </p>
            <p className="philosophy__text" data-reveal>
              I&apos;m a B.Tech Computer Science student at IIIT Sri City, building ML pipelines
              that predict rather than react — regression systems with k-NN imputation and log
              transforms to tame skewed, messy real-world data.
            </p>
            <p className="philosophy__text" data-reveal>
              Outside the lab I&apos;m part of a Guinness World Records team achievement, break
              down software architecture and ML implementations as @codeh, and help run the AI/ML
              domain at Google Developer Groups.
            </p>

            <ol className="principles" data-reveal-group>
              {principles.map((principle) => (
                <li key={principle.title} data-reveal-item>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="philosophy__side" aria-label="Background">
            <figure className="photo-frame" data-reveal>
              <div className="photo-frame__media philosophy__photo">
                <Image
                  src="/images/haadil-thinking.jpg"
                  alt="Sketch of Haadil smiling thoughtfully beside a laptop"
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  data-parallax="5"
                />
              </div>
              <figcaption>
                <span>Fig. 01</span>
                <span>Thinking in systems</span>
              </figcaption>
            </figure>

            <div className="record-badge" data-reveal>
              <div className="record-badge__photo">
                <Image src={credential.image} alt={credential.alt} width={96} height={133} />
              </div>
              <div>
                <p className="record-badge__label">{credential.label}</p>
                <p className="record-badge__title">{credential.title}</p>
                <p className="record-badge__meta">{credential.meta}</p>
              </div>
            </div>

            <div className="spec-sheet" data-reveal>
              <h3 className="spec-sheet__head">{'Education // Background'}</h3>
              <dl>
                {education.map((row) => (
                  <div key={row.key}>
                    <dt>{row.key}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
