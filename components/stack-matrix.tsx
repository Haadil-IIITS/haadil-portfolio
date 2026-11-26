import type { CSSProperties } from 'react'
import { ScrambleText } from '@/components/scramble-text'
import { stackMatrix } from '@/lib/site-data'

const READOUTS = ['LeetCode // 90+ solved', 'Domain // AI/ML + Backend', 'Class // 2029']

export function StackMatrix() {
  return (
    <section className="telemetry" id="telemetry" aria-labelledby="telemetry-title">
      <div className="container">
        <header className="section-head">
          <p className="section-head__tag">
            <ScrambleText text="03 // TELEMETRY" />
          </p>
          <h2 className="section-head__title" id="telemetry-title" data-reveal>
            Technical stack matrix
          </h2>
          <span className="section-head__rule" data-draw aria-hidden="true" />
        </header>

        <ul className="telemetry__readouts" data-reveal>
          {READOUTS.map((readout) => (
            <li className="milestone milestone--plain" key={readout}>
              {readout}
            </li>
          ))}
        </ul>

        <div className="matrix" data-reveal-group>
          {stackMatrix.map((spec) => (
            <article className="spec" key={spec.id} data-reveal-item>
              <header className="spec__head">
                <h3 className="spec__title">{spec.title}</h3>
                <span className="spec__id">{spec.id}</span>
              </header>
              <ul className="spec__rows">
                {spec.items.map((item) => (
                  <li key={item.name}>
                    <div className="spec__row-head">
                      <span>{item.name}</span>
                      <span className="spec__pct" aria-hidden="true">
                        <span data-count={item.level}>{item.level}</span>%
                      </span>
                    </div>
                    <div
                      className="gauge"
                      role="meter"
                      aria-label={`${item.name} proficiency`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={item.level}
                    >
                      <span
                        className="gauge__fill"
                        data-gauge
                        style={{ '--gauge': item.level / 100 } as CSSProperties}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
