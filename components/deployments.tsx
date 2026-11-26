import { Schematic } from '@/components/schematic'
import { ScrambleText } from '@/components/scramble-text'
import { projects } from '@/lib/site-data'

export function Deployments() {
  return (
    <section className="deployments" id="deployments" aria-labelledby="deployments-title">
      <div className="container">
        <header className="section-head">
          <p className="section-head__tag">
            <ScrambleText text="02 // DEPLOYMENTS" />
          </p>
          <h2 className="section-head__title" id="deployments-title" data-reveal>
            Featured deployments
          </h2>
          <span className="section-head__rule" data-draw aria-hidden="true" />
        </header>

        <div className="bento">
          {projects.map((project) => (
            <div className={`bento__cell bento__cell--${project.span}`} data-scrub-card key={project.id}>
              <article className="dossier">
                <div className="dossier__bar">
                  <span>{project.id}</span>
                  <span className={`pill pill--${project.pill.tone}`}>{project.pill.label}</span>
                </div>
                <div className="dossier__schematic">
                  <Schematic kind={project.schematic} />
                </div>
                <div className="dossier__body">
                  <h3 className="dossier__name">{project.name}</h3>
                  <p className="dossier__sub">{project.subtitle}</p>
                  <p className="dossier__desc">{project.description}</p>
                  <dl className="dossier__metrics">
                    {project.metrics.map((metric) => (
                      <div key={metric.key}>
                        <dt>{metric.key}</dt>
                        <dd>{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <ul className="dossier__stack" aria-label="Tech stack">
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
