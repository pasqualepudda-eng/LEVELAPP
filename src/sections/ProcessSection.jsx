import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { process, testimonials } from '../data/content'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import { usePrefersReducedMotion } from '../lib/useMediaQuery'
import { EASE } from '../lib/motion'

/**
 * Le quattro fasi disegnate su una linea di quattro settimane, come un
 * diagramma di Gantt: si vede a colpo d'occhio che le fasi si sovrappongono e
 * che il tutto sta dentro il mese promesso.
 *
 * Cliccando una barra si apre il dettaglio sotto. Finché non si tocca niente
 * la selezione avanza da sola ogni sei secondi; con `prefers-reduced-motion`
 * resta ferma.
 */

/* Posizione delle barre in percentuale sulle quattro settimane.
   Le durate arrivano da `process`, qui c'è solo la loro collocazione. */
const BARRE = [
  { da: 0, a: 14 },
  { da: 11, a: 38 },
  { da: 33, a: 88 },
  { da: 80, a: 100 },
]

const SETTIMANE = ['Settimana 1', 'Settimana 2', 'Settimana 3', 'Settimana 4']

const quote = testimonials.find((item) => item.text.includes('analisi')) ?? testimonials[0]
const ROTAZIONE_MS = 6000

export default function ProcessSection() {
  const [attiva, setAttiva] = useState(0)
  const [ferma, setFerma] = useState(false)
  const ridotto = usePrefersReducedMotion()

  useEffect(() => {
    if (ferma || ridotto) return
    const id = setInterval(() => setAttiva((v) => (v + 1) % process.length), ROTAZIONE_MS)
    return () => clearInterval(id)
  }, [ferma, ridotto])

  function scegli(i) {
    setFerma(true)
    setAttiva(i)
  }

  const fase = process[attiva]

  return (
    <section
      id="metodo"
      className="border-b border-line-muted py-20 md:py-28"
      style={{ '--accent': 'var(--color-orange)' }}
    >
      <div className="shell">
        <Reveal as="h2" className="display display-section max-w-3xl">
          Quattro settimane, viste dall’alto
        </Reveal>
        <Reveal as="p" delay={0.06} className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
          Le fasi non si aspettano l’una con l’altra: si sovrappongono, e il rilascio sta dentro il
          mese. Tocca una barra per vedere cosa succede in quel tratto.
        </Reveal>

        {/* Righello delle settimane */}
        <Reveal delay={0.1} className="mt-14">
          <div className="grid grid-cols-[8.5rem_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[13rem_minmax(0,1fr)]">
            <span className="font-mono text-[11px] text-fg-subtle">fase</span>
            <div className="grid grid-cols-4 border-b border-line-muted pb-2">
              {SETTIMANE.map((s) => (
                <span key={s} className="font-mono text-[11px] text-fg-subtle">
                  <span className="hidden sm:inline">{s}</span>
                  <span className="sm:hidden">S{s.slice(-1)}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Barre */}
          <div className="mt-3 space-y-2">
            {process.map((f, i) => {
              const barra = BARRE[i]
              const scelta = i === attiva
              return (
                <button
                  key={f.step}
                  type="button"
                  onClick={() => scegli(i)}
                  aria-pressed={scelta}
                  className="group grid w-full grid-cols-[8.5rem_minmax(0,1fr)] items-center gap-4 rounded-lg py-2 text-left transition-colors hover:bg-canvas-subtle sm:grid-cols-[13rem_minmax(0,1fr)]"
                >
                  <span className="min-w-0 pl-2">
                    <span className="flex items-center gap-2">
                      <span
                        className="font-mono text-xs transition-colors"
                        style={{ color: scelta ? 'var(--color-orange)' : 'var(--color-fg-subtle)' }}
                      >
                        {f.step}
                      </span>
                      <span
                        className="truncate text-sm font-semibold transition-colors"
                        style={{ color: scelta ? 'var(--color-fg)' : 'var(--color-fg-muted)' }}
                      >
                        {f.title}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[10px] text-fg-subtle">
                      {f.duration}
                    </span>
                  </span>

                  {/* Corsia con le linee di settimana e la barra della fase */}
                  <span className="relative block h-9 overflow-hidden">
                    <span className="absolute inset-0 grid grid-cols-4">
                      {SETTIMANE.map((s) => (
                        <span key={s} className="border-l border-dashed border-line-muted" />
                      ))}
                    </span>

                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: '-10% 0px' }}
                      transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                      className="absolute top-1.5 bottom-1.5 origin-left rounded-md border transition-[background-color,border-color,box-shadow] duration-300"
                      style={{
                        left: `${barra.da}%`,
                        width: `${barra.a - barra.da}%`,
                        backgroundColor: scelta
                          ? 'color-mix(in oklab, var(--color-orange) 26%, transparent)'
                          : 'color-mix(in oklab, var(--color-orange) 10%, transparent)',
                        borderColor: scelta
                          ? 'var(--color-orange)'
                          : 'color-mix(in oklab, var(--color-orange) 35%, transparent)',
                        boxShadow: scelta
                          ? '0 8px 24px color-mix(in oklab, var(--color-orange) 20%, transparent)'
                          : 'none',
                      }}
                    >
                      {/* Segno di fine tratto: niente testo dentro la barra,
                          così non può mai uscire dai suoi bordi. */}
                      <span
                        className="absolute top-1/2 right-1.5 size-1.5 -translate-y-1/2 rounded-full transition-opacity"
                        style={{
                          backgroundColor: 'var(--color-orange)',
                          opacity: scelta ? 1 : 0.55,
                        }}
                      />
                    </motion.span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Coda: dopo il rilascio si continua */}
          <div className="mt-2 grid grid-cols-[8.5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[13rem_minmax(0,1fr)]">
            <span />
            <span className="flex items-center justify-end gap-1.5 font-mono text-[10px] text-fg-subtle">
              poi manutenzione e evolutive
              <Icon name="arrowRight" size={11} />
            </span>
          </div>
        </Reveal>

        {/* Dettaglio della fase scelta */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={fase.step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <p className="flex items-center gap-2 font-mono text-xs text-orange">
                fase {fase.step} · {fase.duration}
              </p>
              <h3 className="display display-sub mt-3">{fase.title}</h3>
              <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-fg-muted">{fase.body}</p>

              <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {fase.activities.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-[15px] text-fg">
                    <Icon name="check" size={14} className="mt-1 shrink-0 text-orange" />
                    {a}
                  </li>
                ))}
              </ul>

              <p className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line bg-canvas-subtle px-3 py-2 text-sm">
                <Icon name="file" size={14} className="shrink-0 text-fg-subtle" />
                <span className="text-fg-muted">Ti resta in mano:</span>
                <span className="font-medium text-fg">{fase.deliverable}</span>
              </p>
            </motion.div>
          </AnimatePresence>

          <Reveal delay={0.1}>
            <figure className="border-l-2 border-orange pl-6">
              <Icon name="quote" size={20} className="text-fg-subtle" />
              <blockquote className="mt-3 text-lg leading-relaxed text-fg">{quote.text}</blockquote>
              <figcaption className="mt-4 text-sm text-fg-muted">
                <span className="font-semibold text-fg">{quote.name}</span> · {quote.role}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
