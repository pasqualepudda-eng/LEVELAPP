import { useEffect, useRef, useState } from 'react'
import Icon from '../ui/Icon'
import Button from '../ui/Button'

/**
 * Tempo di risposta: il riquadro diventa verde dopo un'attesa casuale e si
 * misura quanto ci metti a cliccare. È un pretesto per parlare di millisecondi
 * con un metro di paragone concreto — e per ricordare che sotto una certa
 * soglia l'utente non percepisce più l'attesa.
 */

const FONDO_SCALA = 800 // ms rappresentati dalla barra

const FASCE = [
  {
    max: 200,
    emoji: '⚡',
    colore: 'var(--color-success)',
    testo: 'Sotto la soglia in cui l’occhio percepisce un’attesa.',
  },
  {
    max: 300,
    emoji: '🚀',
    colore: 'var(--color-accent)',
    testo: 'Come una risposta servita da un servizio Rust ben scritto.',
  },
  {
    max: 450,
    emoji: '✅',
    colore: 'var(--color-attention)',
    testo: 'Come una query su un indice fatto bene.',
  },
  {
    max: 700,
    emoji: '🐌',
    colore: 'var(--color-orange)',
    testo: 'Come una pagina che ricalcola tutto a ogni clic.',
  },
  {
    max: Infinity,
    emoji: '😴',
    colore: 'var(--color-danger)',
    testo: 'Come il gestionale che ti fa aspettare il caricamento.',
  },
]

const RIQUADRO = {
  idle: 'border-line bg-canvas text-fg-muted',
  attesa: 'border-attention bg-attention-subtle text-attention',
  pronto: 'border-success bg-success-subtle text-success',
  esito: 'border-line bg-canvas text-fg',
  anticipo: 'border-danger bg-danger-subtle text-danger',
}

export default function LatencyMeter() {
  const [stato, setStato] = useState('idle') // idle | attesa | pronto | esito | anticipo
  const [ms, setMs] = useState(null)
  const [migliore, setMigliore] = useState(null)
  const partenza = useRef(0)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  function avvia() {
    clearTimeout(timer.current)
    setStato('attesa')
    setMs(null)
    // Attesa imprevedibile: altrimenti si anticipa a memoria.
    timer.current = setTimeout(
      () => {
        partenza.current = performance.now()
        setStato('pronto')
      },
      1200 + Math.random() * 2600,
    )
  }

  function clic() {
    if (stato === 'attesa') {
      clearTimeout(timer.current)
      setStato('anticipo')
      return
    }

    if (stato === 'pronto') {
      const misura = Math.round(performance.now() - partenza.current)
      setMs(misura)
      setMigliore((precedente) => (precedente === null ? misura : Math.min(precedente, misura)))
      setStato('esito')
    }
  }

  const fascia = ms === null ? null : FASCE.find((voce) => ms < voce.max)
  const posizione = ms === null ? 0 : Math.min(100, (ms / FONDO_SCALA) * 100)

  const etichetta = {
    idle: 'Premi Avvia',
    attesa: 'Aspetta il verde…',
    pronto: 'Adesso!',
    esito: `${ms} ms`,
    anticipo: 'Troppo presto',
  }[stato]

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b border-line bg-canvas-subtle px-4 py-3">
        <span className="flex size-8 items-center justify-center rounded-lg border border-line bg-canvas text-attention">
          <Icon name="zap" size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-fg">Tempo di risposta</h3>
          <p className="text-[11.5px] text-fg-muted">Clicca appena il riquadro diventa verde.</p>
        </div>
        <span className="rounded-full border border-line bg-canvas px-2.5 py-0.5 font-mono text-mini text-fg-muted">
          {migliore === null ? '— ms' : `record ${migliore}`}
        </span>
      </div>

      <div className="p-4">
        <button
          type="button"
          onClick={clic}
          disabled={stato === 'idle' || stato === 'esito' || stato === 'anticipo'}
          aria-live="polite"
          className={`flex min-h-[6rem] w-full flex-col items-center justify-center gap-1.5 rounded-lg border-2 p-4 text-center transition-colors ${
            RIQUADRO[stato]
          } ${stato === 'pronto' ? 'animate-arcade-pulse' : ''}`}
          style={{ '--accent': 'var(--color-success)' }}
        >
          <span className="display text-3xl tracking-tight">{etichetta}</span>
          {stato === 'anticipo' && (
            <span className="text-[13px] font-medium text-fg-muted">
              <span aria-hidden="true">🙈</span> Hai cliccato prima del verde.
            </span>
          )}
          {stato === 'attesa' && (
            <span className="font-mono text-mini text-fg-muted">cronometro armato…</span>
          )}
        </button>

        {/* Scala: dove cade il tuo tempo rispetto a riferimenti reali */}
        <div className="mt-3">
          <div className="relative h-2.5 overflow-hidden rounded-full border border-line bg-canvas">
            <div
              className="absolute inset-y-0 left-0 w-full"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-success) 0%, var(--color-accent) 30%, var(--color-attention) 55%, var(--color-danger) 100%)',
                opacity: 0.35,
              }}
            />
            {ms !== null && (
              <span
                className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-canvas transition-[left] duration-500"
                style={{ left: `${posizione}%`, backgroundColor: fascia.colore }}
              />
            )}
          </div>

          <div className="mt-1.5 flex justify-between font-mono text-mini text-fg-subtle">
            <span>0 ms</span>
            <span>400</span>
            <span>800+</span>
          </div>

          {fascia ? (
            <p
              className="animate-glow mt-2.5 flex min-h-[2.5rem] items-start gap-2 text-[15px] leading-snug font-semibold"
              style={{ color: fascia.colore }}
            >
              <span aria-hidden="true" className="text-lg leading-none">
                {fascia.emoji}
              </span>
              {fascia.testo}
            </p>
          ) : (
            <p className="mt-2.5 min-h-[2.5rem] text-[12px] leading-snug text-fg-muted">
              La barra mostra dove cade il tuo tempo di reazione.
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line-muted px-4 py-3">
        <p className="text-xs text-fg-muted">Nessun punteggio viene salvato.</p>
        <Button variant="invisible" size="sm" onClick={avvia} icon="play">
          {stato === 'idle' ? 'Avvia' : 'Riprova'}
        </Button>
      </div>
    </div>
  )
}
