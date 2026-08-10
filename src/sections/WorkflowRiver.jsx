import { cases, pillars, services, stats } from '../data/content'
import Counter from '../components/ui/Counter'
import Icon from '../components/ui/Icon'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Link } from '../lib/router'

/**
 * Il blocco centrale della home, con l'impaginazione a "bento" delle pagine
 * marketing di GitHub: una card grande con la dimostrazione, accanto la prova
 * sociale (citazione di un cliente) e un numero di sintesi, sotto le card
 * di pari peso con un link ciascuna.
 */

const proof = cases[0]
const renewal = stats.find((stat) => stat.label === 'Clienti che rinnovano') ?? stats[2]

/** Elenco di ciò che viene consegnato: il "prodotto" della card grande. */
const handover = [
  { label: 'Repository e cronologia dei commit', meta: 'git' },
  { label: 'Documentazione tecnica e manuale utente', meta: 'md' },
  { label: 'Infrastruttura e credenziali', meta: 'cloud' },
  { label: 'Pipeline di rilascio e ambienti', meta: 'ci' },
]

function HandoverPanel() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-lg border border-line bg-canvas shadow-card"
    >
      <div className="flex items-center gap-2 border-b border-line bg-canvas-subtle px-3 py-2">
        <Icon name="lock" size={13} className="text-fg-subtle" />
        <span className="font-mono text-[11px] text-fg-muted">consegna-progetto</span>
        <span className="ml-auto rounded-full border border-success px-2 py-0.5 text-[10px] font-medium text-success">
          intestato a te
        </span>
      </div>

      <ul>
        {handover.map((row) => (
          <li
            key={row.label}
            className="flex items-center gap-2.5 border-b border-line-muted px-3 py-2.5 text-xs last:border-0"
          >
            <Icon name="check" size={13} className="shrink-0 text-success" />
            <span className="min-w-0 flex-1 truncate text-fg">{row.label}</span>
            <span className="font-mono text-[10px] text-fg-subtle">{row.meta}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-line bg-canvas-subtle px-3 py-2 font-mono text-[11px] text-fg-muted">
        consegna completa · nessuna dipendenza da noi
      </div>
    </div>
  )
}

export default function WorkflowRiver() {
  return (
    <section id="flusso" className="border-b border-line-muted py-20 md:py-28">
      <div className="shell">
        <Reveal as="h2" className="display display-section max-w-4xl">
          Dal processo o dall’idea, fino alla produzione
        </Reveal>
        <Reveal as="p" delay={0.06} className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
          Che si parta da un processo che ti costa ore o da un’intuizione che nel tuo settore
          non ha ancora un software, il percorso è lo stesso: un solo team segue analisi, codice e
          infrastruttura fino alla messa in produzione. Alla fine è tuo — repository, dati,
          ambienti e proprietà intellettuale intestati alla tua azienda.
        </Reveal>

        {/* Riga 1: card grande + prova sociale + numero */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <article
              className="card card-accent flex h-full flex-col gap-8 p-6 md:flex-row md:items-center md:p-8"
              style={{ '--accent': pillars[0].accent }}
            >
              <div className="flex-1">
                <h3 className="display-sub display">{pillars[0].title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{pillars[0].body}</p>

                <Link
                  to="/servizi"
                  className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                >
                  Come lavoriamo
                  <Icon
                    name="arrowRight"
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              <div className="w-full md:w-80 md:shrink-0">
                <HandoverPanel />
              </div>
            </article>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {/* Prova sociale: la citazione di un cliente, come le card
                "Read customer story" di github.com */}
            <Reveal delay={0.06}>
              <figure className="card card-hover group relative flex h-full flex-col p-6">
                <Icon name="quote" size={20} className="text-fg-subtle" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-fg">
                  {proof.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-line-muted pt-4">
                  <span className="block text-sm font-semibold text-fg">{proof.client}</span>
                  <span className="block text-xs text-fg-muted">{proof.author}</span>
                  <Link
                    to={`/progetti/${proof.id}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent after:absolute after:inset-0"
                  >
                    Leggi il case study
                    <Icon name="arrowRight" size={12} />
                  </Link>
                </figcaption>
              </figure>
            </Reveal>

            {/* Numero di sintesi, al posto del riquadro "industry report" */}
            <Reveal delay={0.12}>
              <div className="card flex h-full flex-col justify-center p-6">
                <p className="display text-5xl text-success">
                  <Counter value={renewal.value} suffix={renewal.suffix} />
                </p>
                <p className="mt-2 text-sm font-semibold text-fg">{renewal.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-fg-muted">
                  Progetti lunghi e rapporti lunghi: la manutenzione resta con chi ha scritto il
                  codice, non con un call center.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Riga 2: un servizio per card, tutte dello stesso peso */}
        <RevealGroup className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealItem key={service.slug}>
              <article className="card card-hover group relative flex h-full flex-col p-6">
                <span
                  className="flex size-10 items-center justify-center rounded-lg border border-line bg-canvas"
                  style={{ color: service.accent }}
                >
                  <Icon name={service.icon} size={18} />
                </span>

                <h3 className="mt-5 text-lg font-semibold text-fg">{service.title}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-fg-muted">
                  {service.short}
                </p>

                <Link
                  to={`/servizi/${service.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold after:absolute after:inset-0"
                  style={{ color: service.accent }}
                >
                  Esplora
                  <Icon
                    name="arrowRight"
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
