import { useCallback, useSyncExternalStore } from 'react'

/**
 * Archivio dei preventivi.
 *
 * Vivono in `localStorage`, sul dispositivo di chi li scrive: non c'è un
 * server, quindi non si sincronizzano fra computer diversi. In compenso
 * funzionano offline e non escono da qui.
 *
 * Tutte le scritture passano da `salva()`, così basta cambiare quella funzione
 * (e `tutti()`) per appoggiarsi a un'API vera senza toccare le pagine.
 */

const CHIAVE = 'levelapp:preventivi'

export const STATI = [
  { id: 'bozza', label: 'Bozza', tono: 'var(--color-fg-muted)' },
  { id: 'inviato', label: 'Inviato', tono: 'var(--color-accent)' },
  { id: 'accettato', label: 'Accettato', tono: 'var(--color-success)' },
  { id: 'rifiutato', label: 'Rifiutato', tono: 'var(--color-danger)' },
]

export const statoDi = (id) => STATI.find((s) => s.id === id) ?? STATI[0]

/* ------------------------------------------------------------------ */

const ascoltatori = new Set()
const avvisa = () => ascoltatori.forEach((f) => f())

function leggiGrezzo() {
  try {
    return window.localStorage.getItem(CHIAVE) ?? '[]'
  } catch {
    return '[]'
  }
}

function sottoscrivi(callback) {
  ascoltatori.add(callback)
  window.addEventListener('storage', callback)
  return () => {
    ascoltatori.delete(callback)
    window.removeEventListener('storage', callback)
  }
}

export function tutti() {
  try {
    const lista = JSON.parse(leggiGrezzo())
    return Array.isArray(lista) ? lista : []
  } catch {
    return []
  }
}

function scrivi(lista) {
  try {
    window.localStorage.setItem(CHIAVE, JSON.stringify(lista))
  } catch {
    /* spazio esaurito o storage negato: meglio non far cadere la pagina */
  }
  avvisa()
}

/** Numerazione progressiva per anno: PRV-2026-004. */
export function prossimoNumero(lista = tutti()) {
  const anno = new Date().getFullYear()
  const usati = lista
    .map((p) => p.numero?.match(new RegExp(`^PRV-${anno}-(\\d+)$`))?.[1])
    .filter(Boolean)
    .map(Number)
  const prossimo = usati.length > 0 ? Math.max(...usati) + 1 : 1
  return `PRV-${anno}-${String(prossimo).padStart(3, '0')}`
}

export function vuoto() {
  const adesso = new Date().toISOString()
  return {
    id: `prv_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    numero: prossimoNumero(),
    stato: 'bozza',
    creato: adesso,
    aggiornato: adesso,
    // Dati di intestazione, quelli che finiscono in testa al documento.
    cliente: {
      azienda: '',
      referente: '',
      email: '',
      telefono: '',
      piva: '',
      codiceFiscale: '',
      pec: '',
      indirizzo: '',
      cap: '',
      citta: '',
      provincia: '',
    },
    oggetto: '',
    voci: [],
    iva: 22,
    validitaGiorni: 30,
    validoFino: '', // data scelta a mano; vuota = calcolata dai giorni
    consegna: '4 settimane',
    note: '',
    condizioni:
      'Codice sorgente, dati e infrastruttura restano intestati al cliente. Le variazioni di perimetro si concordano prima di lavorarle.',
  }
}

export function trova(id) {
  return tutti().find((p) => p.id === id) ?? null
}

export function salva(preventivo) {
  const lista = tutti()
  const i = lista.findIndex((p) => p.id === preventivo.id)
  const aggiornato = { ...preventivo, aggiornato: new Date().toISOString() }
  if (i === -1) lista.unshift(aggiornato)
  else lista[i] = aggiornato
  scrivi(lista)
  return aggiornato
}

export function elimina(id) {
  scrivi(tutti().filter((p) => p.id !== id))
}

export function duplica(id) {
  const originale = trova(id)
  if (!originale) return null
  const copia = {
    ...structuredClone(originale),
    id: vuoto().id,
    numero: prossimoNumero(),
    stato: 'bozza',
    creato: new Date().toISOString(),
  }
  salva(copia)
  return copia
}

/* ------------------------------------------------------------------
   Conti
   ------------------------------------------------------------------ */

export const rigaImponibile = (v) =>
  Number(v.quantita || 0) * Number(v.prezzo || 0) * (1 - Number(v.sconto || 0) / 100)

export function conti(preventivo) {
  const imponibile = (preventivo.voci ?? []).reduce((t, v) => t + rigaImponibile(v), 0)
  const iva = imponibile * (Number(preventivo.iva || 0) / 100)
  return { imponibile, iva, totale: imponibile + iva }
}

/* `useGrouping: 'always'` perché in italiano le migliaia a quattro cifre
   verrebbero scritte senza punto (3500,00) e in una tabella di importi la
   colonna perde l'allineamento visivo. */
export const euro = (n) =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    useGrouping: 'always',
  }).format(
    Number.isFinite(n) ? n : 0,
  )

export const dataIt = (iso) =>
  new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }).format(
    new Date(iso),
  )

/** Controllo di forma della partita IVA italiana (algoritmo di Luhn dispari). */
export function partitaIvaValida(piva) {
  const cifre = String(piva ?? '').replace(/\D/g, '')
  if (cifre.length !== 11) return false
  let somma = 0
  for (let i = 0; i < 11; i++) {
    let n = Number(cifre[i])
    if (i % 2 === 1) {
      n *= 2
      if (n > 9) n -= 9
    }
    somma += n
  }
  return somma % 10 === 0
}

/**
 * Data di scadenza: quella impostata a mano se c'è, altrimenti calcolata dai
 * giorni di validità a partire dall'emissione.
 */
export function scadenza(preventivo) {
  if (preventivo.validoFino) return new Date(`${preventivo.validoFino}T12:00:00`).toISOString()
  const d = new Date(preventivo.creato)
  d.setDate(d.getDate() + Number(preventivo.validitaGiorni || 0))
  return d.toISOString()
}

/** La stessa data in formato `yyyy-mm-dd`, per il campo del calendario. */
export const scadenzaIso = (preventivo) => scadenza(preventivo).slice(0, 10)

/** Giorni che mancano da oggi alla scadenza (negativi se è passata). */
export function giorniAllaScadenza(preventivo) {
  const fine = new Date(scadenza(preventivo))
  fine.setHours(12, 0, 0, 0)
  const oggi = new Date()
  oggi.setHours(12, 0, 0, 0)
  return Math.round((fine - oggi) / 86400000)
}

/* ------------------------------------------------------------------ */

export function usePreventivi() {
  const grezzo = useSyncExternalStore(sottoscrivi, leggiGrezzo, () => '[]')
  try {
    const lista = JSON.parse(grezzo)
    return Array.isArray(lista) ? lista : []
  } catch {
    return []
  }
}

export function useSalva() {
  return useCallback((p) => salva(p), [])
}
