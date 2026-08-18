import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { testimonials } from '../data/content'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import { usePrefersReducedMotion } from '../lib/useMediaQuery'
import { EASE } from '../lib/motion'

/**
 * Le recensioni come una voce sola alla volta: la citazione occupa lo spazio
 * di un titolo e sotto c'è la fila delle persone, con quella attiva in
 * evidenza.
 *
 * Sei riquadri identici si leggono a fatica e non se ne ricorda nessuno; una
 * frase grande, invece, si legge.
 *
 * La voce cambia da sola ogni sette secondi finché non si sceglie una persona;
 * la barra sotto l'avatar attivo mostra quanto manca al cambio. Con
 * `prefers-reduced-motion` resta ferma sulla prima.
 */

const ROTAZIONE_MS = 7000

function iniziali(nome) {
  return nome
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
}

export default function Testimonials() {
  const [attiva, setAttiva] = useState(0)
  const [ferma, setFerma] = useState(false)
  const ridotto = usePrefersReducedMotion()

  useEffect(() => {
    if (ferma || ridotto) return
    const id = setInterval(() => setAttiva((v) => (v + 1) % testimonials.length), ROTAZIONE_MS)
    return () => clearInterval(id)
  }, [ferma, ridotto])

  function scegli(i) {
    setFerma(true)
    setAttiva(i)
  }

  const voce = testimonials[attiva]

  return (
    <section id="recensioni" className="border-b border-line-muted py-20 md:py-28">
      <div className="shell">
        <Reveal as="p" className="flex items-center gap-2 text-sm font-semibold text-attention">
          <span className="inline-block h-px w-6 bg-attention" />
          Dicono di noi
        </Reveal>

        <Reveal as="h2" delay={0.05} className="display display-section mt-5 max-w-3xl">
          Il giudizio che conta è quello del secondo anno
        </Reveal>

        {/* La citazione, grande come un titolo */}
        <div className="mt-14 min-h-[14rem] md:min-h-[13rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={voce.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="flex gap-0.5" aria-label={`${voce.rating} stelle su 5`}>
                {Array.from({ length: voce.rating }).map((_, i) => (
                  <Icon key={i} name="star" size={15} className="text-attention" />
                ))}
              </div>

              <blockquote className="display mt-6 max-w-4xl text-2xl leading-snug text-fg sm:text-3xl md:text-[2.5rem]">
                “{voce.text}”
              </blockquote>

              <figcaption className="mt-6 text-[15px] text-fg-muted">
                <span className="font-semibold text-fg">{voce.name}</span> · {voce.role} ·{' '}
                <span className="font-mono text-[13px]">{voce.when}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* La fila delle persone */}
        <Reveal delay={0.1} className="mt-12 border-t border-line-muted pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-6">
            {testimonials.map((t, i) => {
              const scelta = i === attiva
              return (
                <li key={t.name}>
                  <button
                    type="button"
                    onClick={() => scegli(i)}
                    aria-pressed={scelta}
                    className="group flex items-center gap-3 text-left"
                  >
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300"
                      style={{
                        borderColor: scelta ? 'var(--color-attention)' : 'var(--color-line)',
                        color: scelta ? 'var(--color-fg)' : 'var(--color-fg-subtle)',
                        backgroundColor: scelta
                          ? 'color-mix(in oklab, var(--color-attention) 14%, transparent)'
                          : 'var(--color-canvas-subtle)',
                        transform: scelta ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      {iniziali(t.name)}
                    </span>

                    <span className="hidden min-w-0 sm:block">
                      <span
                        className="block truncate text-sm font-medium transition-colors"
                        style={{ color: scelta ? 'var(--color-fg)' : 'var(--color-fg-muted)' }}
                      >
                        {t.name}
                      </span>
                      <span className="block truncate text-xs text-fg-subtle">{t.role}</span>

                      {/* Quanto manca al cambio, solo sulla voce attiva */}
                      <span className="mt-1.5 block h-0.5 w-full overflow-hidden rounded-full bg-line-muted">
                        {scelta && !ferma && !ridotto && (
                          <motion.span
                            key={`barra-${attiva}`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: ROTAZIONE_MS / 1000, ease: 'linear' }}
                            className="block h-full origin-left bg-attention"
                          />
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
