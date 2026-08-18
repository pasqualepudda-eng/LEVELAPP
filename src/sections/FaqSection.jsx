import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { faqs } from '../data/content'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import { Link } from '../lib/router'
import { EASE } from '../lib/motion'

/**
 * Domande frequenti con ricerca dal vivo: si scrive e l'elenco si stringe,
 * con le parole trovate evidenziate sia nella domanda sia nella risposta.
 *
 * Nove voci a fisarmonica costringono ad aprirle una per una per capire dove
 * sta la risposta; qui si digita "Rust" e restano le due che ne parlano.
 */

const SCORCIATOIE = ['tempi', 'Rust', 'proprietà', 'migrazione', 'assistenza']

/** Evidenzia le occorrenze della ricerca dentro un testo. */
function Evidenzia({ testo, cerca }) {
  if (!cerca.trim()) return testo

  // La ricerca finisce dentro una regex: i caratteri speciali vanno neutralizzati.
  const sicuro = cerca.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pezzi = testo.split(new RegExp(`(${sicuro})`, 'gi'))

  return pezzi.map((pezzo, i) =>
    pezzo.toLowerCase() === cerca.trim().toLowerCase() ? (
      <mark key={i} className="rounded bg-accent-subtle px-0.5 text-accent">
        {pezzo}
      </mark>
    ) : (
      pezzo
    ),
  )
}

export default function FaqSection() {
  const [cerca, setCerca] = useState('')
  const [aperta, setAperta] = useState(0)

  const risultati = useMemo(() => {
    const q = cerca.trim().toLowerCase()
    if (!q) return faqs
    return faqs.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q))
  }, [cerca])

  function cambiaRicerca(valore) {
    setCerca(valore)
    setAperta(0) // con pochi risultati ha senso mostrare subito il primo
  }

  return (
    <section id="faq" className="border-b border-line-muted py-20 md:py-28">
      <div className="shell">
        <Reveal as="p" className="flex items-center gap-2 text-sm font-semibold text-accent">
          <span className="inline-block h-px w-6 bg-accent" />
          Domande frequenti
        </Reveal>

        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center lg:gap-16">
          <Reveal as="h2" className="display display-section">
            Le cose che ci chiedono tutti
          </Reveal>

          {/* Ricerca */}
          <Reveal delay={0.06}>
            <label className="flex items-center gap-3 rounded-xl border border-line bg-canvas px-4 py-3 transition-colors focus-within:border-accent">
              <Icon name="search" size={16} className="shrink-0 text-fg-subtle" />
              <input
                value={cerca}
                onChange={(e) => cambiaRicerca(e.target.value)}
                placeholder="Cerca fra le domande: tempi, Rust, proprietà…"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-subtle"
                aria-label="Cerca fra le domande frequenti"
              />
              {cerca && (
                <button
                  type="button"
                  onClick={() => cambiaRicerca('')}
                  aria-label="Cancella la ricerca"
                  className="flex size-6 shrink-0 items-center justify-center rounded-md text-fg-subtle hover:bg-canvas-subtle hover:text-fg"
                >
                  <Icon name="x" size={13} />
                </button>
              )}
              <span className="hidden font-mono text-[11px] whitespace-nowrap text-fg-subtle sm:block">
                {risultati.length}/{faqs.length}
              </span>
            </label>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {SCORCIATOIE.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => cambiaRicerca(cerca.toLowerCase() === s.toLowerCase() ? '' : s)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    cerca.toLowerCase() === s.toLowerCase()
                      ? 'border-accent bg-accent-subtle text-accent'
                      : 'border-line text-fg-muted hover:border-fg-subtle hover:text-fg'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Elenco filtrato */}
        <div className="mt-12 border-t border-line-muted">
          <AnimatePresence initial={false} mode="popLayout">
            {risultati.map((faq, i) => {
              const espansa = i === aperta
              return (
                <motion.div
                  key={faq.q}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="border-b border-line-muted"
                >
                  <button
                    type="button"
                    onClick={() => setAperta(espansa ? -1 : i)}
                    aria-expanded={espansa}
                    className="group flex w-full items-start gap-6 py-6 text-left"
                  >
                    <span className="font-mono text-xs text-fg-subtle">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-lg font-semibold text-fg transition-colors group-hover:text-accent">
                      <Evidenzia testo={faq.q} cerca={cerca} />
                    </span>
                    <Icon
                      name="chevronDown"
                      size={18}
                      className={`mt-1 shrink-0 text-fg-subtle transition-transform duration-300 ${
                        espansa ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {espansa && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-3xl pr-10 pb-6 pl-12 text-[15px] leading-relaxed text-fg-muted">
                          <Evidenzia testo={faq.a} cerca={cerca} />
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Nessun risultato */}
          {risultati.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start gap-3 py-14"
            >
              <p className="text-lg font-semibold text-fg">
                Nessuna domanda contiene “{cerca}”.
              </p>
              <p className="max-w-lg text-[15px] leading-relaxed text-fg-muted">
                Vuol dire che è una domanda nuova, e quelle ci interessano: scrivicela e ti
                rispondiamo entro un giorno lavorativo.
              </p>
              <Link
                to="/contatti"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
              >
                Fai la tua domanda
                <Icon
                  name="arrowRight"
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
