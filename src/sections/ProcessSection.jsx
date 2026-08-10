import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { process, testimonials } from '../data/content'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import { usePrefersReducedMotion } from '../lib/useMediaQuery'
import { EASE } from '../lib/motion'

/**
 * Le quattro fasi di un progetto, impaginate come il blocco "Work together"
 * di github.com: fisarmonica a sinistra, illustrazione della fase attiva a
 * destra e citazione di un cliente sotto.
 *
 * La fase avanza da sola ogni 7 secondi finché non si tocca la fisarmonica:
 * dopo il primo click comanda l'utente. Con `prefers-reduced-motion` la
 * rotazione non parte affatto.
 */

const PHASE_ICONS = ['search', 'browser', 'code', 'rocket']
const ROTATION_MS = 7000

// La recensione che parla proprio della fase di analisi.
const quote =
  testimonials.find((item) => item.text.includes('analisi')) ?? testimonials[0]

/** Illustrazione della fase attiva: scheda con durata, attività e consegna. */
function PhasePanel({ phase, index }) {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-xl border border-line bg-canvas-inset shadow-card"
    >
      <div className="flex items-center gap-2.5 border-b border-line bg-canvas-subtle px-4 py-3">
        <Icon name={PHASE_ICONS[index] ?? 'workflow'} size={14} className="text-orange" />
        <span className="text-sm font-semibold text-fg">
          Fase {phase.step} · {phase.title}
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-fg-muted">
          <Icon name="clock" size={11} />
          {phase.duration}
        </span>
      </div>

      <div className="p-4">
        {/* Avanzamento delle fasi: quella attiva è piena, le altre svuotate */}
        <div className="flex gap-1.5">
          {process.map((item, i) => (
            <span
              key={item.step}
              className={`h-1 flex-1 rounded-full ${i <= index ? 'bg-orange' : 'bg-line-muted'}`}
            />
          ))}
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{phase.body}</p>

        {/* Cosa succede concretamente in questa fase */}
        <ul className="mt-4 space-y-2 border-t border-line-muted pt-4">
          {phase.activities.map((activity) => (
            <li key={activity} className="flex items-start gap-2 text-[13px] leading-snug text-fg">
              <Icon name="check" size={13} className="mt-0.5 shrink-0 text-orange" />
              {activity}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-start gap-2.5 rounded-md border border-line bg-canvas px-3 py-2.5">
          <Icon name="file" size={14} className="mt-0.5 shrink-0 text-fg-subtle" />
          <span className="text-sm text-fg">
            <span className="text-fg-muted">Ti resta in mano: </span>
            {phase.deliverable}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function ProcessSection() {
  const [active, setActive] = useState(0)
  const [locked, setLocked] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (locked || reduced) return
    const id = setInterval(() => setActive((v) => (v + 1) % process.length), ROTATION_MS)
    return () => clearInterval(id)
  }, [locked, reduced])

  const select = (index) => {
    setLocked(true)
    setActive(index)
  }

  return (
    <section
      id="metodo"
      className="border-b border-line-muted py-20 md:py-28"
      style={{ '--accent': 'var(--color-orange)' }}
    >
      <div className="shell">
        <Reveal as="h2" className="display display-section max-w-3xl">
          Lavoriamo insieme, sai sempre a che punto siamo
        </Reveal>
        <Reveal as="p" delay={0.06} className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
          Quattro fasi, ognuna con una durata dichiarata, attività definite e qualcosa di
          concreto che ti resta in mano. Nessuna scatola nera fino alla consegna, nessuna sorpresa
          il giorno del go-live.
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Fisarmonica */}
          <Reveal>
            <ul className="divide-y divide-line-muted border-y border-line-muted">
              {process.map((phase, i) => {
                const open = i === active
                return (
                  <li key={phase.step}>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => select(i)}
                      className="flex w-full items-center gap-3 py-4 text-left"
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors ${
                          open
                            ? 'border-orange text-orange'
                            : 'border-line text-fg-subtle'
                        }`}
                      >
                        {phase.step}
                      </span>
                      <span
                        className={`flex-1 text-lg font-semibold transition-colors ${
                          open ? 'text-fg' : 'text-fg-muted'
                        }`}
                      >
                        {phase.title}
                      </span>
                      <span className="font-mono text-xs text-fg-subtle">{phase.duration}</span>
                    </button>

                    {open && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden pr-4 pb-4 pl-11 text-[15px] leading-relaxed text-fg-muted"
                      >
                        {phase.body}
                      </motion.p>
                    )}
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* Illustrazione della fase attiva */}
          <Reveal delay={0.08} y={32} className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={process[active].step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <PhasePanel phase={process[active]} index={active} />
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>

        {/* Citazione, come il riquadro Mercedes-Benz di github.com */}
        <Reveal delay={0.1} className="mt-12">
          <figure className="card mx-auto max-w-3xl p-6 md:p-8">
            <Icon name="quote" size={20} className="text-fg-subtle" />
            <blockquote className="mt-4 text-lg leading-relaxed text-fg">{quote.text}</blockquote>
            <figcaption className="mt-5 text-sm text-fg-muted">
              <span className="font-semibold text-fg">{quote.name}</span> · {quote.role}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
