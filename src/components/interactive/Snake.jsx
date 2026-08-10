import { useEffect, useRef, useState } from 'react'
import ArcadeFrame, { Hud, TouchPad } from './ArcadeFrame'
import Button from '../ui/Button'

/**
 * "Pipeline" — il serpente di sempre, vestito da coda di build: si allunga
 * ogni volta che raccoglie un commit e si schianta contro i bordi o contro sé
 * stessa. Anche qui non si salva niente.
 */

const COLONNE = 24
const RIGHE = 14
const CELLA = 20
const VISTA_W = COLONNE * CELLA
const VISTA_H = RIGHE * CELLA

const DIREZIONI = {
  su: { x: 0, y: -1 },
  giu: { x: 0, y: 1 },
  sinistra: { x: -1, y: 0 },
  destra: { x: 1, y: 0 },
}

const COLORI = {
  fondo: '#0b1220',
  griglia: '#161b26',
  corpo: '#3fb950',
  testa: '#56d364',
  cibo: '#d29922',
}

function ciboCasuale(corpo) {
  let posizione
  do {
    posizione = {
      x: Math.floor(Math.random() * COLONNE),
      y: Math.floor(Math.random() * RIGHE),
    }
  } while (corpo.some((c) => c.x === posizione.x && c.y === posizione.y))
  return posizione
}

function nuovaPartita() {
  const corpo = [
    { x: 6, y: 7 },
    { x: 5, y: 7 },
    { x: 4, y: 7 },
  ]
  return { corpo, direzione: 'destra', prossima: 'destra', cibo: ciboCasuale(corpo), accumulo: 0 }
}

export default function Snake() {
  const canvasRef = useRef(null)
  const partita = useRef(nuovaPartita())
  const statoRef = useRef('pronto') // pronto | gioca | pausa | finito
  const punteggioRef = useRef(0)

  const [stato, setStato] = useState('pronto')
  const [punteggio, setPunteggio] = useState(0)
  const [record, setRecord] = useState(0)

  function cambiaStato(nuovo) {
    statoRef.current = nuovo
    setStato(nuovo)
  }

  function riparti() {
    partita.current = nuovaPartita()
    punteggioRef.current = 0
    setPunteggio(0)
    cambiaStato('gioca')
  }

  function sterza(direzione) {
    const attuale = DIREZIONI[partita.current.direzione]
    const nuova = DIREZIONI[direzione]
    // Non si torna indietro su sé stessi.
    if (attuale.x + nuova.x === 0 && attuale.y + nuova.y === 0) return
    partita.current.prossima = direzione
    if (statoRef.current !== 'gioca') riparti()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = VISTA_W * dpr
    canvas.height = VISTA_H * dpr
    ctx.scale(dpr, dpr)

    let raf
    let ultimo = performance.now()
    let visibile = true

    const osservatore = new IntersectionObserver(
      ([voce]) => {
        visibile = voce.isIntersecting
        if (!visibile && statoRef.current === 'gioca') cambiaStato('pausa')
      },
      { threshold: 0.25 },
    )
    osservatore.observe(canvas)

    function avanza() {
      const g = partita.current
      g.direzione = g.prossima
      const d = DIREZIONI[g.direzione]
      const testa = { x: g.corpo[0].x + d.x, y: g.corpo[0].y + d.y }

      const fuori = testa.x < 0 || testa.y < 0 || testa.x >= COLONNE || testa.y >= RIGHE
      const addosso = g.corpo.some((c) => c.x === testa.x && c.y === testa.y)
      if (fuori || addosso) {
        setRecord((r) => Math.max(r, punteggioRef.current))
        cambiaStato('finito')
        return
      }

      g.corpo.unshift(testa)

      if (testa.x === g.cibo.x && testa.y === g.cibo.y) {
        g.cibo = ciboCasuale(g.corpo)
        punteggioRef.current += 1
        setPunteggio(punteggioRef.current)
      } else {
        g.corpo.pop()
      }
    }

    function disegna() {
      const g = partita.current

      ctx.fillStyle = COLORI.fondo
      ctx.fillRect(0, 0, VISTA_W, VISTA_H)

      ctx.strokeStyle = COLORI.griglia
      ctx.lineWidth = 1
      for (let x = 1; x < COLONNE; x++) {
        ctx.beginPath()
        ctx.moveTo(x * CELLA + 0.5, 0)
        ctx.lineTo(x * CELLA + 0.5, VISTA_H)
        ctx.stroke()
      }
      for (let y = 1; y < RIGHE; y++) {
        ctx.beginPath()
        ctx.moveTo(0, y * CELLA + 0.5)
        ctx.lineTo(VISTA_W, y * CELLA + 0.5)
        ctx.stroke()
      }

      // Commit da raccogliere
      ctx.fillStyle = COLORI.cibo
      ctx.beginPath()
      ctx.arc(g.cibo.x * CELLA + CELLA / 2, g.cibo.y * CELLA + CELLA / 2, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = COLORI.fondo
      ctx.beginPath()
      ctx.arc(g.cibo.x * CELLA + CELLA / 2, g.cibo.y * CELLA + CELLA / 2, 2.2, 0, Math.PI * 2)
      ctx.fill()

      // La pipeline
      g.corpo.forEach((c, i) => {
        ctx.fillStyle = i === 0 ? COLORI.testa : COLORI.corpo
        ctx.globalAlpha = i === 0 ? 1 : Math.max(0.4, 1 - i * 0.035)
        ctx.beginPath()
        ctx.roundRect(c.x * CELLA + 2, c.y * CELLA + 2, CELLA - 4, CELLA - 4, 5)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      if (statoRef.current !== 'gioca') {
        ctx.fillStyle = 'rgba(1, 4, 9, 0.72)'
        ctx.fillRect(0, 0, VISTA_W, VISTA_H)
      }
    }

    const passo = (ora) => {
      const dt = ora - ultimo
      ultimo = ora

      if (visibile) {
        if (statoRef.current === 'gioca') {
          // Più commit raccogli, più la pipeline corre.
          const intervallo = Math.max(70, 150 - punteggioRef.current * 4)
          partita.current.accumulo += dt
          while (partita.current.accumulo >= intervallo && statoRef.current === 'gioca') {
            partita.current.accumulo -= intervallo
            avanza()
          }
        }
        disegna()
      }
      raf = requestAnimationFrame(passo)
    }

    raf = requestAnimationFrame(passo)
    return () => {
      cancelAnimationFrame(raf)
      osservatore.disconnect()
    }
  }, [])

  function onKeyDown(event) {
    const mappa = {
      ArrowUp: 'su',
      ArrowDown: 'giu',
      ArrowLeft: 'sinistra',
      ArrowRight: 'destra',
      w: 'su',
      s: 'giu',
      a: 'sinistra',
      d: 'destra',
    }
    const direzione = mappa[event.key]
    if (!direzione) return
    event.preventDefault()
    sterza(direzione)
  }

  const messaggi = {
    pronto: { titolo: 'Pipeline', testo: 'Frecce per guidare la build.', azione: 'Gioca' },
    pausa: { titolo: 'In pausa', testo: 'Riprende quando torna sullo schermo.', azione: 'Riprendi' },
    finito: {
      titolo: 'Build interrotta',
      testo: `Commit raccolti: ${punteggio}.`,
      azione: 'Riprova',
    },
  }[stato]

  return (
    <ArcadeFrame
      title="Pipeline"
      subtitle="Il serpente, ma la coda è la tua build: allungala senza schiantarti."
      icon="workflow"
      accent="var(--color-accent)"
      hud={
        <div className="flex flex-wrap items-center gap-1.5">
          <Hud label="commit" value={punteggio} tone="var(--color-attention)" />
          <Hud label="record" value={record} />
        </div>
      }
      footer={
        <>
          <p className="text-xs text-fg-muted">
            <span className="hidden sm:inline">Frecce o WASD · </span>
            Accelera a ogni commit raccolto.
          </p>
          <div className="flex items-center gap-2">
            <TouchPad
              onPress={(id) => sterza(id)}
              onRelease={() => {}}
              buttons={[
                { id: 'sinistra', icon: 'chevronRight', label: 'Sinistra', transform: 'scaleX(-1)' },
                { id: 'su', icon: 'chevronDown', label: 'Su', transform: 'rotate(180deg)' },
                { id: 'giu', icon: 'chevronDown', label: 'Giù' },
                { id: 'destra', icon: 'chevronRight', label: 'Destra' },
              ]}
            />
            <Button variant="invisible" size="sm" icon="play" onClick={riparti}>
              {stato === 'gioca' ? 'Ricomincia' : messaggi.azione}
            </Button>
          </div>
        </>
      }
    >
      <div
        tabIndex={0}
        role="application"
        aria-label="Pipeline, gioco del serpente"
        onKeyDown={onKeyDown}
        className="relative mx-auto max-w-[36rem] overflow-hidden rounded-lg border border-line outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <canvas
          ref={canvasRef}
          className="pixelated block w-full"
          style={{ aspectRatio: `${VISTA_W} / ${VISTA_H}` }}
        />

        {stato !== 'gioca' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-y-auto p-4 text-center sm:gap-3 sm:p-6">
            <p className="display text-2xl text-fg sm:text-3xl">{messaggi.titolo}</p>
            <p className="max-w-xs text-[13px] text-fg-muted sm:text-sm">{messaggi.testo}</p>
            <Button variant="primary" size="md" icon="play" onClick={riparti}>
              {messaggi.azione}
            </Button>
            <p className="hidden font-mono text-[11px] text-fg-subtle sm:block">
              clicca il riquadro per usare la tastiera
            </p>
          </div>
        )}
      </div>
    </ArcadeFrame>
  )
}
