/**
 * "Deploy Run" — logica del gioco, senza React e senza canvas.
 *
 * È un auto-runner con un tasto solo, alla maniera dei giochi a ritmo: Bit
 * corre sempre in avanti, l'unica cosa che puoi fare è saltare. Chi tocca uno
 * spuntone, sbatte contro un muro o cade nel vuoto ricomincia il livello, e il
 * tentativo si conta.
 *
 * Sta in un file a parte proprio per poterlo provare: la simulazione è
 * deterministica (nessun random, nessun tempo di sistema), quindi un test può
 * far girare un livello intero e verificare che sia superabile.
 */

export const TILE = 24
export const VISTA_W = 720
export const VISTA_H = 360
export const RIGHE = 15
export const SUOLO = 12 // prima riga di terreno

/* Fisica. Con questi numeri il salto è alto ~3,7 caselle e lungo ~5:
   le buche da tre e i gruppi di due spuntoni sono tutti superabili. */
export const VEL_CORSA = 3.5
export const GRAVITA = 0.62
export const SALTO = -10.6
export const VEL_CADUTA_MAX = 14

/* ------------------------------------------------------------------
   Livello
   ------------------------------------------------------------------ */

export const LIVELLO = {
  colonne: 136,
  traguardo: 132,
  // Tratti senza terreno: [prima colonna, ultima colonna]
  buche: [
    [28, 30],
    [54, 56],
    [80, 82],
    [104, 106],
  ],
  // Spuntoni appoggiati a terra (occupano la riga sopra il suolo)
  spuntoni: [16, 22, 38, 39, 46, 64, 70, 71, 90, 96, 112, 118, 119],
  // Blocchi sospesi: { x, y, w }
  blocchi: [
    { x: 33, y: 10, w: 3 },
    { x: 60, y: 10, w: 3 },
    { x: 86, y: 10, w: 3 },
    { x: 110, y: 10, w: 3 },
  ],
  // Spuntoni sopra i blocchi: [colonna, riga del blocco]
  spuntoniAlti: [
    [34, 10],
    [61, 10],
    [111, 10],
  ],
  monete: [
    [12, 11], [19, 10], [25, 10], [34, 8], [42, 11], [50, 11], [61, 8],
    [67, 10], [76, 11], [87, 8], [93, 11], [100, 11], [111, 8], [122, 11],
    [128, 11],
  ],
}

/* Griglia dei blocchi solidi, costruita una volta sola. */
function costruisciSolidi() {
  const griglia = Array.from({ length: RIGHE }, () => new Array(LIVELLO.colonne).fill(false))

  for (let x = 0; x < LIVELLO.colonne; x++) {
    if (LIVELLO.buche.some(([da, a]) => x >= da && x <= a)) continue
    for (let y = SUOLO; y < RIGHE; y++) griglia[y][x] = true
  }
  for (const b of LIVELLO.blocchi) {
    for (let i = 0; i < b.w; i++) {
      if (b.x + i < LIVELLO.colonne) griglia[b.y][b.x + i] = true
    }
  }
  return griglia
}

export const SOLIDI = costruisciSolidi()

export function solido(cx, cy) {
  if (cy < 0 || cy >= RIGHE) return false
  if (cx < 0) return true
  if (cx >= LIVELLO.colonne) return false
  return SOLIDI[cy][cx]
}

/** Rettangoli degli spuntoni, in pixel: servono a collisioni e disegno. */
export const SPUNTONI = [
  ...LIVELLO.spuntoni.map((x) => ({ x: x * TILE, y: (SUOLO - 1) * TILE, w: TILE, h: TILE })),
  ...LIVELLO.spuntoniAlti.map(([x, y]) => ({
    x: x * TILE,
    y: (y - 1) * TILE,
    w: TILE,
    h: TILE,
  })),
]

/* ------------------------------------------------------------------
   Stato
   ------------------------------------------------------------------ */

export function creaStato() {
  return {
    eroe: {
      x: 3 * TILE,
      y: (SUOLO - 1) * TILE - 20,
      w: 20,
      h: 20,
      vy: 0,
      aTerra: true,
      rotazione: 0,
    },
    monete: LIVELLO.monete.map(([x, y]) => ({ x: x * TILE + 12, y: y * TILE + 12, presa: false })),
    particelle: [],
    scia: [],
    camera: 0,
    tempo: 0,
    morto: false,
    vinto: false,
    monetePrese: 0,
  }
}

/** Percentuale di livello percorsa, da 0 a 100. */
export function progresso(stato) {
  const totale = LIVELLO.traguardo * TILE - 3 * TILE
  return Math.max(0, Math.min(100, Math.round(((stato.eroe.x - 3 * TILE) / totale) * 100)))
}

function sovrappone(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
}

/**
 * Avanza la simulazione di `dt` fotogrammi (1 = 60 fps).
 * `salta` è lo stato del tasto in questo istante.
 * Restituisce gli eventi del passo, per suoni ed effetti.
 */
export function aggiorna(stato, dt, salta) {
  const eventi = { saltato: false, moneta: 0, morto: false, vinto: false }
  if (stato.morto || stato.vinto) return eventi

  const e = stato.eroe
  stato.tempo += dt

  // Tenendo premuto si risalta appena si tocca terra, come nei giochi a ritmo.
  if (salta && e.aTerra) {
    e.vy = SALTO
    e.aTerra = false
    eventi.saltato = true
  }

  /* --- Verticale --- */
  e.vy = Math.min(e.vy + GRAVITA * dt, VEL_CADUTA_MAX)
  const eraATerra = e.aTerra
  e.aTerra = false

  e.y += e.vy * dt
  const daX = Math.floor(e.x / TILE)
  const aX = Math.floor((e.x + e.w - 0.01) / TILE)
  for (let cx = daX; cx <= aX; cx++) {
    const cy = e.vy > 0 ? Math.floor((e.y + e.h - 0.01) / TILE) : Math.floor(e.y / TILE)
    if (!solido(cx, cy)) continue
    if (e.vy > 0) {
      e.y = cy * TILE - e.h
      e.aTerra = true
    } else {
      e.y = (cy + 1) * TILE
    }
    e.vy = 0
    break
  }

  /* --- Orizzontale: la corsa non si ferma mai --- */
  e.x += VEL_CORSA * dt
  const su = Math.floor(e.y / TILE)
  const giu = Math.floor((e.y + e.h - 0.01) / TILE)
  const avanti = Math.floor((e.x + e.w - 0.01) / TILE)
  for (let cy = su; cy <= giu; cy++) {
    if (!solido(avanti, cy)) continue
    // Muso contro un muro: qui si ricomincia, non ci si incastra.
    stato.morto = true
    eventi.morto = true
    return eventi
  }

  /* --- Rotazione: fermo a terra, gira in aria --- */
  if (e.aTerra) {
    if (!eraATerra) e.rotazione = 0
    else e.rotazione = 0
  } else {
    e.rotazione += 0.13 * dt
  }

  /* --- Spuntoni --- */
  // Cassa di collisione più stretta del disegno: sfiorare la punta non uccide.
  const cassa = { x: e.x + 3, y: e.y + 3, w: e.w - 6, h: e.h - 4 }
  for (const s of SPUNTONI) {
    if (s.x > e.x + 80) break
    if (s.x + s.w < e.x - 40) continue
    const punta = { x: s.x + 5, y: s.y + 8, w: s.w - 10, h: s.h - 8 }
    if (sovrappone(cassa, punta)) {
      stato.morto = true
      eventi.morto = true
      return eventi
    }
  }

  /* --- Monete --- */
  for (const m of stato.monete) {
    if (m.presa) continue
    if (Math.abs(m.x - (e.x + e.w / 2)) < 16 && Math.abs(m.y - (e.y + e.h / 2)) < 18) {
      m.presa = true
      stato.monetePrese += 1
      eventi.moneta += 1
    }
  }

  /* --- Caduta nel vuoto --- */
  if (e.y > VISTA_H + 60) {
    stato.morto = true
    eventi.morto = true
    return eventi
  }

  /* --- Traguardo --- */
  if (e.x >= LIVELLO.traguardo * TILE) {
    stato.vinto = true
    eventi.vinto = true
    return eventi
  }

  /* --- Effetti (solo estetica) --- */
  stato.scia.push({ x: e.x + e.w / 2, y: e.y + e.h / 2, vita: 12 })
  if (stato.scia.length > 24) stato.scia.shift()
  for (const s of stato.scia) s.vita -= dt

  stato.particelle = stato.particelle.filter((p) => {
    p.x += p.vx * dt
    p.y += p.vy * dt
    p.vy += 0.14 * dt
    p.vita -= dt
    return p.vita > 0
  })

  stato.camera = Math.max(
    0,
    Math.min(e.x - VISTA_W * 0.32, LIVELLO.colonne * TILE - VISTA_W),
  )

  return eventi
}

/** Scintille decorative, usate dal renderer quando si prende una moneta. */
export function scintille(stato, x, y, colore, quante = 8) {
  for (let i = 0; i < quante; i++) {
    stato.particelle.push({
      x,
      y,
      vx: (i / quante - 0.5) * 3,
      vy: -((i % 3) + 1) * 0.7,
      r: 1.4 + (i % 3) * 0.5,
      vita: 26,
      colore,
    })
  }
}
