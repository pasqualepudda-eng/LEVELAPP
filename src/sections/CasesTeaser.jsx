import { useState } from 'react'
import { cases } from '../data/content'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
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

        {/* Ogni progetto è una riga: chi è, cosa è cambiato, i numeri.
            Niente card — la lettura è orizzontale e i dati stanno in fila. */}
        <div className="mt-12 border-t border-line-muted">
          {cases.slice(0, 4).map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <article
                className="group relative border-b border-line-muted"
                style={{ '--accent': item.accent }}
              >
                {/* Tinta che invade la riga da sinistra */}
                <span
                  className="pointer-events-none absolute inset-y-0 left-0 w-0 opacity-0 transition-all duration-500 group-hover:w-full group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, color-mix(in oklab, ${item.accent} 10%, transparent), transparent 55%)`,
                  }}
                />
                {/* Filetto acceso in basso */}
                <span
                  className="absolute bottom-0 left-0 h-px w-0 transition-[width] duration-700 ease-out group-hover:w-full"
                  style={{ backgroundColor: item.accent }}
                />

                <div className="relative grid items-start gap-x-8 gap-y-4 py-8 lg:grid-cols-[15rem_1fr_16rem]">
                  {/* Chi */}
                  <div>
                    <p className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold tracking-tight text-fg">
                        {item.client}
                      </span>
                      <span className="font-mono text-xs text-fg-subtle">{item.year}</span>
                    </p>
                    <p
                      className="mt-1.5 text-xs font-semibold tracking-wide uppercase"
                      style={{ color: item.accent }}
                    >
                      {lens.of(item)}
                    </p>
                  </div>

                  {/* Cosa è cambiato */}
                  <div className="min-w-0">
                    <h3 className="text-xl leading-snug font-semibold text-fg">
                      <Link
                        to={`/progetti/${item.id}`}
                        className="transition-colors after:absolute after:inset-0 group-hover:text-[var(--accent)]"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
                      {item.body}
                    </p>
                  </div>

                  {/* I numeri, in fila */}
                  <div className="flex items-start gap-6 lg:justify-end">
                    {item.metrics.slice(0, 2).map((m) => (
                      <div key={m.label} className="min-w-0">
                        <p className="display text-2xl whitespace-nowrap text-fg">
                          {m.value}
                          {m.suffix}
                        </p>
                        <p className="mt-1 text-mini leading-snug text-fg-muted">{m.label}</p>
                      </div>
                    ))}
                    <Icon
                      name="arrowRight"
                      size={18}
                      className="mt-1 shrink-0 text-fg-subtle transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <Button to="/progetti" variant="default" size="lg" trailingIcon="arrowRight">
            Tutti i case study
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
