import { Link } from '../lib/router'
import { services, cases } from '../data/content'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'

/** Pagina 404, mostrata anche quando uno slug non corrisponde a nulla. */
export default function NotFound() {
  const suggestions = [
    ...services.map((s) => ({ label: s.title, to: `/servizi/${s.slug}`, icon: s.icon })),
    ...cases.map((c) => ({ label: `${c.type} · ${c.client}`, to: `/progetti/${c.id}`, icon: 'book' })),
  ]

  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-x-0 -top-40 h-96 opacity-40" />
      <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-40" />

      <div className="shell relative py-24 text-center md:py-32">
        <p className="font-mono text-sm text-fg-subtle">404</p>

        <h1 className="display mx-auto mt-4 max-w-2xl text-4xl sm:text-5xl">
          Questa pagina non esiste (ancora)
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg text-fg-muted">
          Il link potrebbe essere vecchio o scritto male. Da qui puoi tornare in home o andare
          direttamente a quello che cercavi.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button to="/" variant="primary" size="xl" icon="arrowRight">
            Torna alla home
          </Button>
          <Button to="/contatti" variant="default" size="xl" icon="mail">
            Scrivici
          </Button>
        </div>

        <ul className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-2">
          {suggestions.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="card card-hover flex items-center gap-3 p-4 text-left text-sm"
              >
                <Icon name={item.icon} size={16} className="shrink-0 text-fg-muted" />
                <span className="min-w-0 flex-1 truncate text-fg">{item.label}</span>
                <Icon name="arrowRight" size={14} className="shrink-0 text-fg-subtle" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
