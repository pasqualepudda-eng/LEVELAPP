import { useCallback, useEffect, useSyncExternalStore } from 'react'

/**
 * Tema chiaro/scuro sul modello di GitHub.
 *
 * La preferenza dell'utente vale `light`, `dark` o `auto` (segue il sistema) e
 * finisce in localStorage. Sull'elemento <html> scriviamo però sempre il valore
 * *risolto* in `data-color-mode`, perché il CSS conosce solo due palette: così
 * basta un unico blocco di override in index.css.
 *
 * Lo stesso calcolo è duplicato in uno script inline dentro index.html: gira
 * prima del primo paint ed evita il lampo di tema sbagliato al caricamento.
 *
 * Lo stato vive qui e non dentro il componente: gli switch sono due (header e
 * footer) e devono restare allineati anche cambiando tema da uno solo.
 */

const KEY = 'levelapp:color-mode'
const DARK_QUERY = '(prefers-color-scheme: dark)'

export const MODES = ['light', 'dark', 'auto']

const THEME_COLOR = { light: '#ffffff', dark: '#0d1117' }

export function systemMode() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

export function resolveMode(preference) {
  return preference === 'auto' ? systemMode() : preference
}

function readStored() {
  if (typeof window === 'undefined') return 'auto'
  try {
    const stored = window.localStorage.getItem(KEY)
    return MODES.includes(stored) ? stored : 'auto'
  } catch {
    // Safari in navigazione privata può negare l'accesso allo storage.
    return 'auto'
  }
}

export function applyMode(preference) {
  const root = document.documentElement
  const resolved = resolveMode(preference)

  root.dataset.colorMode = resolved
  root.dataset.colorModePreference = preference

  // La barra del browser su mobile segue il tema, come su github.com.
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLOR[resolved])

  return resolved
}

/* ------------------------------------------------------------------
   Store minimo condiviso da tutti gli switch presenti nella pagina
   ------------------------------------------------------------------ */

let preference = readStored()
let resolved = typeof document === 'undefined' ? 'light' : resolveMode(preference)
const listeners = new Set()

const snapshot = () => `${preference}:${resolved}`
const serverSnapshot = () => 'auto:light'

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function emit() {
  listeners.forEach((listener) => listener())
}

function setPreference(next) {
  if (!MODES.includes(next)) return
  preference = next
  try {
    window.localStorage.setItem(KEY, next)
  } catch {
    /* preferenza non persistente: il tema resta valido per la sessione */
  }
  resolved = applyMode(next)
  emit()
}

/**
 * Stato del tema per la UI. Restituisce la preferenza (`auto` compreso) e il
 * tema effettivo, che serve a chi deve cambiare un'immagine o un'icona.
 */
export function useColorMode() {
  const value = useSyncExternalStore(subscribe, snapshot, serverSnapshot)
  const [currentPreference, currentResolved] = value.split(':')

  // Riallinea il DOM al montaggio: lo script inline ha già scritto
  // `data-color-mode`, qui si aggiunge il resto (meta theme-color).
  useEffect(() => {
    resolved = applyMode(preference)
    emit()
  }, [])

  // In `auto` il tema deve seguire il sistema anche a pagina aperta.
  useEffect(() => {
    if (currentPreference !== 'auto') return
    const mql = window.matchMedia(DARK_QUERY)
    const onChange = () => {
      resolved = applyMode('auto')
      emit()
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [currentPreference])

  const setMode = useCallback((next) => setPreference(next), [])

  return { preference: currentPreference, resolved: currentResolved, setMode }
}
