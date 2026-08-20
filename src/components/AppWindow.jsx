import { motion } from 'motion/react'
import Icon from './ui/Icon'
import Logo from './Logo'
import { StatusDot } from './ui/Label'
import { Avanzamento, Avatar, Badge, Sparkline } from './ui/MockBits'

/**
 * Mockup di gestionale usato nelle hero: chrome del browser, chrome
 * applicativa con schede e ricerca, menu di reparto, cruscotto con numeri e
 * serie storica, tabella delle commesse e colonna di destra con scadenze,
 * attività e assistente.
 *
 * Tutto CSS e SVG — nessuna immagine da caricare, nitido a ogni densità — e
 * tutto decorativo: resta fuori dall'albero di accessibilità.
 */

const SCHEDE = ['Panoramica', 'Commesse', 'Magazzino', 'Clienti']

const MENU = [
  { label: 'Panoramica', icon: 'graph', attivo: true },
  { label: 'Commesse', icon: 'workflow', badge: '38' },
  { label: 'Preventivi', icon: 'file', badge: '12' },
  { label: 'Magazzino', icon: 'layers' },
  { label: 'Acquisti', icon: 'database' },
  { label: 'Clienti', icon: 'users' },
  { label: 'Assistente AI', icon: 'sparkle' },
]

const TILES = [
  {
    label: 'Commesse aperte',
    valore: '38',
    delta: '+6',
    su: true,
    serie: [12, 18, 14, 22, 19, 26, 31],
  },
  {
    label: 'Marginalità media',
    valore: '24,8%',
    delta: '+2,1',
    su: true,
    serie: [18, 19, 21, 20, 23, 24, 25],
  },
  {
    label: 'Scadenze 7 giorni',
    valore: '12',
    delta: '−3',
    su: false,
    serie: [19, 17, 16, 15, 14, 13, 12],
  },
  {
    label: 'Ore a consuntivo',
    valore: '1.284',
    delta: '+112',
    su: true,
    serie: [800, 940, 910, 1050, 1120, 1200, 1284],
  },
]

const RIGHE = [
  ['CM-2419', 'Novaform', 'Giulia Marchetti', 72, '14 mar', 'In produzione', 'var(--color-accent)'],
  ['CM-2418', 'Arkadia', 'Marco Serra', 91, '15 mar', 'Collaudo', 'var(--color-purple)'],
  ['CM-2417', 'Officine V', 'Elena Bosco', 45, '18 mar', 'In produzione', 'var(--color-accent)'],
  ['CM-2415', 'Marea', 'Davide Fini', 100, '11 mar', 'Consegnata', 'var(--color-success)'],
  ['CM-2414', 'Poliedra', 'Sara Conti', 28, '22 mar', 'In attesa', 'var(--color-attention)'],
]

const BARRE = [38, 52, 46, 68, 61, 79, 72, 88, 94, 81, 90, 97]
const MESI = ['G', 'F', 'M', 'A', 'M', 'G', 'L', 'A', 'S', 'O', 'N', 'D']

const SCADENZE = [
  ['CM-2417', 'Collaudo cliente', 'domani', 'var(--color-danger)'],
  ['CM-2421', 'Consegna materiali', 'giovedì', 'var(--color-attention)'],
  ['CM-2430', 'Revisione offerta', 'venerdì', 'var(--color-fg-muted)'],
]

const ATTIVITA = [
  ['check', 'CM-2415 chiusa da Davide Fini', '12 min'],
  ['file', 'Caricato collaudo CM-2418.pdf', '38 min'],
  ['issue', 'Non conformità su CM-2417', '1 h'],
]

export default function AppWindow({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-xl border border-line bg-canvas-inset shadow-float ${className}`}
    >
      {/* Chrome del browser */}
      <div className="flex items-center gap-3 border-b border-line bg-canvas-subtle px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-line" />
          <span className="size-3 rounded-full bg-line" />
          <span className="size-3 rounded-full bg-line" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-md border border-line bg-canvas px-2.5 py-1 font-mono text-mini text-fg-subtle">
          <Icon name="lock" size={11} />
          gestionale.tuaazienda.it
          <Icon name="star" size={10} className="ml-auto hidden text-fg-subtle sm:block" />
        </div>
        <span className="hidden items-center gap-1.5 text-mini text-fg-muted sm:flex">
          <StatusDot tone="success" />
          online
        </span>
      </div>

      {/* Chrome dell'applicazione: marchio, schede, ricerca, notifiche */}
      <div className="flex items-center gap-2 border-b border-line bg-canvas px-3 py-2">
        <Logo size={16} className="text-fg" />
        <span className="text-[11.5px] font-semibold text-fg">Officina</span>

        <nav className="ml-2 hidden items-center gap-0.5 md:flex">
          {SCHEDE.map((scheda, i) => (
            <span
              key={scheda}
              className={`rounded-md px-2 py-1 text-mini ${
                i === 0 ? 'bg-canvas-subtle font-medium text-fg' : 'text-fg-muted'
              }`}
            >
              {scheda}
            </span>
          ))}
        </nav>

        <span className="ml-auto hidden h-6 w-40 items-center gap-1.5 rounded-md border border-line px-2 text-[10.5px] text-fg-subtle lg:flex">
          <Icon name="search" size={10} />
          Cerca commessa…
          <span className="ml-auto rounded border border-line px-1 font-mono text-[9px]">/</span>
        </span>

        <span className="relative flex size-6 items-center justify-center rounded-md text-fg-muted">
          <Icon name="comment" size={13} />
          <span className="absolute top-1 right-1 size-1.5 rounded-full bg-danger" />
        </span>
        <Avatar nome="Luca Amato" className="size-6 text-[9px]" />
      </div>

      <div className="flex">
        {/* Menu di reparto */}
        <div className="hidden w-44 shrink-0 flex-col border-r border-line bg-canvas px-2 py-2.5 sm:flex">
          <p className="px-2 pb-1.5 text-[9px] font-semibold tracking-wide text-fg-subtle uppercase">
            Produzione
          </p>
          {MENU.map((voce) => (
            <div
              key={voce.label}
              className={`mb-0.5 flex items-center gap-2 rounded-md px-2 py-1.5 text-[11.5px] ${
                voce.attivo ? 'bg-canvas-overlay text-fg' : 'text-fg-muted'
              }`}
            >
              <Icon name={voce.icon} size={13} className={voce.attivo ? 'text-accent' : ''} />
              <span className="truncate">{voce.label}</span>
              {voce.badge && (
                <span className="ml-auto rounded-full bg-canvas-subtle px-1.5 font-mono text-[9px] text-fg-subtle">
                  {voce.badge}
                </span>
              )}
            </div>
          ))}

          <div className="mt-3 rounded-md border border-line bg-canvas-subtle p-2.5">
            <p className="flex items-center gap-1.5 text-mini font-semibold text-attention">
              <Icon name="issue" size={11} />
              Sopra budget
            </p>
            <p className="mt-1 text-[10.5px] leading-snug text-fg-muted">
              3 commesse hanno superato le ore stimate.
            </p>
            <span className="mt-2 inline-block rounded border border-line px-1.5 py-0.5 text-mini text-accent">
              Vedi dettaglio
            </span>
          </div>

          <div className="mt-auto flex items-center gap-2 border-t border-line-muted pt-2.5">
            <Avatar nome="Luca Amato" className="size-6 text-[9px]" />
            <span className="min-w-0">
              <span className="block truncate text-[10.5px] text-fg">Luca Amato</span>
              <span className="block text-[9px] text-fg-subtle">Resp. produzione</span>
            </span>
          </div>
        </div>

        {/* Contenuto */}
        <div className="min-w-0 flex-1 p-3 sm:p-4">
          {/* Testata della pagina */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[9.5px] text-fg-subtle">Produzione / Panoramica</p>
              <p className="text-[13px] font-semibold text-fg">Commesse in corso</p>
            </div>
            <span className="flex h-6 items-center gap-1 rounded-md border border-line px-2 font-mono text-mini text-fg-muted">
              ultimi 30 giorni
              <Icon name="chevronDown" size={9} />
            </span>
            <span className="hidden h-6 items-center gap-1 rounded-md bg-success-emphasis px-2 text-mini font-medium text-white sm:flex">
              <Icon name="plus" size={9} />
              Nuova
            </span>
          </div>

          {/* Numeri */}
          <div className="mb-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {TILES.map((tile) => (
              <div key={tile.label} className="rounded-md border border-line bg-canvas p-2.5">
                <p className="truncate text-mini text-fg-muted">{tile.label}</p>
                <p className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="text-base font-semibold text-fg">{tile.valore}</span>
                  <span
                    className="text-mini font-medium"
                    style={{ color: tile.su ? 'var(--color-success)' : 'var(--color-danger)' }}
                  >
                    {tile.delta}
                  </span>
                </p>
                <Sparkline
                  punti={tile.serie}
                  tono={tile.su ? 'var(--color-success)' : 'var(--color-danger)'}
                  className="mt-1 h-4 w-full"
                />
              </div>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.55fr_1fr]">
            <div className="space-y-3">
              {/* Serie storica */}
              <div className="rounded-md border border-line bg-canvas p-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[10.5px] font-semibold text-fg">Ore consuntivate</p>
                  <span className="flex items-center gap-2 text-[9px] text-fg-muted">
                    <span className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-accent" />
                      2026
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-line" />
                      2025
                    </span>
                  </span>
                </div>

                <div className="mt-2 flex h-20 items-end gap-1.5">
                  {BARRE.map((h, i) => (
                    <motion.span
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        background:
                          'linear-gradient(180deg, var(--color-accent), color-mix(in oklab, var(--color-accent) 25%, transparent))',
                        transformOrigin: 'bottom',
                      }}
                      initial={{ height: '10%', opacity: 0.4 }}
                      whileInView={{ height: `${h}%`, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ))}
                </div>
                <div className="mt-1 flex justify-between font-mono text-[8px] text-fg-subtle">
                  {MESI.map((m, i) => (
                    <span key={i}>{m}</span>
                  ))}
                </div>
              </div>

              {/* Tabella */}
              <div className="overflow-hidden rounded-md border border-line">
                <div className="flex items-center gap-3 border-b border-line bg-canvas-subtle px-2.5 py-1.5 text-[9px] tracking-wide text-fg-muted uppercase">
                  <span className="w-16">Codice</span>
                  <span className="flex-1">Cliente</span>
                  <span className="hidden w-24 md:block">Avanzamento</span>
                  <span className="hidden w-12 sm:block">Consegna</span>
                  <span className="w-20 text-right">Stato</span>
                </div>

                {RIGHE.map(([codice, cliente, referente, pct, data, stato, tono], i) => (
                  <div
                    key={codice}
                    className={`flex items-center gap-3 px-2.5 py-2 text-mini ${
                      i === 0 ? 'bg-canvas-subtle' : ''
                    } ${i > 0 ? 'border-t border-line-muted' : ''}`}
                  >
                    <span className="w-16 font-mono text-mini text-fg-subtle">{codice}</span>
                    <span className="flex min-w-0 flex-1 items-center gap-1.5">
                      <Avatar nome={referente} />
                      <span className="truncate text-fg">{cliente}</span>
                    </span>
                    <span className="hidden w-24 md:block">
                      <Avanzamento valore={pct} tono={tono} larghezza="w-14" />
                    </span>
                    <span className="hidden w-12 font-mono text-mini text-fg-muted sm:block">
                      {data}
                    </span>
                    <span className="flex w-20 justify-end">
                      <Badge tono={tono}>{stato}</Badge>
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-between border-t border-line bg-canvas-subtle px-2.5 py-1.5">
                  <span className="font-mono text-[9.5px] text-fg-subtle">5 di 128 commesse</span>
                  <span className="flex items-center gap-1">
                    <span className="flex size-4 items-center justify-center rounded border border-line text-fg-subtle">
                      <Icon name="chevronRight" size={8} style={{ transform: 'scaleX(-1)' }} />
                    </span>
                    <span className="flex size-4 items-center justify-center rounded border border-line text-fg">
                      <Icon name="chevronRight" size={8} />
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Colonna di destra */}
            <div className="hidden space-y-3 lg:block">
              <div className="rounded-md border border-line bg-canvas p-2.5">
                <p className="text-[10.5px] font-semibold text-fg">Scadenze</p>
                <ul className="mt-2 space-y-1.5">
                  {SCADENZE.map(([codice, cosa, quando, tono]) => (
                    <li key={codice} className="flex items-center gap-1.5 text-mini">
                      <span className="size-1.5 rounded-full" style={{ backgroundColor: tono }} />
                      <span className="font-mono text-fg-subtle">{codice}</span>
                      <span className="min-w-0 flex-1 truncate text-fg-muted">{cosa}</span>
                      <span className="whitespace-nowrap" style={{ color: tono }}>
                        {quando}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-md border border-line bg-canvas p-2.5">
                <p className="text-[10.5px] font-semibold text-fg">Attività</p>
                <ul className="mt-2 space-y-1.5">
                  {ATTIVITA.map(([icona, testo, quando]) => (
                    <li key={testo} className="flex items-start gap-1.5 text-mini">
                      <Icon name={icona} size={10} className="mt-0.5 shrink-0 text-fg-subtle" />
                      <span className="min-w-0 flex-1 truncate text-fg-muted">{testo}</span>
                      <span className="font-mono text-[9px] whitespace-nowrap text-fg-subtle">
                        {quando}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-md border border-line bg-canvas-subtle p-2.5">
                <p className="flex items-center gap-1.5 text-[10.5px] font-semibold text-fg">
                  <Icon name="sparkle" size={11} className="text-success" />
                  Assistente
                </p>
                <p className="mt-1.5 text-mini leading-snug text-fg-muted">
                  “Le tre commesse sopra budget hanno tutte lo stesso fornitore di profilati.”
                </p>
                <span className="mt-2 inline-flex items-center gap-1 font-mono text-[9px] text-fg-subtle">
                  <Icon name="file" size={9} />
                  ordini_fornitore.csv
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra di stato */}
      <div className="flex items-center gap-3 border-t border-line bg-canvas-subtle px-3 py-1.5 font-mono text-[9.5px] text-fg-subtle">
        <span className="flex items-center gap-1.5">
          <StatusDot tone="success" />
          sincronizzato 2 minuti fa
        </span>
        <span className="hidden sm:inline">128 commesse · 42 clienti</span>
        <span className="ml-auto hidden md:inline">v2.14.0</span>
      </div>
    </div>
  )
}
