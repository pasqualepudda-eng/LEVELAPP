import { useState } from 'react'
import { motion } from 'motion/react'
import { pillars } from '../data/content'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import { EASE } from '../lib/motion'

/**
 * Le tre differenze rispetto a un prodotto in licenza, raccontate con la
 * colonna di sinistra che resta ferma mentre scorrono i blocchi a destra.
 *
 * Il blocco che entra nello schermo si "accende" e gli altri si spengono un
 * po': l'occhio sa sempre dove si trova, e l'indice a sinistra segue. Nessuna
 * card, nessuna griglia — è l'unico punto della home con questa struttura.
 */
export default function Pillars() {
  const [attivo, setAttivo] = useState(0)
  const corrente = pillars[attivo] ?? pillars[0]

  return (
    <section id="perche" className="border-b border-line-muted py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[25rem_minmax(0,1fr)] lg:gap-16">
        {/* Colonna ferma: titolo e indice */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal
            as="p"
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: corrente.accent }}
          >
            <span
              className="inline-block h-px w-6 transition-colors duration-500"
              style={{ backgroundColor: corrente.accent }}
            />
            Perché su misura
          </Reveal>

          <Reveal
            as="h2"
            delay={0.05}
            className="display mt-5"
            style={{ fontSize: 'clamp(1.9rem, 2.5vw, 2.6rem)' }}
          >
            Tre differenze che si vedono dal secondo anno
          </Reveal>

          <Reveal as="p" delay={0.1} className="mt-5 text-[17px] leading-relaxed text-fg-muted">
            Non è questione di funzioni: cambia chi possiede il software, chi può farlo evolvere e
            quanto regge negli anni di esercizio.
          </Reveal>

          {/* Indice: la voce attiva scorre con la lettura */}
          <Reveal delay={0.14} className="mt-10 hidden lg:block">
            <ul className="space-y-1">
              {pillars.map((pillar, i) => {
                const acceso = i === attivo
                return (
                  <li key={pillar.id}>
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById(`pilastro-${pillar.id}`)
                          ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
                      }
                      className="flex w-full items-center gap-3 border-l-2 py-2 pl-4 text-left transition-colors duration-300"
                      style={{
                        borderColor: acceso ? pillar.accent : 'var(--color-line-muted)',
                        color: acceso ? 'var(--color-fg)' : 'var(--color-fg-subtle)',
                      }}
                    >
                      <span className="font-mono text-xs">{pillar.index}</span>
                      <span className="text-sm font-medium">{pillar.title.replace('.', '')}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>

        {/* Colonna che scorre: un blocco per differenza */}
        <div className="space-y-20 lg:space-y-28">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.id}
              id={`pilastro-${pillar.id}`}
              onViewportEnter={() => setAttivo(i)}
              viewport={{ margin: '-45% 0px -45% 0px' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="scroll-mt-32"
              style={{ '--accent': pillar.accent }}
            >
              {/* Numero grande in filigrana: fa da segnaposto nel lungo scorrimento */}
              <div className="flex items-start gap-6">
                <span
                  className="display hidden text-6xl leading-none opacity-25 transition-opacity duration-500 sm:block"
                  style={{ color: pillar.accent, opacity: i === attivo ? 0.5 : 0.18 }}
                >
                  {pillar.index}
                </span>

                <div className="min-w-0">
                  <span
                    className="flex size-11 items-center justify-center rounded-xl border border-line bg-canvas transition-transform duration-500"
                    style={{
                      color: pillar.accent,
                      transform: i === attivo ? 'scale(1)' : 'scale(0.92)',
                    }}
                  >
                    <Icon name={pillar.icon} size={20} />
                  </span>

                  <h3 className="display display-sub mt-6 max-w-lg">{pillar.title}</h3>

                  <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-fg-muted">
                    {pillar.body}
                  </p>

                  {/* I punti, come righe di consegna */}
                  <ul className="mt-7 max-w-xl divide-y divide-line-muted border-y border-line-muted">
                    {pillar.points.map((punto) => (
                      <li key={punto} className="flex items-center gap-3 py-3 text-[15px] text-fg">
                        <Icon
                          name="check"
                          size={15}
                          className="shrink-0"
                          style={{ color: pillar.accent }}
                        />
                        {punto}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
