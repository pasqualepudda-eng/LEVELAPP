import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import CodeWindow from './CodeWindow'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import { Link } from '../lib/router'
import { EASE } from '../lib/motion'

/**
 * Le aree come fisarmonica orizzontale: lastre affiancate, quella attiva si
 * allarga e mostra descrizione, tempi e un frammento del codice che ci
 * scriviamo dentro; le altre restano strisce con il nome in verticale.
 *
 * Sotto i 1024px non c'è larghezza per tante colonne, quindi diventa una
 * fisarmonica verticale: stessa logica, stesso stato, impaginazione diversa.
 *
 * Lo usano la home (tutte e sei le aree) e il dettaglio servizio (le altre
 * cinque), così passare da una pagina all'altra non cambia linguaggio.
 */

export const ETICHETTE = {
  prodotto: 'La tua idea',
  gestionale: 'Gestionale',
  'web-app': 'Web app',
  'siti-web': 'Siti web',
  mobile: 'Mobile',
  ai: 'AI applicata',
}

/** Contenuto del pannello aperto, condiviso fra orizzontale e verticale. */
function Contenuto({ servizio }) {
  return (
    <div className="grid h-full gap-7 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-center">
      <div className="min-w-0">
        <p className="text-[15px] leading-relaxed text-fg-muted">{servizio.short}</p>

        <p
          className="mt-4 flex items-center gap-1.5 text-[13px] font-medium"
          style={{ color: servizio.accent }}
        >
          <Icon name="clock" size={13} />
          {servizio.tempi}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {servizio.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-fg-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={`/servizi/${servizio.slug}`}
          className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold"
          style={{ color: servizio.accent }}
        >
          Scopri {ETICHETTE[servizio.slug]}
          <Icon
            name="arrowRight"
            size={14}
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </Link>
      </div>

      <div className="mask-fade-r hidden min-w-0 lg:block">
        <CodeWindow
          filename={servizio.code.filename}
          code={servizio.code.lines}
          className="shadow-float"
        />
      </div>
    </div>
  )
}

export default function ServiziFisarmonica({ servizi, delay = 0.1, className = 'mt-12' }) {
  const [attivo, setAttivo] = useState(0)

  return (
    <>
      {/* Fisarmonica orizzontale, da 1024px in su */}
      <Reveal delay={delay} className={`${className} hidden gap-2 lg:flex lg:h-[26rem]`}>
        {servizi.map((servizio, i) => {
          const aperto = i === attivo
          return (
            <div
              key={servizio.slug}
              onMouseEnter={() => setAttivo(i)}
              className={`relative overflow-hidden rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                aperto ? 'flex-[6.5] bg-canvas-subtle' : 'flex-[0.55] bg-canvas hover:bg-canvas-subtle'
              }`}
              style={{
                borderColor: aperto
                  ? `color-mix(in oklab, ${servizio.accent} 45%, var(--color-line))`
                  : 'var(--color-line)',
                boxShadow: aperto
                  ? `0 16px 40px color-mix(in oklab, ${servizio.accent} 14%, transparent)`
                  : 'none',
              }}
            >
              {/* Filetto superiore acceso sul pannello aperto */}
              <span
                className="absolute inset-x-0 top-0 h-0.5 transition-opacity duration-500"
                style={{ backgroundColor: servizio.accent, opacity: aperto ? 1 : 0 }}
              />

              {aperto ? (
                <motion.div
                  key="aperto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.12, ease: EASE }}
                  className="flex h-full flex-col p-7"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-10 items-center justify-center rounded-lg border border-line bg-canvas"
                      style={{ color: servizio.accent }}
                    >
                      <Icon name={servizio.icon} size={18} />
                    </span>
                    <span className="font-mono text-xs text-fg-subtle">
                      0{i + 1} / 0{servizi.length}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl leading-tight font-semibold text-fg">
                    {servizio.title}
                  </h3>

                  <div className="mt-5 min-h-0 flex-1">
                    <Contenuto servizio={servizio} />
                  </div>
                </motion.div>
              ) : (
                /* Striscia chiusa: nome in verticale, come il dorso di un libro */
                <button
                  type="button"
                  onClick={() => setAttivo(i)}
                  aria-label={`Apri ${servizio.title}`}
                  className="group flex h-full w-full flex-col items-center gap-4 py-7"
                >
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas transition-transform duration-300 group-hover:scale-110"
                    style={{ color: servizio.accent }}
                  >
                    <Icon name={servizio.icon} size={18} />
                  </span>
                  <span
                    className="text-base font-semibold whitespace-nowrap text-fg-muted transition-colors group-hover:text-fg"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {ETICHETTE[servizio.slug]}
                  </span>
                  <span className="mt-auto font-mono text-[11px] text-fg-subtle">0{i + 1}</span>
                </button>
              )}
            </div>
          )
        })}
      </Reveal>

      {/* Fisarmonica verticale, sotto i 1024px */}
      <Reveal delay={delay} className={`${className} space-y-2 lg:hidden`}>
        {servizi.map((servizio, i) => {
          const aperto = i === attivo
          return (
            <div
              key={servizio.slug}
              className="overflow-hidden rounded-xl border transition-colors"
              style={{
                borderColor: aperto
                  ? `color-mix(in oklab, ${servizio.accent} 45%, var(--color-line))`
                  : 'var(--color-line)',
              }}
            >
              <button
                type="button"
                onClick={() => setAttivo(aperto ? -1 : i)}
                aria-expanded={aperto}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas"
                  style={{ color: servizio.accent }}
                >
                  <Icon name={servizio.icon} size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-fg">{servizio.title}</span>
                </span>
                <Icon
                  name="chevronDown"
                  size={16}
                  className={`shrink-0 text-fg-subtle transition-transform duration-300 ${
                    aperto ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {aperto && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-line-muted p-4">
                      <Contenuto servizio={servizio} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </Reveal>
    </>
  )
}
