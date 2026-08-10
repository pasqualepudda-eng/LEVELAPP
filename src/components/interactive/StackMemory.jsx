import { useEffect, useRef, useState } from 'react'
import { memoryTechs } from '../../data/interactive'
import Icon from '../ui/Icon'
import Button from '../ui/Button'

/**
 * Memory dello stack: otto coppie di tecnologie da accoppiare. Serve a far
 * girare i nomi che usiamo davvero, Rust compreso, senza trasformarli in un
 * elenco puntato.
 *
 * Le carte girano davvero: due facce sovrapposte che ruotano su Y (le utility
 * `.flip` stanno in index.css).
 */

function nuovoMazzo() {
  return memoryTechs
    .flatMap((tech, i) => [
      { uid: `${tech.nome}-a-${i}`, tech },
      { uid: `${tech.nome}-b-${i}`, tech },
    ])
    .map((carta) => ({ carta, ordine: Math.random() }))
    .sort((a, b) => a.ordine - b.ordine)
    .map(({ carta }) => carta)
}

export default function StackMemory() {
  const [mazzo, setMazzo] = useState(nuovoMazzo)
  const [scoperte, setScoperte] = useState([]) // uid delle carte girate ora
  const [trovate, setTrovate] = useState([]) // tecnologie completate
  const [mosse, setMosse] = useState(0)
  const timer = useRef(null)

  // Il confronto fra due carte è differito: senza pausa la seconda si
  // rigirerebbe prima ancora di essere letta.
  useEffect(() => {
    if (scoperte.length !== 2) return

    const [prima, seconda] = scoperte.map((uid) => mazzo.find((c) => c.uid === uid))
    if (prima.tech.nome === seconda.tech.nome) {
      setTrovate((precedenti) => [...precedenti, prima.tech.nome])
      setScoperte([])
      return
    }

    timer.current = setTimeout(() => setScoperte([]), 850)
    return () => clearTimeout(timer.current)
  }, [scoperte, mazzo])

  useEffect(() => () => clearTimeout(timer.current), [])

  const vinto = trovate.length === memoryTechs.length

  function gira(carta) {
    if (scoperte.length === 2) return
    if (scoperte.includes(carta.uid) || trovate.includes(carta.tech.nome)) return

    setScoperte((precedenti) => [...precedenti, carta.uid])
    if (scoperte.length === 1) setMosse((m) => m + 1)
  }

  function ricomincia() {
    clearTimeout(timer.current)
    setMazzo(nuovoMazzo())
    setScoperte([])
    setTrovate([])
    setMosse(0)
  }

  return (
    <div className="card flex h-full flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b border-line bg-canvas-subtle px-4 py-3">
        <span className="flex size-8 items-center justify-center rounded-lg border border-line bg-canvas text-purple">
          <Icon name="database" size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-fg">Memory dello stack</h3>
          <p className="text-[11.5px] text-fg-muted">Accoppia le tecnologie con cui lavoriamo.</p>
        </div>
        <span className="rounded-full border border-line bg-canvas px-2.5 py-0.5 font-mono text-[11px] text-fg-muted">
          {trovate.length}/{memoryTechs.length}
        </span>
      </div>

      {/* Barra di completamento */}
      <div className="h-1 w-full bg-line-muted">
        <div
          className="h-full bg-success transition-[width] duration-500"
          style={{ width: `${(trovate.length / memoryTechs.length) * 100}%` }}
        />
      </div>

      <div className="grid flex-1 grid-cols-4 gap-2 p-4">
        {mazzo.map((carta) => {
          const abbinata = trovate.includes(carta.tech.nome)
          const girata = abbinata || scoperte.includes(carta.uid)
          const tinta = carta.tech.tinta

          return (
            <button
              key={carta.uid}
              type="button"
              onClick={() => gira(carta)}
              disabled={girata}
              aria-label={girata ? carta.tech.nome : 'Carta coperta'}
              className={`flip aspect-[3/4] w-full rounded-md transition-transform ${
                girata ? '' : 'hover:-translate-y-0.5'
              } ${girata ? 'is-flipped' : ''}`}
            >
              <span className="flip-inner block">
                {/* Dorso */}
                <span className="flip-face border border-line bg-canvas-subtle text-fg-subtle">
                  <span className="flex size-8 items-center justify-center rounded-md border border-line bg-canvas">
                    <Icon name="code" size={15} />
                  </span>
                </span>

                {/* Fronte */}
                <span
                  className="flip-back flip-face flex-col gap-1 border p-1 text-center"
                  style={{
                    borderColor: tinta,
                    backgroundColor: `color-mix(in oklab, ${tinta} 12%, var(--color-canvas))`,
                    opacity: abbinata ? 1 : 0.95,
                  }}
                >
                  {/* Se c'è un logo vero lo usiamo, altrimenti il simbolo di casa. */}
                  {carta.tech.logo ? (
                    <img src={carta.tech.logo} alt="" aria-hidden="true" className="size-5" />
                  ) : (
                    <Icon name={carta.tech.icon} size={18} style={{ color: tinta }} />
                  )}
                  <span className="text-[10.5px] leading-tight font-semibold break-words text-fg">
                    {carta.tech.nome}
                  </span>
                  {abbinata && <Icon name="check" size={10} className="text-success" />}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line-muted px-4 py-3">
        <p className="text-xs text-fg-muted" aria-live="polite">
          {vinto ? `Completato in ${mosse} mosse.` : `${mosse} mosse · due carte alla volta`}
        </p>
        <Button variant="invisible" size="sm" onClick={ricomincia} icon="play">
          {vinto ? 'Rigioca' : 'Rimescola'}
        </Button>
      </div>
    </div>
  )
}
