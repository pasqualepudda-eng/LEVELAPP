import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { aiFeatures, services } from '../data/content'
import AiConsole from '../components/AiConsole'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import { Link } from '../lib/router'
import { EASE } from '../lib/motion'

/**
 * Sezione AI costruita come il blocco sicurezza di github.com: resta scura in
 * entrambi i temi (`.on-dark` riscrive i token della sola sezione), titolo e
 * azione al centro, la dimostrazione grande subito sotto, poi tre colonne di
 * approfondimento e due numeri di sintesi.
 */

const ai = services.find((service) => service.slug === 'ai')

/* Posizioni dei nodi nello schema (percentuali sul riquadro 100×68). */
const NODI = [
  { x: 16, y: 12 },
  { x: 84, y: 12 },
  { x: 16, y: 56 },
  { x: 84, y: 56 },
]

const ETICHETTE_NODI = ['Bot di assistenza', 'Esperienze guidate', 'Più modelli', 'Sui tuoi dati']

export default function AiSection() {
  const [nodo, setNodo] = useState(0)
  return (
    <section
      id="ai"
      className="on-dark relative overflow-hidden border-y border-line-muted py-20 md:py-28"
      style={{ '--accent': 'var(--color-success)' }}
    >
      <div className="hero-glow pointer-events-none absolute inset-x-0 -top-40 h-96 opacity-70" />
      <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-30" />

      <div className="shell relative">
        {/* Testo a sinistra, assistente a destra: stessa impaginazione della
            hero, così le due sezioni forti della home si parlano. */}
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="max-w-xl">
            <Reveal as="p" className="flex items-center gap-2 text-sm font-semibold text-success">
              <span className="inline-block h-px w-6 bg-success" />
              AI applicata
            </Reveal>

            <Reveal as="h2" delay={0.05} className="display display-hero-split mt-6 leading-[1.08]">
              AI che lavora dentro
              <br />
              <span className="text-success">i tuoi processi</span>
            </Reveal>

            <Reveal as="p" delay={0.1} className="mt-7 text-lg leading-relaxed text-fg-muted">
              Bot che rispondono ai clienti, esperienze guidate che accompagnano l'utente fino alla
              scelta giusta, sistemi in cui più modelli si passano il lavoro e assistenti che
              cercano nei tuoi documenti citando la fonte. L'innovazione che serve è quella che
              entra nei processi che hai già, non il progetto pilota che resta in una presentazione.
            </Reveal>

            <Reveal delay={0.14} className="mt-9">
              <Button to="/servizi/ai" variant="marketing" size="xl" trailingIcon="arrowRight">
                Come funziona l'AI applicata
              </Button>
            </Reveal>

            <Reveal
              as="p"
              delay={0.18}
              className="mt-7 flex items-center gap-2 text-xs text-fg-subtle"
            >
              <Icon name="lock" size={13} />
              Elaborazione su infrastruttura europea · nessun addestramento sui tuoi dati
            </Reveal>
          </div>

          {/* Dimostrazione, che sborda a destra come il gestionale nella hero */}
          <Reveal delay={0.1} y={36} className="relative lg:-mr-[calc((100vw-min(100vw,80rem))/2+3rem)]">
            <div className="spot-glow pointer-events-none absolute -inset-x-20 -top-12 bottom-0" />
            <AiConsole className="relative shadow-float" />
          </Reveal>
        </div>

        {/* Le quattro capacità come schema: al centro la richiesta, attorno i
            nodi collegati. Quello attivo accende la sua linea e apre la
            descrizione — è il modo più diretto di mostrare cosa vuol dire
            "più modelli che si passano il lavoro". */}
        <div className="mt-24 grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="relative mx-auto w-full max-w-xl">
            {/* Collegamenti */}
            <svg
              viewBox="0 0 100 68"
              className="w-full"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {NODI.map((n, i) => (
                <line
                  key={n.x}
                  x1="50"
                  y1="34"
                  x2={n.x}
                  y2={n.y}
                  stroke="var(--color-success)"
                  strokeWidth={i === nodo ? 0.7 : 0.35}
                  strokeDasharray="2 2"
                  className="transition-all duration-500"
                  opacity={i === nodo ? 0.9 : 0.22}
                />
              ))}
              {/* Nucleo */}
              <circle cx="50" cy="34" r="7" fill="var(--color-canvas-subtle)" stroke="var(--color-line)" strokeWidth="0.4" />
              <circle cx="50" cy="34" r="2.2" fill="var(--color-success)" opacity="0.9" />
              <circle cx="50" cy="34" r="10.5" stroke="var(--color-success)" strokeWidth="0.3" opacity="0.25" />
            </svg>

            {/* Nodi cliccabili, posizionati sopra lo schema */}
            {ai.highlights.map((highlight, i) => (
              <button
                key={highlight.title}
                type="button"
                onMouseEnter={() => setNodo(i)}
                onFocus={() => setNodo(i)}
                onClick={() => setNodo(i)}
                aria-pressed={i === nodo}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-1.5 text-left transition-all duration-300"
                style={{
                  left: `${NODI[i].x}%`,
                  top: `${(NODI[i].y / 68) * 100}%`,
                  borderColor:
                    i === nodo ? 'var(--color-success)' : 'var(--color-line)',
                  backgroundColor:
                    i === nodo
                      ? 'color-mix(in oklab, var(--color-success) 14%, var(--color-canvas))'
                      : 'var(--color-canvas)',
                  boxShadow:
                    i === nodo
                      ? '0 8px 24px color-mix(in oklab, var(--color-success) 22%, transparent)'
                      : 'none',
                }}
              >
                <Icon
                  name={aiFeatures[i]?.icon ?? 'sparkle'}
                  size={14}
                  style={{ color: i === nodo ? 'var(--color-success)' : 'var(--color-fg-subtle)' }}
                />
                <span
                  className="text-xs font-semibold whitespace-nowrap"
                  style={{ color: i === nodo ? 'var(--color-fg)' : 'var(--color-fg-muted)' }}
                >
                  {ETICHETTE_NODI[i]}
                </span>
              </button>
            ))}
          </div>

          {/* Dettaglio del nodo attivo */}
          <div className="min-h-[15rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={ai.highlights[nodo].title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <p className="font-mono text-xs text-success">
                  0{nodo + 1} / 0{ai.highlights.length}
                </p>
                <h3 className="display display-sub mt-4">{ai.highlights[nodo].title}</h3>
                <p className="mt-4 text-[17px] leading-relaxed text-fg-muted">
                  {ai.highlights[nodo].body}
                </p>
                <Link
                  to="/servizi/ai"
                  className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-success"
                >
                  Approfondisci
                  <Icon
                    name="arrowRight"
                    size={14}
                    className="transition-transform duration-300 group-hover/link:translate-x-1"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}
