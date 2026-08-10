import { useState } from 'react'
import { cases } from '../data/content'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Link } from '../lib/router'

/**
 * Storie dei clienti impaginate come la sezione "customer stories" di
 * github.com: titolo lungo, una fila di tab che cambia la chiave di lettura e
 * tre card con testata colorata, marchio del cliente e link al racconto.
 *
 * I progetti sono sempre gli stessi tre: la tab non filtra, cambia l'etichetta
 * con cui vengono classificati — settore, tipo di software, durata.
 */

const LENSES = [
  { id: 'settore', label: 'Per settore', of: (item) => item.sector },
  { id: 'tipo', label: 'Per tipo di software', of: (item) => item.type },
  { id: 'durata', label: 'Per durata', of: (item) => `${item.duration} · ${item.team}` },
]

export default function CasesTeaser() {
  const [lensId, setLensId] = useState(LENSES[0].id)
  const lens = LENSES.find((item) => item.id === lensId) ?? LENSES[0]

  return (
    <section id="progetti" className="border-b border-line-muted py-20 md:py-28">
      <div className="shell">
        <Reveal as="h2" className="display display-section max-w-4xl">
          Dalle PMI ai gruppi industriali, il su misura scala con la squadra che hai
        </Reveal>

        {/* Tab della chiave di lettura */}
        <Reveal delay={0.06} className="mt-8">
          <div
            role="group"
            aria-label="Chiave di lettura dei progetti"
            className="flex gap-6 overflow-x-auto border-b border-line-muted"
          >
            {LENSES.map((item) => {
              const selected = item.id === lensId
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setLensId(item.id)}
                  className={`-mb-px shrink-0 border-b-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    selected
                      ? 'border-fg text-fg'
                      : 'border-transparent text-fg-muted hover:text-fg'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <RevealItem key={item.id}>
              <article
                className="card card-hover group relative flex h-full flex-col overflow-hidden"
                style={{ '--accent': item.accent }}
              >
                {/* Testata colorata: prende il posto della foto di copertina */}
                <div
                  className="relative flex h-32 items-end p-5"
                  style={{
                    background: `linear-gradient(150deg, color-mix(in oklab, ${item.accent} 28%, transparent), transparent 70%)`,
                  }}
                >
                  <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
                  <span className="relative text-xl font-semibold tracking-tight text-fg">
                    {item.client}
                  </span>
                  <span className="relative ml-auto font-mono text-xs text-fg-muted">
                    {item.year}
                  </span>
                </div>

                <div className="flex flex-1 flex-col border-t border-line-muted p-5">
                  <p
                    className="text-xs font-semibold tracking-wide uppercase"
                    style={{ color: item.accent }}
                  >
                    {lens.of(item)}
                  </p>

                  <h3 className="mt-3 text-lg leading-snug font-semibold">
                    <Link to={`/progetti/${item.id}`} className="after:absolute after:inset-0">
                      {item.title}
                    </Link>
                  </h3>

                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-muted">
                    {item.body}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
                    Leggi il case study
                    <Icon
                      name="arrowRight"
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <Button to="/progetti" variant="default" size="lg" trailingIcon="arrowRight">
            Tutti i case study
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
