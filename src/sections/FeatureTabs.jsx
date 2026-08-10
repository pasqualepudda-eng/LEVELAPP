import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { services } from '../data/content'
import AppWindow from '../components/AppWindow'
import AiConsole from '../components/AiConsole'
import CodeWindow from '../components/CodeWindow'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import { Link } from '../lib/router'
import { EASE } from '../lib/motion'

/**
 * Le aree di lavoro presentate come il blocco "GitHub features":
 * titolo breve, fila di tab centrata, poi la descrizione dell'area attiva e la
 * sua dimostrazione a tutta larghezza. Il contenuto cambia senza far saltare la
 * pagina, perché il riquadro ha un'altezza minima costante.
 */

const TAB_LABELS = {
  prodotto: 'La tua idea',
  gestionale: 'Gestionale',
  'web-app': 'Web app',
  'siti-web': 'Siti web',
  mobile: 'Mobile',
  ai: 'AI applicata',
}

/** La dimostrazione giusta per ogni area: mockup, codice o conversazione. */
function Demo({ service }) {
  if (service.slug === 'gestionale') return <AppWindow />
  if (service.slug === 'ai') return <AiConsole />
  return (
    <CodeWindow
      filename={service.code.filename}
      tabs={[service.code.filename]}
      code={service.code.lines}
    />
  )
}

export default function FeatureTabs() {
  const [active, setActive] = useState(services[0].slug)
  const service = services.find((item) => item.slug === active) ?? services[0]

  return (
    <section
      id="cosa-facciamo"
      className="relative overflow-hidden border-b border-line-muted py-20 md:py-28"
      style={{ '--accent': service.accent }}
    >
      <div className="shell relative">
        <Reveal as="h2" className="display display-section text-center">
          Sei aree, una sola squadra di ingegneria
        </Reveal>

        {/* Tab: fila centrata, scorrevole sotto i 640px come su github.com */}
        <Reveal delay={0.06} className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Aree di lavoro"
            className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-canvas-subtle p-1"
          >
            {services.map((item) => {
              const selected = item.slug === active
              return (
                <button
                  key={item.slug}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`pannello-${item.slug}`}
                  id={`tab-${item.slug}`}
                  onClick={() => setActive(item.slug)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    selected
                      ? 'bg-canvas-overlay text-fg shadow-card ring-1 ring-line'
                      : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  <Icon
                    name={item.icon}
                    size={15}
                    style={selected ? { color: item.accent } : undefined}
                  />
                  {TAB_LABELS[item.slug] ?? item.title}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Pannello attivo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={service.slug}
            id={`pannello-${service.slug}`}
            role="tabpanel"
            aria-labelledby={`tab-${service.slug}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-12"
          >
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-fg-muted">
              {service.short} {service.intro.split('. ')[0]}.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                to={`/servizi/${service.slug}`}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: service.accent }}
              >
                Scopri {TAB_LABELS[service.slug]}
                <Icon
                  name="arrowRight"
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="relative mx-auto mt-12 max-w-5xl">
              <div className="spot-glow pointer-events-none absolute -inset-x-16 -top-10 bottom-0 opacity-70" />
              <div className="relative">
                <Demo service={service} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
