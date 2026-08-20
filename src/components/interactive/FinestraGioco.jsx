import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import BugHunt from './BugHunt'
import StackMemory from './StackMemory'
import LatencyMeter from './LatencyMeter'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import { EASE } from '../../lib/motion'

/**
 * I giochi si aprono in una finestra sopra il terminale, come un programma che
 * parte: barra del titolo, schermata iniziale con due righe su cosa si fa, e
 * il gioco che compare solo dopo "Avvia".
 *
 * La finestra si chiude con la X, con Esc o cliccando fuori. Mentre è aperta
 * la pagina sotto non scorre.
 */

const SCHEDE = {
  bug: {
    titolo: 'Trova il bug',
    file: 'bug.exe',
    icona: 'issue',
    tono: 'var(--color-danger)',
    sottotitolo: 'Sei frammenti di Rust, sempre più lunghi e sempre più cattivi.',
    righe: [
      'Compilano tutti: nessuno è un errore di sintassi.',
      'Metà non va nemmeno in errore — fa la cosa sbagliata in silenzio.',
      'Alla fine ti diciamo dov’era e perché.',
    ],
    durata: '5 minuti',
  },
  memory: {
    titolo: 'Memory dello stack',
    file: 'memory.exe',
    icona: 'database',
    tono: 'var(--color-purple)',
    sottotitolo: 'Otto coppie di tecnologie con cui lavoriamo davvero.',
    righe: ['Due carte alla volta.', 'Rust incluso, ovviamente.'],
    durata: '2 minuti',
  },
  latenza: {
    titolo: 'Tempo di risposta',
    file: 'latenza.exe',
    icona: 'zap',
    tono: 'var(--color-attention)',
    sottotitolo: 'Quanto ci metti a reagire, in millisecondi.',
    righe: [
      'Il riquadro diventa verde dopo un’attesa imprevedibile.',
      'Clicca appena succede: poi vedi con cosa te la giochi.',
    ],
    durata: '1 minuto',
  },
}

export default function FinestraGioco({ gioco, onChiudi }) {
  const [avviato, setAvviato] = useState(false)
  const pannello = useRef(null)
  const scheda = gioco ? SCHEDE[gioco] : null

  // Ogni apertura riparte dalla schermata iniziale.
  useEffect(() => setAvviato(false), [gioco])

  // Esc chiude, e il corpo della pagina resta fermo mentre la finestra è su.
  useEffect(() => {
    if (!gioco) return

    const suTasto = (e) => e.key === 'Escape' && onChiudi()
    document.addEventListener('keydown', suTasto)

    const precedente = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    pannello.current?.focus()

    return () => {
      document.removeEventListener('keydown', suTasto)
      document.body.style.overflow = precedente
    }
  }, [gioco, onChiudi])

  return (
    <AnimatePresence>
      {scheda && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onChiudi}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(1,4,9,0.72)] p-4 backdrop-blur-sm"
        >
          <motion.div
            ref={pannello}
            role="dialog"
            aria-modal="true"
            aria-label={scheda.titolo}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-line bg-canvas shadow-float outline-none"
          >
            {/* Barra del titolo */}
            <div className="flex items-center gap-2.5 border-b border-line bg-canvas-subtle px-3 py-2.5">
              <Icon name={scheda.icona} size={14} style={{ color: scheda.tono }} />
              <span className="font-mono text-xs text-fg">{scheda.file}</span>
              <span className="ml-auto flex items-center gap-1">
                <span className="flex size-6 items-center justify-center rounded text-fg-subtle">
                  <Icon name="dash" size={12} />
                </span>
                <button
                  type="button"
                  onClick={onChiudi}
                  aria-label="Chiudi la finestra"
                  className="flex size-6 items-center justify-center rounded text-fg-subtle transition-colors hover:bg-danger-subtle hover:text-danger"
                >
                  <Icon name="x" size={12} />
                </button>
              </span>
            </div>

            {/* Corpo: prima la presentazione, poi il gioco */}
            <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
              {avviato ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {gioco === 'bug' && <BugHunt />}
                  {gioco === 'memory' && <StackMemory />}
                  {gioco === 'latenza' && <LatencyMeter />}
                </motion.div>
              ) : (
                <div className="py-6 text-center">
                  <span
                    className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-line bg-canvas-subtle"
                    style={{ color: scheda.tono }}
                  >
                    <Icon name={scheda.icona} size={26} />
                  </span>

                  <h2 className="display mt-6 text-3xl">{scheda.titolo}</h2>
                  <p className="mx-auto mt-3 max-w-md text-[17px] text-fg-muted">
                    {scheda.sottotitolo}
                  </p>

                  <ul className="mx-auto mt-7 max-w-md space-y-2 text-left">
                    {scheda.righe.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-[15px] text-fg-muted">
                        <Icon
                          name="check"
                          size={14}
                          className="mt-1 shrink-0"
                          style={{ color: scheda.tono }}
                        />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 font-mono text-mini text-fg-subtle">
                    durata · {scheda.durata} — niente punteggi salvati
                  </p>

                  <Button
                    variant="primary"
                    size="lg"
                    icon="play"
                    className="mt-8"
                    onClick={() => setAvviato(true)}
                  >
                    Avvia
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 border-t border-line bg-canvas-subtle px-3 py-2 font-mono text-mini text-fg-subtle">
              <span>{avviato ? 'in esecuzione' : 'pronto'}</span>
              <span className="ml-auto">esc chiude</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
