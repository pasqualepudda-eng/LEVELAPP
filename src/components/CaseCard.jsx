import { Link } from '../lib/router'
import Icon from './ui/Icon'
import Counter from './ui/Counter'

/**
 * Anteprima di un case study. `compact` toglie le metriche: serve nelle liste
 * "progetti correlati" in fondo alle pagine di dettaglio.
 */
export default function CaseCard({ item, compact = false }) {
  return (
    <article
      className="card card-hover card-accent group relative flex h-full flex-col overflow-hidden"
      style={{ '--accent': item.accent }}
    >
      <div className="accent-rule" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs">
          <span
            className="rounded-full border px-2.5 py-0.5 font-medium"
            style={{
              color: item.accent,
              borderColor: `color-mix(in oklab, ${item.accent} 40%, transparent)`,
            }}
          >
            {item.type}
          </span>
          <span className="text-fg-subtle">{item.sector}</span>
          <span className="ml-auto font-mono text-fg-subtle">{item.year}</span>
        </div>

        <h3 className="mt-4 text-xl font-semibold leading-snug">
          <Link to={`/progetti/${item.id}`} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-muted">{item.body}</p>

        {!compact && (
          <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line-muted pt-5">
            {item.metrics.map((metric) => (
              <div key={metric.label}>
                <dd className="display text-2xl" style={{ color: item.accent }}>
                  <Counter value={metric.value} suffix={metric.suffix} />
                </dd>
                <dt className="mt-1 text-[11px] leading-tight text-fg-muted">{metric.label}</dt>
              </div>
            ))}
          </dl>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-transform duration-200 group-hover:translate-x-0.5">
          Leggi il case study
          <Icon name="arrowRight" size={14} />
        </span>
      </div>
    </article>
  )
}
