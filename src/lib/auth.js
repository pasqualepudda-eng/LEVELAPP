import { useCallback, useSyncExternalStore } from 'react'

/**
 * Accesso all'area riservata.
 *
 * ATTENZIONE, ed è bene che sia scritto qui e non solo nella documentazione:
 * questo controllo gira **nel browser**. Le credenziali qui sotto finiscono nel
 * pacchetto JavaScript, quindi chiunque apra gli strumenti per sviluppatori può
 * leggerle. Va benissimo per tenere l'area fuori dai piedi e per lavorare
 * davvero sui preventivi, non va bene per proteggere dati riservati da qualcuno
 * che ci tiene a entrare.
 *
 * Per renderlo un accesso vero serve un server che verifichi la password e
 * restituisca un token: il punto in cui innestarlo è uno solo, `verifica()`.
 * Da lì in poi il resto dell'applicazione non cambia di una riga.
 */

const CHIAVE = 'levelapp:sessione'

/* TODO: cambia queste credenziali (e, quando ci sarà un server, toglile del tutto). */
const UTENTI = [
  { email: 'amministrazione@levelapp.cloud', password: 'levelapp2026', nome: 'Amministrazione' },
]

/** Punto unico da sostituire con una fetch verso il tuo endpoint di login. */
async function verifica(email, password) {
  const utente = UTENTI.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
  )
  if (!utente) return null
  return { email: utente.email, nome: utente.nome, dal: new Date().toISOString() }
}

/* ------------------------------------------------------------------
   Stato condiviso: la sessione vive in localStorage e viene osservata
   da tutti i componenti con useSyncExternalStore.
   ------------------------------------------------------------------ */

const ascoltatori = new Set()
const avvisa = () => ascoltatori.forEach((f) => f())

function leggiGrezzo() {
  try {
    return window.localStorage.getItem(CHIAVE)
  } catch {
    return null
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

export function sessioneCorrente() {
  const grezzo = leggiGrezzo()
  if (!grezzo) return null
  try {
    return JSON.parse(grezzo)
  } catch {
    return null
  }
}

export async function accedi(email, password) {
  const sessione = await verifica(email, password)
  if (!sessione) return { ok: false, errore: 'Email o password non corrispondono.' }

  try {
    window.localStorage.setItem(CHIAVE, JSON.stringify(sessione))
  } catch {
    return { ok: false, errore: 'Il browser non permette di salvare la sessione.' }
  }
  avvisa()
  return { ok: true }
}

export function esci() {
  try {
    window.localStorage.removeItem(CHIAVE)
  } catch {
    /* niente da fare */
  }
  avvisa()
}

/** Sessione corrente, reattiva: cambia in tutte le schede aperte. */
export function useSessione() {
  const grezzo = useSyncExternalStore(sottoscrivi, leggiGrezzo, () => null)
  return grezzo ? JSON.parse(grezzo) : null
}

export function useEsci() {
  return useCallback(() => esci(), [])
}
