import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { bugRounds } from '../../data/interactive'
import { tokenize, TOKEN_COLORS } from '../../lib/highlight'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import { EASE } from '../../lib/motion'

/**
 * Trova il bug: si sceglie la riga che non torna, il gioco dice se è quella e
 * spiega perché. Quattro round, punteggio in memoria e nient'altro: a pagina
 * ricaricata si riparte dal primo.
 */

/** Riga di codice evidenziata, con lo stesso tema dell'editor del sito. */
function Riga({ testo }) {
  if (!testo) return <span>&nbsp;</span>
  return tokenize(testo).map((token, i) => (
    <span key={i} style={{ color: TOKEN_COLORS[token.kind] ?? TOKEN_COLORS.plain }}>
      {token.text}
    </span>
  ))
}

export default function BugHunt() {
  const [round, setRound] = useState(0)
  const [scelta, setScelta] = useState(null)
  const [punti, setPunti] = useState(0)
  const [finito, setFinito] = useState(false)

  const corrente = bugRounds[round]
  const risposto = scelta !== null
  const indovinato = risposto && scelta === corrente.buggy

  function scegli(indice) {
    if (risposto) return
    setScelta(indice)
    if (indice === corrente.buggy) setPunti((p) => p + 1)
  }

  function avanti() {
    if (round + 1 >= bugRounds.length) return setFinito(true)
    setRound((r) => r + 1)
    setScelta(null)
  }

  function ricomincia() {
    setRound(0)
    setScelta(null)
    setPunti(0)
    setFinito(false)
  }

  return (
    <div className="card overflow-hidden" style={{ '--accent': 'var(--color-danger)' }}>
      {/* Testata: titolo, progressione a pallini, punteggio */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line bg-canvas-subtle px-4 py-3">
        <span className="flex size-8 items-center justify-center rounded-lg border border-line bg-canvas text-danger">
          <Icon name="issue" size={16} />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-fg">Trova il bug</h3>
          <p className="text-[11.5px] text-fg-muted">
            Una riga di queste manderebbe in errore il programma.
          </p>
        </div>

        <div className="flex items-center gap-1.5" aria-label={`Round ${round + 1} di ${bugRounds.length}`}>
          {bugRounds.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i < round || finito
                  ? 'w-6 bg-success'
                  : i === round
                    ? 'w-6 bg-danger'
                    : 'w-3 bg-line'
              }`}
            />
          ))}
        </div>

        <span className="rounded-full border border-line bg-canvas px-2.5 py-0.5 font-mono text-[11px] text-fg-muted">
          {punti}/{bugRounds.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {finito ? (
          <motion.div
            key="esito-finale"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex min-h-[18rem] flex-col items-center justify-center p-8 text-center"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl border border-line bg-canvas-subtle text-attention">
              <Icon name="verified" size={26} />
            </span>
            <p className="display mt-5 text-5xl">
              {punti}
              <span className="text-fg-subtle">/{bugRounds.length}</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
              {punti === bugRounds.length
                ? 'Nessuno sfuggito. Il code review lo faresti anche tu.'
                : punti >= bugRounds.length / 2
                  ? 'Buon occhio: la maggior parte non sarebbe arrivata in produzione.'
                  : 'Va bene così: è esattamente per questo che il codice lo rilegge sempre qualcun altro.'}
            </p>
            <Button variant="default" size="md" onClick={ricomincia} className="mt-6" icon="play">
              Gioca ancora
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key={`round-${round}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* Finestra del file */}
            <div className="border-b border-line bg-canvas-inset">
              <div className="flex items-center gap-2 border-b border-line-muted px-4 py-2">
                <Icon name="file" size={12} className="text-fg-subtle" />
                <span className="font-mono text-[11.5px] text-fg-muted">{corrente.filename}</span>
              </div>

              <ul className="overflow-x-auto py-2 font-mono text-[12px] leading-6 sm:text-[12.5px]">
                {corrente.lines.map((riga, i) => {
                  const sbagliata = risposto && i === scelta && i !== corrente.buggy
                  const giusta = risposto && i === corrente.buggy

                  return (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => scegli(i)}
                        disabled={risposto}
                        className={`group flex w-full items-start gap-3 border-l-2 px-4 text-left transition-colors ${
                          giusta
                            ? 'border-success bg-success-subtle'
                            : sbagliata
                              ? 'border-danger bg-danger-subtle'
                              : risposto
                                ? 'cursor-default border-transparent'
                                : 'border-transparent hover:border-danger hover:bg-canvas-subtle'
                        }`}
                      >
                        <span className="w-5 shrink-0 text-right text-fg-subtle select-none">
                          {i + 1}
                        </span>
                        <span className="flex-1 whitespace-pre">
                          <Riga testo={riga} />
                        </span>
                        {giusta && <Icon name="check" size={14} className="mt-1.5 shrink-0 text-success" />}
                        {sbagliata && <Icon name="x" size={14} className="mt-1.5 shrink-0 text-danger" />}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Esito del round */}
            <div className="p-4">
              {risposto ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p
                    className={`flex items-center gap-2 text-sm font-semibold ${
                      indovinato ? 'text-success' : 'text-danger'
                    }`}
                  >
                    <span
                      className={`flex size-5 items-center justify-center rounded-full ${
                        indovinato ? 'bg-success-subtle' : 'bg-danger-subtle'
                      }`}
                    >
                      <Icon name={indovinato ? 'check' : 'x'} size={12} />
                    </span>
                    {indovinato ? 'Trovato.' : `Era la riga ${corrente.buggy + 1}.`}
                  </p>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-fg-muted">
                    {corrente.explanation}
                  </p>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={avanti}
                    className="mt-4"
                    trailingIcon="arrowRight"
                  >
                    {round + 1 >= bugRounds.length ? 'Vedi il risultato' : 'Prossimo round'}
                  </Button>
                </motion.div>
              ) : (
                <p className="flex items-center gap-2 text-[13px] text-fg-muted">
                  <Icon name="lightbulb" size={14} className="text-attention" />
                  Clicca la riga sospetta. Una sola è quella giusta.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
