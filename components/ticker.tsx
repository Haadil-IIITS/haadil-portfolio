import { tickerItems } from '@/lib/site-data'

export function Ticker() {
  return (
    <section className="ticker" aria-label="Highlights">
      <div className="ticker__track">
        {[false, true].map((duplicate) => (
          <ul className="ticker__list" key={String(duplicate)} aria-hidden={duplicate || undefined}>
            {tickerItems.map((item) => (
              <li className="ticker__item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
