import { Link } from '../lib/router'
import Icon from './ui/Icon'

/**
 * Card di servizio, condivisa fra home e pagina servizi. Tutta la card è
 * cliccabile perché il link copre l'area con uno pseudo-elemento, ma il testo
 * resta selezionabile e il focus da tastiera va sul titolo.
 */
export default function ServiceCard({ service }) {
  return (
    <article
      className="card card-hover card-accent group relative flex w-full flex-col p-6"
      style={{ '--accent': service.accent }}
    >
      <span
        className="flex size-10 items-center justify-center rounded-lg border border-line bg-canvas"
        style={{ color: service.accent }}
      >
        <Icon name={service.icon} size={18} />
      </span>

      <h3 className="mt-5 text-lg font-semibold text-fg">
        <Link to={`/servizi/${service.slug}`} className="after:absolute after:inset-0">
          {service.title}
        </Link>
      </h3>

      <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-fg-muted">{service.short}</p>

      {service.tempi && (
        <p
          className="mt-4 flex items-center gap-1.5 text-[13px] font-medium"
          style={{ color: service.accent }}
        >
          <Icon name="clock" size={13} />
          {service.tempi}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-fg-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <span
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-transform duration-200 group-hover:translate-x-0.5"
        style={{ color: service.accent }}
      >
        Scopri di più
        <Icon name="arrowRight" size={14} />
      </span>
    </article>
  )
}
