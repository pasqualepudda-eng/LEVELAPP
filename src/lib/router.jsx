import { createContext, useCallback, useContext, useEffect, useState } from 'react'

/**
 * Router minimo basato su hash, senza dipendenze.
 *
 * L'hash evita qualsiasi configurazione lato server: la build (con `base: './'`)
 * funziona su hosting statico, in sottocartella e con `npm run preview`, senza
 * rewrite verso index.html.
 *
 * Convenzione: solo gli hash che iniziano con `#/` sono rotte. Un `#ancora`
 * semplice — lo skip link, i link interni alla pagina — non tocca la
 * navigazione e continua a fare il suo scroll nativo.
 */

let currentPath = '/'

function readPath() {
  if (typeof window === 'undefined') return '/'
  const hash = window.location.hash
  if (hash.startsWith('#/')) {
    currentPath = normalize(decodeURIComponent(split(hash.slice(1)).path))
  }
  return currentPath
}

/**
 * Separa la rotta dalla sotto-ancora: "/azienda#metodo" → { path: '/azienda',
 * anchor: 'metodo' }. Serve per linkare una sezione dentro un'altra pagina.
 */
function split(raw) {
  const [withoutQuery] = raw.split('?')
  const hashAt = withoutQuery.indexOf('#')
  if (hashAt === -1) return { path: withoutQuery, anchor: '' }
  return { path: withoutQuery.slice(0, hashAt), anchor: withoutQuery.slice(hashAt + 1) }
}

/** Toglie lo slash finale ("/servizi/" → "/servizi"), tranne sulla root. */
function normalize(path) {
  if (!path || path === '/') return '/'
  return path.replace(/\/+$/, '') || '/'
}

const RouteContext = createContext('/')

export function useRoute() {
  return useContext(RouteContext)
}

/** Segmenti non vuoti della rotta corrente: "/servizi/ai" → ['servizi', 'ai']. */
export function useSegments() {
  const path = useRoute()
  return path.split('/').filter(Boolean)
}

export function navigate(to) {
  const next = normalize(to)
  if (normalize(readPath()) === next) return
  window.location.hash = `#${next}`
}

export function Router({ children }) {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const onHashChange = () => setPath(readPath())
    window.addEventListener('hashchange', onHashChange)
    // L'hash può essere già presente al primo mount (link condiviso, refresh).
    onHashChange()
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return <RouteContext.Provider value={path}>{children}</RouteContext.Provider>
}

/**
 * Riporta in cima a ogni cambio pagina. Il browser ricorda la posizione di
 * scroll fra i cambi di hash, quindi va fatto a mano — altrimenti si atterra a
 * metà della pagina nuova. Se il link portava una sotto-ancora
 * ("/azienda#metodo") si scorre invece fino a quella sezione.
 */
/**
 * Hash grezzo, aggiornato a ogni navigazione. A differenza della sola rotta
 * cambia anche quando si passa da "/azienda" a "/azienda#metodo": è la chiave
 * giusta per far ripartire lo scroll.
 */
export function useHashKey() {
  const [hash, setHash] = useState(() =>
    typeof window === 'undefined' ? '' : window.location.hash,
  )

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash
}

export function useScrollToTop(path) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.location.hash.startsWith('#/')) return

    const { anchor } = split(window.location.hash.slice(1))
    if (!anchor) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    // La sezione esiste solo dopo il render della pagina appena montata.
    const id = requestAnimationFrame(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(id)
  }, [path])
}

/**
 * Link interno. Resta un vero `<a href>`: click centrale, "apri in nuova
 * scheda" e crawler continuano a funzionare.
 */
export function Link({ to, children, className = '', ...rest }) {
  const path = useRoute()
  const isActive = path === normalize(to)

  const onClick = useCallback(
    (event) => {
      rest.onClick?.(event)
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return
      // Ricliccare la rotta attiva non genera hashchange: forziamo lo scroll su.
      if (isActive) {
        event.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    [isActive, rest],
  )

  return (
    <a
      {...rest}
      href={`#${normalize(to)}`}
      aria-current={isActive ? 'page' : undefined}
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
