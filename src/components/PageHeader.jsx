import { Link } from '../lib/router'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'

/**
 * Testata delle pagine interne: briciole di pane, occhiello colorato, titolo e
 * catenaccio. Sfondo comune a tutte, così la navigazione resta riconoscibile.
 */
export default function PageHeader({
  breadcrumbs = [],
  eyebrow,
  title,
  lead,
  accent = 'var(--color-accent)',
  children,
  aside,
}) {
  return (
    <header className="relative overflow-hidden border-b border-line-muted" style={{ '--accent': accent }}>
      <div className="hero-glow pointer-events-none absolute inset-x-0 -top-40 h-80 opacity-45" />
      <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-40" />

      <div className="shell relative py-14 md:py-20">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Percorso">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-fg-muted">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.to ?? crumb.label} className="flex items-center gap-1.5">
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-accent hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-fg">{crumb.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <Icon name="chevronRight" size={12} className="text-fg-subtle" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={aside ? 'mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end' : 'mt-6'}>
          <div className={aside ? '' : 'max-w-3xl'}>
            {eyebrow && (
              <Reveal
                as="p"
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: accent }}
              >
                <span className="inline-block h-px w-6" style={{ backgroundColor: accent }} />
                {eyebrow}
              </Reveal>
            )}

            <Reveal as="h1" delay={0.05} className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
              {title}
            </Reveal>

            {lead && (
              <Reveal as="p" delay={0.1} className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
                {lead}
              </Reveal>
            )}

            {children && <div className="mt-8">{children}</div>}
          </div>

          {aside && <div>{aside}</div>}
        </div>
      </div>
    </header>
  )
}
