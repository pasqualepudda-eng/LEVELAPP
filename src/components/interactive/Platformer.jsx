import { useEffect, useRef, useState } from 'react'
import ArcadeFrame, { Hud, TouchPad } from './ArcadeFrame'
import Button from '../ui/Button'

/**
 * "Deploy Run" — platformer a scorrimento orizzontale con la grammatica dei
 * classici a piattaforme: corsa, salto a altezza variabile, nemici da
 * schiacciare, monete e bandiera in fondo al livello.
 *
 * Personaggio, nemici, livello, palette e regole sono disegnati da noi: è del
 * genere di quei giochi, non una copia dei loro contenuti.
 *
 * Il protagonista è **Bit**, la scintilla che porta il codice in produzione:
 * corpo chiaro, visiera scura, sciarpa arancione e antenna che lampeggia.
 *
 * Il ciclo di gioco vive nei ref — aggiornare lo stato di React a ogni
 * fotogramma sarebbe uno spreco: a React arrivano solo i numeri della barra di
 * stato, e solo quando cambiano.
 */

const TILE = 24
const VISTA_W = 720
const VISTA_H = 360

/* Fisica. Salto alto ~3,7 caselle, portata orizzontale ~5: le buche da tre e
   le piattaforme del livello sono tutte raggiungibili. */
const GRAVITA = 0.78
const SALTO = -11.6
const SPINTA_TERRA = 0.95
const SPINTA_ARIA = 0.55
const VEL_MAX = 4.2
const ATTRITO = 0.84
const VEL_NEMICO = 0.85
const COYOTE = 6 // fotogrammi di grazia dopo aver lasciato il bordo
const BUFFER_SALTO = 7 // salto premuto poco prima di atterrare
const INVULNERABILITA = 80

/* ------------------------------------------------------------------
   Livello
   ------------------------------------------------------------------ */

const MONDO = {
  colonne: 120,
  righe: 15,
  suolo: 13,
  buche: [
    [26, 28],
    [55, 57],
    [84, 86],
  ],
  piattaforme: [
    { x: 9, y: 10, w: 3 },
    { x: 15, y: 8, w: 4 },
    { x: 22, y: 9, w: 3 },
    { x: 31, y: 10, w: 4 },
    { x: 38, y: 7, w: 3 },
    { x: 44, y: 9, w: 5 },
    { x: 52, y: 10, w: 2 },
    { x: 60, y: 8, w: 4 },
    { x: 67, y: 10, w: 3 },
    { x: 73, y: 7, w: 4 },
    { x: 80, y: 9, w: 3 },
    { x: 89, y: 10, w: 4 },
    { x: 96, y: 8, w: 3 },
    { x: 102, y: 10, w: 4 },
    { x: 108, y: 9, w: 2 },
  ],
  monete: [
    [10, 9], [16, 7], [17, 7], [23, 8], [32, 9], [33, 9], [39, 6], [45, 8],
    [46, 8], [47, 8], [61, 7], [62, 7], [68, 9], [74, 6], [75, 6], [81, 8],
    [90, 9], [91, 9], [97, 7], [103, 9], [104, 9], [12, 12], [35, 12], [58, 12],
    [70, 12], [93, 12], [109, 8],
  ],
  nemici: [14, 30, 42, 50, 66, 78, 94, 106],
  traguardo: 115,
}

const LARGHEZZA_MONDO = MONDO.colonne * TILE

function costruisciSolidi() {
  const griglia = Array.from({ length: MONDO.righe }, () => new Array(MONDO.colonne).fill(false))

  for (let x = 0; x < MONDO.colonne; x++) {
    if (MONDO.buche.some(([da, a]) => x >= da && x <= a)) continue
    for (let y = MONDO.suolo; y < MONDO.righe; y++) griglia[y][x] = true
  }
  for (const p of MONDO.piattaforme) {
    for (let i = 0; i < p.w; i++) {
      if (p.x + i < MONDO.colonne) griglia[p.y][p.x + i] = true
    }
  }
  return griglia
}

const SOLIDI = costruisciSolidi()

function solido(cx, cy) {
  if (cy < 0 || cy >= MONDO.righe) return false
  if (cx < 0) return true // muro invisibile: non si esce a sinistra
  if (cx >= MONDO.colonne) return false
  return SOLIDI[cy][cx]
}

/* ------------------------------------------------------------------
   Collisioni: un asse alla volta, controllando TUTTE le caselle toccate.
   (La versione precedente si fermava alla prima e lasciava il corpo dentro
   al blocco quando ne toccava due insieme.)
   ------------------------------------------------------------------ */

function risolviAsse(corpo, asse) {
  const daX = Math.floor(corpo.x / TILE)
  const aX = Math.floor((corpo.x + corpo.w - 0.01) / TILE)
  const daY = Math.floor(corpo.y / TILE)
  const aY = Math.floor((corpo.y + corpo.h - 0.01) / TILE)

  for (let cy = daY; cy <= aY; cy++) {
    for (let cx = daX; cx <= aX; cx++) {
      if (!solido(cx, cy)) continue

      // La posizione può essere già stata corretta da una casella precedente:
      // prima di spingere, verifichiamo che ci sia ancora sovrapposizione.
      const bloccoX = cx * TILE
      const bloccoY = cy * TILE
      const tocca =
        corpo.x + corpo.w > bloccoX &&
        corpo.x < bloccoX + TILE &&
        corpo.y + corpo.h > bloccoY &&
        corpo.y < bloccoY + TILE
      if (!tocca) continue

      if (asse === 'x') {
        if (corpo.vx > 0) corpo.x = bloccoX - corpo.w
        else if (corpo.vx < 0) corpo.x = bloccoX + TILE
        corpo.vx = 0
        corpo.control = true // ha toccato un muro: serve ai nemici per girarsi
      } else {
        if (corpo.vy > 0) {
          corpo.y = bloccoY - corpo.h
          corpo.aTerra = true
        } else if (corpo.vy < 0) {
          corpo.y = bloccoY + TILE
        }
        corpo.vy = 0
      }
    }
  }
}

function nuovaPartita() {
  return {
    eroe: {
      x: 2 * TILE,
      y: (MONDO.suolo - 2) * TILE,
      w: 18,
      h: 22,
      vx: 0,
      vy: 0,
      aTerra: false,
      guarda: 1,
      coyote: 0,
      invuln: 0,
      passo: 0,
    },
    nemici: MONDO.nemici.map((x) => ({
      x: x * TILE + 3,
      y: (MONDO.suolo - 1) * TILE,
      w: 18,
      h: 18,
      dir: -1,
      vx: 0,
      vy: 0,
      vivo: true,
      aTerra: false,
      control: false,
    })),
    monete: MONDO.monete.map(([x, y]) => ({ x: x * TILE + 12, y: y * TILE + 12, presa: false })),
    particelle: [],
    camera: 0,
    tempo: 0,
  }
}

/* ------------------------------------------------------------------
   Palette diurna, da cartone animato a blocchi
   ------------------------------------------------------------------ */

const C = {
  cieloAlto: '#5fb8f5',
  cieloBasso: '#bfe7ff',
  sole: '#fff3b0',
  nuvola: '#ffffff',
  collinaLontana: '#7fc98a',
  collinaVicina: '#57ad6a',
  terra: '#b5763f',
  terraScura: '#8a5628',
  erba: '#57c05e',
  erbaScura: '#3f9c4a',
  cassa: '#e6b062',
  cassaBordo: '#a9702c',
  moneta: '#ffcc33',
  monetaBordo: '#c98f14',
  nemico: '#8b5cf6',
  nemicoScuro: '#5b2fc4',
  corpo: '#f5f8ff',
  visiera: '#1f2937',
  sciarpa: '#ff8a3d',
  antenna: '#22c55e',
  asta: '#7d8590',
  bandiera: '#22c55e',
}

function nuvola(ctx, x, y, s) {
  ctx.fillStyle = C.nuvola
  ctx.beginPath()
  ctx.arc(x, y, 12 * s, 0, Math.PI * 2)
  ctx.arc(x + 14 * s, y - 6 * s, 15 * s, 0, Math.PI * 2)
  ctx.arc(x + 30 * s, y, 12 * s, 0, Math.PI * 2)
  ctx.rect(x - 2, y, 34 * s, 12 * s)
  ctx.fill()
}

/** Bit: corpo chiaro, visiera scura, sciarpa arancione, antenna che lampeggia. */
function disegnaBit(ctx, e, tempo) {
  // Lampeggia dopo un colpo preso
  if (e.invuln > 0 && Math.floor(tempo / 4) % 2 === 0) return

  const corsa = e.aTerra && Math.abs(e.vx) > 0.3
  const oscilla = corsa ? Math.sin(e.passo / 3) * 1.5 : 0
  const x = e.x
  const y = e.y + oscilla

  // Scarpe
  ctx.fillStyle = C.visiera
  ctx.beginPath()
  ctx.roundRect(x - 1, y + e.h - 4, 8, 4, 2)
  ctx.roundRect(x + e.w - 7, y + e.h - 4, 8, 4, 2)
  ctx.fill()

  // Corpo
  ctx.fillStyle = C.corpo
  ctx.beginPath()
  ctx.roundRect(x, y, e.w, e.h - 3, 6)
  ctx.fill()
  ctx.strokeStyle = 'rgba(31,41,55,0.25)'
  ctx.lineWidth = 1
  ctx.stroke()

  // Sciarpa, che svolazza quando si corre o si salta
  ctx.fillStyle = C.sciarpa
  ctx.beginPath()
  ctx.roundRect(x - 1, y + 11, e.w + 2, 4, 2)
  ctx.fill()
  const svolazzo = e.aTerra ? Math.sin(tempo / 5) * 2 : -4
  ctx.beginPath()
  ctx.moveTo(x + (e.guarda > 0 ? 1 : e.w - 1), y + 12)
  ctx.lineTo(x + (e.guarda > 0 ? -7 : e.w + 7), y + 13 + svolazzo)
  ctx.lineTo(x + (e.guarda > 0 ? 1 : e.w - 1), y + 16)
  ctx.closePath()
  ctx.fill()

  // Visiera
  ctx.fillStyle = C.visiera
  ctx.beginPath()
  ctx.roundRect(x + 2, y + 4, e.w - 4, 6, 3)
  ctx.fill()

  // Occhi accesi dentro la visiera
  ctx.fillStyle = '#7dd3fc'
  const spostamento = e.guarda > 0 ? 1 : -1
  ctx.beginPath()
  ctx.roundRect(x + 5 + spostamento, y + 6, 3, 2.5, 1)
  ctx.roundRect(x + e.w - 8 + spostamento, y + 6, 3, 2.5, 1)
  ctx.fill()

  // Antenna
  ctx.strokeStyle = C.visiera
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(x + e.w / 2, y)
  ctx.lineTo(x + e.w / 2 + 2, y - 5)
  ctx.stroke()
  ctx.fillStyle = Math.floor(tempo / 18) % 2 === 0 ? C.antenna : '#166534'
  ctx.beginPath()
  ctx.arc(x + e.w / 2 + 2, y - 6, 2.2, 0, Math.PI * 2)
  ctx.fill()
}

/** Nemico: un "glitch" viola che ciondola avanti e indietro. */
function disegnaGlitch(ctx, n, tempo) {
  const su = Math.sin((tempo + n.x) / 9) * 1.5
  const y = n.y + su

  ctx.fillStyle = C.nemicoScuro
  ctx.beginPath()
  ctx.roundRect(n.x - 3, y + n.h - 4, n.w + 6, 4, 2)
  ctx.fill()

  ctx.fillStyle = C.nemico
  ctx.beginPath()
  ctx.roundRect(n.x, y, n.w, n.h - 2, 7)
  ctx.fill()

  // Antenne
  ctx.strokeStyle = C.nemicoScuro
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(n.x + 5, y + 1)
  ctx.lineTo(n.x + 2, y - 4)
  ctx.moveTo(n.x + n.w - 5, y + 1)
  ctx.lineTo(n.x + n.w - 2, y - 4)
  ctx.stroke()

  // Occhi arrabbiati
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.arc(n.x + 6, y + 8, 3, 0, Math.PI * 2)
  ctx.arc(n.x + n.w - 6, y + 8, 3, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = C.visiera
  ctx.beginPath()
  ctx.arc(n.x + 6 + n.dir, y + 8, 1.5, 0, Math.PI * 2)
  ctx.arc(n.x + n.w - 6 + n.dir, y + 8, 1.5, 0, Math.PI * 2)
  ctx.fill()
}

function disegna(ctx, g, stato) {
  const cam = g.camera

  // Cielo
  const cielo = ctx.createLinearGradient(0, 0, 0, VISTA_H)
  cielo.addColorStop(0, C.cieloAlto)
  cielo.addColorStop(1, C.cieloBasso)
  ctx.fillStyle = cielo
  ctx.fillRect(0, 0, VISTA_W, VISTA_H)

  // Sole
  ctx.fillStyle = C.sole
  ctx.globalAlpha = 0.9
  ctx.beginPath()
  ctx.arc(VISTA_W - 90, 60, 26, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = 1

  // Nuvole (parallasse lenta)
  for (let i = 0; i < 8; i++) {
    const x = ((i * 210 - cam * 0.15) % (VISTA_W + 260)) - 130
    nuvola(ctx, x, 46 + ((i * 37) % 40), 0.8 + ((i % 3) * 0.18))
  }

  // Colline, due profondità
  ctx.fillStyle = C.collinaLontana
  for (let i = 0; i < 10; i++) {
    const x = ((i * 190 - cam * 0.3) % (VISTA_W + 260)) - 130
    ctx.beginPath()
    ctx.arc(x, VISTA_H - 96, 70, Math.PI, 0)
    ctx.fill()
  }
  ctx.fillStyle = C.collinaVicina
  for (let i = 0; i < 10; i++) {
    const x = ((i * 150 - cam * 0.55) % (VISTA_W + 220)) - 110
    ctx.beginPath()
    ctx.arc(x, VISTA_H - 78, 52, Math.PI, 0)
    ctx.fill()
  }

  // Blocchi
  const prima = Math.max(0, Math.floor(cam / TILE) - 1)
  const ultima = Math.min(MONDO.colonne - 1, Math.ceil((cam + VISTA_W) / TILE))

  for (let cx = prima; cx <= ultima; cx++) {
    for (let cy = 0; cy < MONDO.righe; cy++) {
      if (!SOLIDI[cy][cx]) continue
      const x = cx * TILE - cam
      const y = cy * TILE
      const suolo = cy >= MONDO.suolo
      const scoperto = !SOLIDI[cy - 1]?.[cx]

      if (suolo) {
        ctx.fillStyle = C.terra
        ctx.fillRect(x, y, TILE, TILE)
        ctx.fillStyle = C.terraScura
        ctx.fillRect(x, y + TILE - 3, TILE, 3)
        // Sassolini
        ctx.fillStyle = 'rgba(0,0,0,0.10)'
        ctx.fillRect(x + 5, y + 9, 4, 3)
        ctx.fillRect(x + 14, y + 15, 5, 3)
        if (scoperto) {
          ctx.fillStyle = C.erba
          ctx.fillRect(x, y, TILE, 7)
          ctx.fillStyle = C.erbaScura
          ctx.fillRect(x, y + 7, TILE, 2)
        }
      } else {
        // Cassa di consegna: legno chiaro, bordo scuro, croce di rinforzo
        ctx.fillStyle = C.cassa
        ctx.beginPath()
        ctx.roundRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1, 3)
        ctx.fill()
        ctx.strokeStyle = C.cassaBordo
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x + 3, y + 3)
        ctx.lineTo(x + TILE - 3, y + TILE - 3)
        ctx.moveTo(x + TILE - 3, y + 3)
        ctx.lineTo(x + 3, y + TILE - 3)
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }
  }

  // Monete: girano schiacciandosi sull'asse X
  g.monete.forEach((m, i) => {
    if (m.presa) return
    const larghezza = Math.abs(Math.cos((g.tempo + i * 12) / 12)) * 7 + 1.5
    ctx.fillStyle = C.moneta
    ctx.beginPath()
    ctx.ellipse(m.x - cam, m.y, larghezza, 8, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = C.monetaBordo
    ctx.lineWidth = 1.5
    ctx.stroke()
  })

  // Traguardo
  const bx = MONDO.traguardo * TILE - cam
  ctx.fillStyle = C.asta
  ctx.fillRect(bx, (MONDO.suolo - 7) * TILE, 4, 7 * TILE)
  ctx.fillStyle = C.bandiera
  ctx.beginPath()
  ctx.moveTo(bx + 4, (MONDO.suolo - 7) * TILE + 4)
  ctx.lineTo(bx + 46, (MONDO.suolo - 6) * TILE)
  ctx.lineTo(bx + 4, (MONDO.suolo - 5) * TILE)
  ctx.closePath()
  ctx.fill()

  g.nemici.forEach((n) => n.vivo && disegnaGlitch(ctx, n, g.tempo))
  disegnaBit(ctx, g.eroe, g.tempo)

  // Particelle di monete e nemici schiacciati
  g.particelle.forEach((p) => {
    ctx.globalAlpha = Math.max(0, p.vita / 30)
    ctx.fillStyle = p.colore
    ctx.beginPath()
    ctx.arc(p.x - cam, p.y, p.r, 0, Math.PI * 2)
    ctx.fill()
  })
  ctx.globalAlpha = 1

  if (stato !== 'gioca') {
    ctx.fillStyle = 'rgba(9, 20, 34, 0.66)'
    ctx.fillRect(0, 0, VISTA_W, VISTA_H)
  }
}

/* ------------------------------------------------------------------
   Componente
   ------------------------------------------------------------------ */

export default function Platformer() {
  const canvasRef = useRef(null)
  const partita = useRef(nuovaPartita())
  const tasti = useRef({ sinistra: false, destra: false, salto: false })
  const saltoBuffer = useRef(0)
  const saltoTenuto = useRef(false)
  const statoRef = useRef('pronto') // pronto | gioca | pausa | morto | finito | vinto
  const hudRef = useRef({ monete: 0, vite: 3 })

  const [stato, setStato] = useState('pronto')
  const [hud, setHud] = useState({ monete: 0, vite: 3 })

  function cambiaStato(nuovo) {
    statoRef.current = nuovo
    setStato(nuovo)
  }

  /** Riprende dalla pausa senza toccare la partita in corso. */
  function riprendi() {
    cambiaStato('gioca')
  }

  /** Ricomincia il livello. Con `daCapo` azzera anche punteggio e vite. */
  function riparti(daCapo) {
    partita.current = nuovaPartita()
    if (daCapo) hudRef.current = { monete: 0, vite: 3 }
    setHud({ ...hudRef.current })
    cambiaStato('gioca')
  }

  /** Il pulsante grande fa la cosa giusta a seconda di dove ti trovi. */
  function azione() {
    if (statoRef.current === 'pausa') return riprendi()
    riparti(statoRef.current === 'finito' || statoRef.current === 'vinto')
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
        // Uscire dalla vista mette in pausa: non si perde una vita mentre si
        // legge il resto della pagina. Al ritorno si riprende, non si ricomincia.
        if (!visibile && statoRef.current === 'gioca') cambiaStato('pausa')
      },
      { threshold: 0.3 },
    )
    osservatore.observe(canvas)

    function scintille(x, y, colore, quante) {
      for (let i = 0; i < quante; i++) {
        partita.current.particelle.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 2.5 - 0.5,
          r: 1.5 + Math.random() * 1.5,
          vita: 30,
          colore,
        })
      }
    }

    function perdiVita() {
      hudRef.current = { ...hudRef.current, vite: hudRef.current.vite - 1 }
      setHud({ ...hudRef.current })

      if (hudRef.current.vite <= 0) {
        cambiaStato('finito')
        return
      }

      const monete = hudRef.current.monete
      partita.current = nuovaPartita()
      partita.current.eroe.invuln = INVULNERABILITA
      hudRef.current = { ...hudRef.current, monete }
      cambiaStato('morto')
    }

    function aggiorna(dt) {
      const g = partita.current
      const e = g.eroe
      g.tempo += dt

      /* --- Movimento orizzontale, con controllo ridotto in aria --- */
      const spinta = e.aTerra ? SPINTA_TERRA : SPINTA_ARIA
      if (tasti.current.sinistra !== tasti.current.destra) {
        e.vx += (tasti.current.destra ? spinta : -spinta) * dt
        e.guarda = tasti.current.destra ? 1 : -1
      } else if (e.aTerra) {
        e.vx *= ATTRITO
      }
      e.vx = Math.max(-VEL_MAX, Math.min(VEL_MAX, e.vx))
      if (Math.abs(e.vx) < 0.05) e.vx = 0
      e.passo += Math.abs(e.vx) * dt

      /* --- Salto: si riparte solo dopo aver rilasciato il tasto, vale il
             tempo di grazia sul bordo e il salto premuto in anticipo --- */
      if (tasti.current.salto && !saltoTenuto.current) {
        saltoBuffer.current = BUFFER_SALTO
        saltoTenuto.current = true
      }
      if (!tasti.current.salto) saltoTenuto.current = false

      if (saltoBuffer.current > 0 && (e.aTerra || e.coyote > 0)) {
        e.vy = SALTO
        e.aTerra = false
        e.coyote = 0
        saltoBuffer.current = 0
      }
      saltoBuffer.current = Math.max(0, saltoBuffer.current - dt)

      // Salto ad altezza variabile: mollare il tasto taglia la spinta.
      if (!tasti.current.salto && e.vy < -4) e.vy = -4

      const eraATerra = e.aTerra
      e.vy = Math.min(e.vy + GRAVITA * dt, 15)
      e.aTerra = false

      e.x += e.vx * dt
      risolviAsse(e, 'x')
      e.y += e.vy * dt
      risolviAsse(e, 'y')

      e.coyote = e.aTerra ? COYOTE : Math.max(0, (eraATerra ? COYOTE : e.coyote) - dt)
      if (e.invuln > 0) e.invuln -= dt

      /* --- Nemici: camminano e si girano davanti a un muro o al vuoto --- */
      for (const n of g.nemici) {
        if (!n.vivo) continue

        n.control = false
        n.vx = n.dir * VEL_NEMICO
        n.vy = Math.min(n.vy + GRAVITA * dt, 13)

        n.x += n.vx * dt
        risolviAsse(n, 'x')
        n.y += n.vy * dt
        risolviAsse(n, 'y')

        // Girarsi: muro davanti (rilevato dalla collisione) o pavimento finito.
        const davanti = Math.floor((n.x + (n.dir > 0 ? n.w + 2 : -2)) / TILE)
        const sotto = Math.floor((n.y + n.h + 2) / TILE)
        if (n.control || !solido(davanti, sotto)) n.dir *= -1

        const tocca =
          e.x < n.x + n.w && e.x + e.w > n.x && e.y < n.y + n.h && e.y + e.h > n.y
        if (!tocca) continue

        // Schiacciato dall'alto: si scende su di lui e si rimbalza.
        if (e.vy > 0 && e.y + e.h - n.y < 16) {
          n.vivo = false
          e.vy = SALTO * 0.55
          saltoBuffer.current = 0
          scintille(n.x + n.w / 2, n.y + n.h / 2, C.nemico, 10)
        } else if (e.invuln <= 0) {
          perdiVita()
          return
        }
      }

      /* --- Monete --- */
      for (const m of g.monete) {
        if (m.presa) continue
        if (Math.abs(m.x - (e.x + e.w / 2)) < 15 && Math.abs(m.y - (e.y + e.h / 2)) < 17) {
          m.presa = true
          scintille(m.x, m.y, C.moneta, 8)
          hudRef.current = { ...hudRef.current, monete: hudRef.current.monete + 1 }
          setHud({ ...hudRef.current })
        }
      }

      /* --- Particelle --- */
      g.particelle = g.particelle.filter((p) => {
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.vy += 0.12 * dt
        p.vita -= dt
        return p.vita > 0
      })

      if (e.y > VISTA_H + 40) return perdiVita()
      if (e.x > MONDO.traguardo * TILE) return cambiaStato('vinto')

      g.camera = Math.max(0, Math.min(e.x + e.w / 2 - VISTA_W / 2, LARGHEZZA_MONDO - VISTA_W))
    }

    const passo = (ora) => {
      const dt = Math.min(2, (ora - ultimo) / 16.6667)
      ultimo = ora

      if (visibile) {
        if (statoRef.current === 'gioca') aggiorna(dt)
        disegna(ctx, partita.current, statoRef.current)
      }
      raf = requestAnimationFrame(passo)
    }

    raf = requestAnimationFrame(passo)
    return () => {
      cancelAnimationFrame(raf)
      osservatore.disconnect()
    }
  }, [])

  /* Comandi da tastiera: attivi solo col riquadro a fuoco, così frecce e barra
     spaziatrice non rubano lo scorrimento della pagina. */
  function onKeyDown(event) {
    const k = event.key
    if (['ArrowLeft', 'a', 'A'].includes(k)) tasti.current.sinistra = true
    else if (['ArrowRight', 'd', 'D'].includes(k)) tasti.current.destra = true
    else if ([' ', 'ArrowUp', 'w', 'W'].includes(k)) tasti.current.salto = true
    else return

    event.preventDefault()
    if (statoRef.current !== 'gioca') azione()
  }

  function onKeyUp(event) {
    const k = event.key
    if (['ArrowLeft', 'a', 'A'].includes(k)) tasti.current.sinistra = false
    else if (['ArrowRight', 'd', 'D'].includes(k)) tasti.current.destra = false
    else if ([' ', 'ArrowUp', 'w', 'W'].includes(k)) tasti.current.salto = false
  }

  const messaggi = {
    pronto: {
      titolo: 'Deploy Run',
      testo: 'Bit deve portare la build in produzione.',
      dettaglio: 'Frecce per correre, spazio per saltare: più lo tieni premuto, più salta in alto.',
      azione: 'Gioca',
    },
    pausa: { titolo: 'In pausa', testo: 'Il gioco si ferma quando esce dallo schermo.', azione: 'Riprendi' },
    morto: { titolo: 'Ahia', testo: `Vite rimaste: ${hud.vite}.`, azione: 'Riprova' },
    finito: { titolo: 'Rilascio fallito', testo: `Commit raccolti: ${hud.monete}.`, azione: 'Ricomincia' },
    vinto: {
      titolo: 'In produzione!',
      testo: `Bit ce l'ha fatta con ${hud.monete} commit e ${hud.vite} vite.`,
      azione: 'Rigioca',
    },
  }[stato]

  return (
    <ArcadeFrame
      title="Deploy Run"
      subtitle="Bit corre, salta i glitch e raccoglie i commit fino alla bandiera del rilascio."
      icon="rocket"
      accent="var(--color-success)"
      hud={
        <div className="flex flex-wrap items-center gap-1.5">
          <Hud label="commit" value={hud.monete} tone="var(--color-attention)" />
          <Hud label="vite" value={'♥'.repeat(Math.max(0, hud.vite)) || '—'} tone="var(--color-danger)" />
        </div>
      }
      footer={
        <>
          <p className="text-xs text-fg-muted">
            <span className="hidden sm:inline">← → correre · spazio saltare · </span>
            Niente si salva: a pagina ricaricata si riparte dal primo livello.
          </p>
          <div className="flex items-center gap-2">
            <TouchPad
              onPress={(id) => (tasti.current[id] = true)}
              onRelease={(id) => (tasti.current[id] = false)}
              buttons={[
                { id: 'sinistra', icon: 'chevronRight', label: 'Sinistra', transform: 'scaleX(-1)' },
                { id: 'destra', icon: 'chevronRight', label: 'Destra' },
                { id: 'salto', icon: 'arrowRight', label: 'Salta', transform: 'rotate(-90deg)' },
              ]}
            />
            <Button variant="invisible" size="sm" icon="play" onClick={azione}>
              {stato === 'gioca' ? 'Ricomincia' : messaggi.azione}
            </Button>
          </div>
        </>
      }
    >
      <div
        tabIndex={0}
        role="application"
        aria-label="Deploy Run, gioco a piattaforme"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={() => {
          tasti.current = { sinistra: false, destra: false, salto: false }
          saltoTenuto.current = false
        }}
        className="relative overflow-hidden rounded-lg border border-line outline-none focus-visible:ring-2 focus-visible:ring-success"
      >
        <canvas
          ref={canvasRef}
          className="pixelated block w-full"
          style={{ aspectRatio: `${VISTA_W} / ${VISTA_H}` }}
        />

        {stato !== 'gioca' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-y-auto p-4 text-center sm:gap-3 sm:p-6">
            <p className="display text-2xl text-white drop-shadow-lg sm:text-4xl">{messaggi.titolo}</p>
            <p className="max-w-xs text-[13px] text-white/85 sm:max-w-sm sm:text-sm">{messaggi.testo}</p>
            {messaggi.dettaglio && (
              <p className="hidden max-w-sm text-sm text-white/70 sm:block">{messaggi.dettaglio}</p>
            )}
            <Button variant="primary" size="lg" icon="play" onClick={azione}>
              {messaggi.azione}
            </Button>
            <p className="hidden font-mono text-[11px] text-white/60 sm:block">
              clicca il riquadro per usare la tastiera
            </p>
          </div>
        )}
      </div>
    </ArcadeFrame>
  )
}
