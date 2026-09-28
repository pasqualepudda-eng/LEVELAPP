import { useEffect, useRef, useState } from 'react'
import { Link, useRoute } from '../lib/router'
import { nav, company } from '../data/content'
import ThemeToggle from './ThemeToggle'
import Icon from './ui/Icon'
import Button from './ui/Button'
import { useSessione } from '../lib/auth'

/**
 * Barra di navigazione fissa ricostruita sulla chrome marketing di GitHub:
 * altezza 64px, voci con freccia che aprono un pannello a colonne (icona,
 * titolo, descrizione) più una card promozionale, azione primaria a destra.
 *
 * Comportamento del pannello desktop: si apre al click e al passaggio del
 * mouse, si chiude con Esc, col click fuori e cambiando pagina.
 */

/** Riga di un pannello: icona, titolo, descrizione, freccia in hover. */
function MegaItem({ item, onNavigate }) {
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      className="group flex gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-canvas-raised"
    >
      <Icon name={item.icon} size={16} className="mt-0.5 shrink-0 text-fg-muted" />
      <span className="min-w-0">
        <span className="flex items-center gap-1 text-sm font-semibold text-fg">
          {item.label}
          <Icon
            name="chevronRight"
            size={12}
            className="text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100"
          />
        </span>
        {item.desc && (
          <span className="mt-0.5 block text-xs leading-snug text-fg-muted">{item.desc}</span>
        )}
      </span>
    </Link>
  )
}

export default function Header() {
  const sessione = useSessione()
  const path = useRoute()
  const [openMenu, setOpenMenu] = useState(null) // label del pannello desktop
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState(null)
  const headerRef = useRef(null)
  const hoverTimer = useRef(null)

  // Ogni cambio pagina richiude tutto.
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
    setMobileSection(null)
  }, [path])

  // Blocca lo scroll del body mentre il pannello mobile è aperto.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpenMenu(null)
      setMobileOpen(false)
    }
    const onPointerDown = (e) => {
      if (headerRef.current?.contains(e.target)) return
      setOpenMenu(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  useEffect(() => () => clearTimeout(hoverTimer.current), [])

  const isActive = (to) => path === to || path.startsWith(`${to}/`)

  // Apertura in hover con una breve attesa: passare sopra la barra mentre si
  // punta ad altro non deve far comparire pannelli a raffica.
  const hoverOpen = (label) => {
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setOpenMenu(label), 120)
  }
  const hoverClose = () => {
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setOpenMenu(null), 160)
  }

  return (
    <>
      <header
        ref={headerRef}
        // Con il menu mobile aperto la barra diventa opaca: la trasparenza
        // lascerebbe intravedere la pagina sopra il pannello.
        className={`sticky top-0 z-50 border-b border-line-muted ${
          mobileOpen ? 'bg-canvas' : 'bg-canvas/85 backdrop-blur-xl'
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-4">
          {/* Sinistra: menu mobile + marchio + navigazione */}
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="-ml-1 flex size-9 items-center justify-center rounded-md text-fg-muted hover:bg-canvas-subtle hover:text-fg lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile"
              aria-label={mobileOpen ? 'Chiudi il menu' : 'Apri il menu'}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
                ) : (
                  <path d="M1 3.75A.75.75 0 0 1 1.75 3h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 3.75Zm0 4A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75Zm0 4a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1-.75-.75Z" />
                )}
              </svg>
            </button>

            <Link
              to="/"
              className="flex min-h-10 items-center gap-2 text-fg"
              aria-label={`${company.legalName}, home`}
            >
              <img src="/logo.png" alt="" className="marchio h-7 w-auto" />
            </Link>

            {/* Navigazione desktop, attaccata al marchio come su github.com */}
            <nav className="ml-2 hidden lg:block" aria-label="Principale">
              <ul className="flex items-center">
                {nav.map((item) =>
                  item.columns ? (
                    <li
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => hoverOpen(item.label)}
                      onMouseLeave={hoverClose}
                    >
                      <button
                        type="button"
                        className={`flex h-8 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors hover:bg-canvas-subtle ${
                          isActive(item.to) ? 'text-fg' : 'text-fg-muted hover:text-fg'
                        }`}
                        aria-expanded={openMenu === item.label}
                        onClick={() => setOpenMenu((v) => (v === item.label ? null : item.label))}
                      >
                        {item.label}
                        <Icon
                          name="chevronDown"
                          size={12}
                          className={`text-fg-subtle transition-transform ${
                            openMenu === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {openMenu === item.label && (
                        <div
                          className={`absolute left-0 top-full z-50 mt-1 rounded-lg border border-line bg-canvas-overlay p-2 shadow-overlay ${
                            item.promo
                              ? item.columns.length > 1
                                ? 'w-[46rem]'
                                : 'w-[34rem]'
                              : 'w-80'
                          }`}
                        >
                          <div className={item.promo ? 'flex gap-2' : ''}>
                            <div
                              className={`grid flex-1 gap-x-2 ${
                                item.columns.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                              }`}
                            >
                              {item.columns.map((column) => (
                                <div key={column.title}>
                                  <p className="px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-fg-muted uppercase">
                                    {column.title}
                                  </p>
                                  <ul>
                                    {column.items.map((child) => (
                                      <li key={child.label}>
                                        <MegaItem
                                          item={child}
                                          onNavigate={() => setOpenMenu(null)}
                                        />
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>

                            {item.promo && (
                              <Link
                                to={item.promo.to}
                                onClick={() => setOpenMenu(null)}
                                className="hero-glow group w-64 shrink-0 rounded-md border border-line p-4 transition-colors hover:border-fg-subtle"
                              >
                                <p className="text-sm font-semibold text-fg">{item.promo.title}</p>
                                <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
                                  {item.promo.desc}
                                </p>
                                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                                  {item.promo.cta}
                                  <Icon
                                    name="arrowRight"
                                    size={12}
                                    className="transition-transform group-hover:translate-x-0.5"
                                  />
                                </span>
                              </Link>
                            )}
                          </div>

                          <div className="mt-1 border-t border-line-muted px-3 pt-3 pb-1">
                            <Link
                              to={item.to}
                              onClick={() => setOpenMenu(null)}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                            >
                              {item.label}: panoramica
                              <Icon name="arrowRight" size={14} />
                            </Link>
                          </div>
                        </div>
                      )}
                    </li>
                  ) : (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`flex h-8 items-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-canvas-subtle ${
                          isActive(item.to) ? 'text-fg' : 'text-fg-muted hover:text-fg'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          </div>

          {/* Destra: tema, contatto diretto, azione primaria */}
          <div className="flex items-center gap-2">
            <span className="hidden md:block">
              <ThemeToggle />
            </span>

            <a
              href={company.phoneHref}
              className="hidden items-center gap-2 rounded-md px-3 py-1.5 text-sm text-fg-muted transition-colors hover:bg-canvas-subtle hover:text-fg xl:flex"
            >
              <Icon name="phone" size={14} />
              {company.phone}
            </a>

            {/* Ingresso all'area riservata: se la sessione è già aperta porta
                direttamente ai preventivi invece che al modulo di accesso. */}
            <Link
              to={sessione ? '/area' : '/accedi'}
              className="hidden min-h-10 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-fg-muted transition-colors hover:bg-canvas-subtle hover:text-fg sm:flex"
            >
              <Icon name={sessione ? 'file' : 'lock'} size={14} />
              {sessione ? 'Preventivi' : 'Accedi'}
            </Link>

            <Button to="/contatti" variant="primary" size="md" className="min-h-10">
              Parliamone
            </Button>
          </div>
        </div>
      </header>

      {/* Pannello mobile: sezioni richiudibili, come la navigazione di GitHub
          sotto i 1012px.

          Sta FUORI dall'header di proposito: l'header ha `backdrop-blur`, e un
          elemento con `backdrop-filter` diventa il blocco di riferimento dei
          figli `position: fixed`. Lì dentro, `top-16 bottom-0` si misurava sui
          64px della barra e il pannello veniva alto un pixel. */}
      {mobileOpen && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain bg-canvas lg:hidden"
        >
          <nav className="shell pb-4" aria-label="Principale (mobile)">
            <ul className="divide-y divide-line-muted">
              {nav.map((item) => {
                const expanded = mobileSection === item.label

                if (!item.columns) {
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        className="flex min-h-[3.25rem] items-center justify-between py-3.5 text-lg font-medium text-fg"
                      >
                        {item.label}
                        <Icon name="chevronRight" size={16} className="text-fg-subtle" />
                      </Link>
                    </li>
                  )
                }

                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      className="flex min-h-[3.25rem] w-full items-center justify-between py-3.5 text-lg font-medium text-fg"
                      aria-expanded={expanded}
                      onClick={() => setMobileSection(expanded ? null : item.label)}
                    >
                      {item.label}
                      <Icon
                        name="chevronDown"
                        size={16}
                        className={`text-fg-subtle transition-transform ${
                          expanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expanded && (
                      <div className="pb-4">
                        {item.columns.map((column) => (
                          <div key={column.title} className="mb-3">
                            <p className="mb-1 text-xs font-semibold tracking-wide text-fg-subtle uppercase">
                              {column.title}
                            </p>
                            <ul className="space-y-0.5 border-l border-line pl-3">
                              {column.items.map((child) => (
                                <li key={child.label}>
                                  <Link
                                    to={child.to}
                                    className="flex min-h-11 items-center gap-2.5 py-2.5 text-[15px] text-fg-muted"
                                  >
                                    <Icon name={child.icon} size={15} className="shrink-0" />
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        <Link
                          to={item.to}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
                        >
                          {item.label}: panoramica
                          <Icon name="arrowRight" size={14} />
                        </Link>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 flex flex-col gap-3 pb-10">
              <Button to="/contatti" variant="primary" size="xl">
                Richiedi un'analisi
              </Button>
              <Button href={company.phoneHref} variant="default" size="xl" icon="phone">
                {company.phone}
              </Button>
              <Button
                to={sessione ? '/area' : '/accedi'}
                variant="invisible"
                size="xl"
                icon={sessione ? 'file' : 'lock'}
              >
                {sessione ? 'I tuoi preventivi' : 'Accedi all’area riservata'}
              </Button>

              <div className="mt-2 flex items-center justify-between rounded-md border border-line bg-canvas-subtle px-4 py-3">
                <span className="text-sm text-fg-muted">Tema</span>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
