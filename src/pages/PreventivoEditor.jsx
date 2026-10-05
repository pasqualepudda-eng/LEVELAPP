import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useSessione } from '../lib/auth'
import { services, company } from '../data/content'
import {
  STATI,
  conti,
  dataIt,
  duplica,
  elimina,
  euro,
  rigaImponibile,
  giorniAllaScadenza,
  partitaIvaValida,
  salva,
  scadenza,
  scadenzaIso,
  trova,
} from '../lib/preventivi'
import AnteprimaFoglio from '../components/preventivi/AnteprimaFoglio'
import AssistenteAI from '../components/preventivi/AssistenteAI'
import FoglioPreventivo from '../components/preventivi/FoglioPreventivo'
import Importo from '../components/preventivi/Importo'
import NotFound from './NotFound'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import { Link, navigate } from '../lib/router'
import { EASE } from '../lib/motion'

/**
 * Editor del preventivo, in due metà: a sinistra si scrive, a destra il foglio
 * si ricompone a ogni tasto. Non è un'anteprima approssimata — è lo stesso
 * componente che finisce in stampa, disegnato alla larghezza vera di un A4.
 *
 * Le altre tre cose che lo rendono diverso da un modulo qualsiasi:
 * l'anello di avanzamento dice cosa manca prima di poterlo mandare, le voci si
 * trascinano per riordinarle, e la barra di ripartizione mostra quanto pesa
 * ogni voce sul totale mentre cambi i prezzi.
 *
 * Si salva da solo a ogni modifica: in alto c'è l'ora dell'ultimo carattere.
 */

const etichetta = 'block font-mono text-mini tracking-wider text-fg-subtle uppercase'

/* I dati dell'intestatario: [campo, etichetta, classi di larghezza]. */
const CAMPI_CLIENTE = [
  ['azienda', 'Azienda'],
  ['referente', 'Referente'],
  ['email', 'Email'],
  ['telefono', 'Telefono'],
  ['piva', 'Partita IVA'],
  ['codiceFiscale', 'Codice fiscale'],
  ['pec', 'PEC'],
  ['indirizzo', 'Sede legale — via'],
  ['cap', 'CAP'],
  ['citta', 'Città'],
  ['provincia', 'Provincia'],
]

const TONI = [
  'var(--color-accent)',
  'var(--color-purple)',
  'var(--color-success)',
  'var(--color-attention)',
  'var(--color-pink)',
  'var(--color-orange)',
]

const nuovaVoce = () => ({
  id: `v_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
  descrizione: '',
  dettaglio: '',
  quantita: 1,
  prezzo: 0,
  sconto: 0,
})

/** Cosa manca perché il preventivo si possa mandare a un cliente. */
function verifiche(p) {
  return [
    { id: 'cliente', label: 'Azienda destinataria', fatto: Boolean(p.cliente.azienda?.trim()) },
    { id: 'contatto', label: 'Email o telefono', fatto: Boolean(p.cliente.email || p.cliente.telefono) },
    { id: 'oggetto', label: 'Oggetto del lavoro', fatto: Boolean(p.oggetto?.trim()) },
    { id: 'voci', label: 'Almeno una voce', fatto: p.voci.length > 0 },
    {
      id: 'descrizioni',
      label: 'Tutte le voci descritte',
      fatto: p.voci.length > 0 && p.voci.every((v) => v.descrizione?.trim()),
    },
    {
      id: 'prezzi',
      label: 'Tutti i prezzi valorizzati',
      fatto: p.voci.length > 0 && p.voci.every((v) => Number(v.prezzo) > 0),
    },
  ]
}

/** Anello di avanzamento disegnato in SVG. */
function Anello({ percentuale, tono }) {
  const r = 15
  const giro = 2 * Math.PI * r
  return (
    <span className="relative flex size-10 items-center justify-center">
      <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
        <circle cx="18" cy="18" r={r} fill="none" stroke="var(--color-line)" strokeWidth="3" />
        <motion.circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke={tono}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={giro}
          animate={{ strokeDashoffset: giro * (1 - percentuale / 100) }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </svg>
      <span className="font-mono text-[10px] font-semibold text-fg">{percentuale}</span>
    </span>
  )
}

/* ------------------------------------------------------------------ */

export default function PreventivoEditor({ id }) {
  const sessione = useSessione()
  const [preventivo, setPreventivo] = useState(() => trova(id))
  const [salvatoAlle, setSalvatoAlle] = useState(null)
  const [catalogoAperto, setCatalogoAperto] = useState(false)
  const [copiato, setCopiato] = useState(false)
  const [vista, setVista] = useState('compila') // solo sotto i 1280px
  const [trascinata, setTrascinata] = useState(null)

  useEffect(() => {
    if (!sessione) navigate('/accedi')
  }, [sessione])

  const controlli = useMemo(() => (preventivo ? verifiche(preventivo) : []), [preventivo])

  if (!sessione) return null
  if (!preventivo) return <NotFound />

  function aggiorna(pezzo) {
    const nuovo = typeof pezzo === 'function' ? pezzo(preventivo) : { ...preventivo, ...pezzo }
    setPreventivo(nuovo)
    salva(nuovo)
    setSalvatoAlle(new Date())
  }

  const cambiaCliente = (campo, valore) =>
    aggiorna({ cliente: { ...preventivo.cliente, [campo]: valore } })

  const cambiaVoce = (idVoce, campo, valore) =>
    aggiorna((p) => ({
      ...p,
      voci: p.voci.map((v) => (v.id === idVoce ? { ...v, [campo]: valore } : v)),
    }))

  /** Sposta una voce di una posizione: serve al trascinamento e ai tasti. */
  function sposta(da, a) {
    if (a < 0 || a >= preventivo.voci.length) return
    aggiorna((p) => {
      const voci = [...p.voci]
      const [presa] = voci.splice(da, 1)
      voci.splice(a, 0, presa)
      return { ...p, voci }
    })
  }

  const { imponibile, iva, totale } = conti(preventivo)
  const stato = STATI.find((s) => s.id === preventivo.stato) ?? STATI[0]
  const fatti = controlli.filter((c) => c.fatto).length
  const percentuale = Math.round((fatti / controlli.length) * 100)
  const mancanti = controlli.filter((c) => !c.fatto)

  function copiaTesto() {
    const righe = preventivo.voci.map(
      (v) =>
        `- ${v.descrizione || 'Voce'} — ${v.quantita} × ${euro(v.prezzo)}${
          Number(v.sconto) > 0 ? ` (-${v.sconto}%)` : ''
        } = ${euro(rigaImponibile(v))}`,
    )
    const testo = [
      `${preventivo.numero} — ${preventivo.oggetto || 'Preventivo'}`,
      company.name,
      '',
      `Cliente: ${preventivo.cliente.azienda || '—'}${
        preventivo.cliente.referente ? ` (${preventivo.cliente.referente})` : ''
      }`,
      `Consegna: ${preventivo.consegna}`,
      `Valido fino al ${dataIt(scadenza(preventivo))}`,
      '',
      ...righe,
      '',
      `Imponibile: ${euro(imponibile)}`,
      `IVA ${preventivo.iva}%: ${euro(iva)}`,
      `Totale: ${euro(totale)}`,
      '',
      preventivo.condizioni,
      preventivo.note ? `\nNote: ${preventivo.note}` : '',
    ].join('\n')

    navigator.clipboard?.writeText(testo).then(() => {
      setCopiato(true)
      setTimeout(() => setCopiato(false), 2000)
    })
  }

  return (
    <>
      <section className="no-stampa border-b border-line-muted">
        {/* Barra dell'applicazione */}
        <div className="sticky top-16 z-30 border-b border-line-muted bg-canvas-subtle/95 backdrop-blur">
          <div className="shell flex flex-wrap items-center gap-3 py-3">
            <Link
              to="/area"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm text-fg-muted hover:text-fg"
            >
              <Icon name="arrowRight" size={13} className="rotate-180" />
              Preventivi
            </Link>

            <span className="font-mono text-mini text-fg-subtle">{preventivo.numero}</span>

            {/* Avanzamento: quanto manca perché sia mandabile */}
            <span className="group relative flex items-center gap-2">
              <Anello
                percentuale={percentuale}
                tono={percentuale === 100 ? 'var(--color-success)' : 'var(--color-accent)'}
              />
              <span className="hidden text-sm text-fg-muted sm:block">
                {percentuale === 100 ? 'pronto da mandare' : `manca ${mancanti.length}`}
              </span>

              {mancanti.length > 0 && (
                <span className="pointer-events-none absolute top-full left-0 z-20 mt-2 hidden w-56 rounded-lg border border-line bg-canvas-overlay p-3 text-left shadow-overlay group-hover:block">
                  <span className={etichetta}>Manca ancora</span>
                  <span className="mt-2 block space-y-1">
                    {mancanti.map((m) => (
                      <span key={m.id} className="block text-[13px] text-fg-muted">
                        · {m.label}
                      </span>
                    ))}
                  </span>
                </span>
              )}
            </span>

            <span className="ml-auto flex flex-wrap items-center gap-2">
              <span className="hidden font-mono text-mini text-fg-subtle md:block">
                {salvatoAlle
                  ? `salvato alle ${salvatoAlle.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`
                  : 'salvato'}
              </span>

              {/* `.field` impone larghezza piena: il contenitore la limita,
                  altrimenti il selettore manda a capo tutta la barra. */}
              <span className="w-32 shrink-0">
                <select
                  value={preventivo.stato}
                  onChange={(e) => aggiorna({ stato: e.target.value })}
                  aria-label="Stato del preventivo"
                  className="field h-10 py-0"
                  style={{ color: stato.tono }}
                >
                  {STATI.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </span>

              <button
                type="button"
                onClick={copiaTesto}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line bg-canvas px-3 text-sm text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
              >
                <Icon name={copiato ? 'check' : 'file'} size={14} />
                {copiato ? 'Copiato' : 'Copia testo'}
              </button>

              <Button variant="primary" size="md" icon="file" onClick={() => window.print()}>
                Stampa o PDF
              </Button>
            </span>
          </div>

          {/* Sotto i 1280px non ci stanno affiancate: si sceglie quale metà vedere */}
          <div className="shell flex gap-1 pb-3 xl:hidden">
            {[
              ['compila', 'Compila', 'code'],
              ['anteprima', 'Anteprima', 'browser'],
            ].map(([id, label, icona]) => (
              <button
                key={id}
                type="button"
                onClick={() => setVista(id)}
                aria-pressed={vista === id}
                className={`inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border text-sm font-medium transition-colors ${
                  vista === id
                    ? 'border-fg bg-fg text-canvas'
                    : 'border-line bg-canvas text-fg-muted'
                }`}
              >
                <Icon name={icona} size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="shell grid gap-10 py-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] xl:gap-12">
          {/* ---------------- Colonna di lavoro ---------------- */}
          <div
            className={`min-w-0 space-y-10 ${vista === 'anteprima' ? 'hidden xl:block' : ''}`}
          >
            <div>
              <h2 className="text-lg font-semibold text-fg">A chi è destinato</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {CAMPI_CLIENTE.map(([campo, label, largo]) => (
                  <div key={campo} className={largo ?? ''}>
                    <label htmlFor={campo} className={etichetta}>
                      {label}
                    </label>
                    <input
                      id={campo}
                      value={preventivo.cliente[campo] ?? ''}
                      onChange={(e) => cambiaCliente(campo, e.target.value)}
                      className="field mt-1.5"
                    />
                    {campo === 'piva' &&
                      preventivo.cliente.piva &&
                      !partitaIvaValida(preventivo.cliente.piva) && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-attention">
                          <Icon name="triangle" size={12} />
                          non supera il controllo di validità
                        </p>
                      )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-fg">Di cosa si tratta</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="oggetto" className={etichetta}>
                    Oggetto
                  </label>
                  <input
                    id="oggetto"
                    value={preventivo.oggetto}
                    onChange={(e) => aggiorna({ oggetto: e.target.value })}
                    placeholder="Es. Gestionale commesse e magazzino — primo modulo"
                    className="field mt-1.5"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="consegna" className={etichetta}>
                      Consegna
                    </label>
                    <input
                      id="consegna"
                      value={preventivo.consegna}
                      onChange={(e) => aggiorna({ consegna: e.target.value })}
                      className="field mt-1.5"
                    />
                  </div>
                  <div>
                    <label htmlFor="scadenza" className={etichetta}>
                      Valido fino al
                    </label>
                    <input
                      id="scadenza"
                      type="date"
                      value={scadenzaIso(preventivo)}
                      onChange={(e) => aggiorna({ validoFino: e.target.value })}
                      className="field mt-1.5"
                    />
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-fg-subtle">
                      {(() => {
                        const giorni = giorniAllaScadenza(preventivo)
                        return giorni >= 0 ? `fra ${giorni} giorni` : `scaduto da ${-giorni} giorni`
                      })()}
                      {[15, 30, 60].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            const d = new Date(preventivo.creato)
                            d.setDate(d.getDate() + g)
                            aggiorna({ validitaGiorni: g, validoFino: d.toISOString().slice(0, 10) })
                          }}
                          className="rounded border border-line px-1.5 py-0.5 transition-colors hover:border-fg-subtle hover:text-fg"
                        >
                          +{g}g
                        </button>
                      ))}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="iva" className={etichetta}>
                      IVA (%)
                    </label>
                    <input
                      id="iva"
                      type="number"
                      min="0"
                      value={preventivo.iva}
                      onChange={(e) => aggiorna({ iva: Number(e.target.value) })}
                      className="field mt-1.5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------- Compilazione assistita ---------------- */}
            <AssistenteAI
              onApplica={(proposta, modo) =>
                aggiorna((p) => ({
                  ...p,
                  oggetto: p.oggetto || proposta.oggetto,
                  consegna: proposta.consegna || p.consegna,
                  note: p.note ? `${p.note}\n${proposta.note}` : proposta.note,
                  voci: [
                    ...(modo === 'sostituisci' ? [] : p.voci),
                    ...proposta.voci.map((v) => ({ ...nuovaVoce(), ...v })),
                  ],
                }))
              }
            />

            {/* ---------------- Voci ---------------- */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-fg">Cosa comprende</h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setCatalogoAperto((v) => !v)}
                    aria-expanded={catalogoAperto}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line bg-canvas px-3 text-sm text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
                  >
                    <Icon name="layers" size={14} />
                    Dal catalogo
                  </button>
                  <button
                    type="button"
                    onClick={() => aggiorna((p) => ({ ...p, voci: [...p.voci, nuovaVoce()] }))}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line bg-canvas px-3 text-sm font-medium text-fg transition-colors hover:border-fg-subtle"
                  >
                    <Icon name="plus" size={14} />
                    Riga vuota
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {catalogoAperto && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="mt-4 grid gap-2 overflow-hidden rounded-xl border border-line bg-canvas-subtle p-3 sm:grid-cols-2"
                  >
                    {services.map((s) => (
                      <li key={s.slug}>
                        <button
                          type="button"
                          onClick={() => {
                            aggiorna((p) => ({
                              ...p,
                              voci: [
                                ...p.voci,
                                { ...nuovaVoce(), descrizione: s.title, dettaglio: s.short },
                              ],
                              consegna: p.voci.length === 0 ? s.tempi : p.consegna,
                            }))
                            setCatalogoAperto(false)
                          }}
                          className="flex w-full items-start gap-2.5 rounded-lg border border-line bg-canvas p-3 text-left transition-colors hover:border-fg-subtle"
                        >
                          <Icon
                            name={s.icon}
                            size={16}
                            className="mt-0.5 shrink-0"
                            style={{ color: s.accent }}
                          />
                          <span>
                            <span className="block text-sm font-medium text-fg">{s.title}</span>
                            <span className="block font-mono text-mini text-fg-subtle">
                              {s.tempi}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {/* Ripartizione: quanto pesa ogni voce sul totale */}
              {imponibile > 0 && (
                <div className="mt-5">
                  <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
                    {preventivo.voci.map((v, i) => {
                      const quota = (rigaImponibile(v) / imponibile) * 100
                      if (quota <= 0) return null
                      return (
                        <motion.span
                          key={v.id}
                          animate={{ width: `${quota}%` }}
                          transition={{ duration: 0.5, ease: EASE }}
                          style={{ backgroundColor: TONI[i % TONI.length] }}
                          title={`${v.descrizione || 'Voce'} — ${Math.round(quota)}%`}
                        />
                      )
                    })}
                  </div>
                  <p className="mt-2 font-mono text-mini text-fg-subtle">
                    ripartizione dell’imponibile fra le {preventivo.voci.length} voci
                  </p>
                </div>
              )}

              {preventivo.voci.length === 0 ? (
                <p className="mt-4 rounded-xl border border-dashed border-line p-8 text-center text-sm text-fg-muted">
                  Nessuna voce. Parti dal catalogo delle aree, oppure aggiungi una riga vuota.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {preventivo.voci.map((v, i) => (
                    <motion.li
                      key={v.id}
                      layout
                      draggable
                      onDragStart={() => setTrascinata(i)}
                      onDragOver={(e) => {
                        e.preventDefault()
                        if (trascinata !== null && trascinata !== i) {
                          sposta(trascinata, i)
                          setTrascinata(i)
                        }
                      }}
                      onDragEnd={() => setTrascinata(null)}
                      transition={{ duration: 0.25, ease: EASE }}
                      className={`rounded-xl border bg-canvas p-4 transition-shadow ${
                        trascinata === i ? 'border-accent shadow-float' : 'border-line'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Presa per il trascinamento + tasti per chi non trascina */}
                        <div className="flex flex-col items-center gap-1 pt-1">
                          <span
                            className="cursor-grab text-fg-subtle active:cursor-grabbing"
                            title="Trascina per riordinare"
                            aria-hidden="true"
                          >
                            <Icon name="dash" size={14} />
                          </span>
                          <span
                            className="size-2.5 rounded-full"
                            style={{ backgroundColor: TONI[i % TONI.length] }}
                          />
                          <button
                            type="button"
                            onClick={() => sposta(i, i - 1)}
                            disabled={i === 0}
                            aria-label={`Sposta la voce ${i + 1} in su`}
                            className="flex size-7 items-center justify-center rounded text-fg-subtle transition-colors hover:bg-canvas-subtle hover:text-fg disabled:opacity-30"
                          >
                            <Icon name="chevronDown" size={13} className="rotate-180" />
                          </button>
                          <button
                            type="button"
                            onClick={() => sposta(i, i + 1)}
                            disabled={i === preventivo.voci.length - 1}
                            aria-label={`Sposta la voce ${i + 1} in giù`}
                            className="flex size-7 items-center justify-center rounded text-fg-subtle transition-colors hover:bg-canvas-subtle hover:text-fg disabled:opacity-30"
                          >
                            <Icon name="chevronDown" size={13} />
                          </button>
                        </div>

                        <div className="min-w-0 flex-1 space-y-3">
                          <input
                            value={v.descrizione}
                            onChange={(e) => cambiaVoce(v.id, 'descrizione', e.target.value)}
                            placeholder="Descrizione della voce"
                            className="field font-medium"
                            aria-label={`Descrizione voce ${i + 1}`}
                          />
                          <textarea
                            value={v.dettaglio}
                            onChange={(e) => cambiaVoce(v.id, 'dettaglio', e.target.value)}
                            placeholder="Dettaglio: cosa comprende, cosa resta fuori…"
                            rows={2}
                            className="field resize-y text-sm"
                            aria-label={`Dettaglio voce ${i + 1}`}
                          />

                          <div className="flex flex-wrap items-end gap-3">
                            <label className="w-20">
                              <span className={etichetta}>Q.tà</span>
                              <input
                                type="number"
                                min="0"
                                step="0.5"
                                value={v.quantita}
                                onChange={(e) =>
                                  cambiaVoce(v.id, 'quantita', Number(e.target.value))
                                }
                                className="field mt-1.5"
                              />
                            </label>
                            <label className="w-32">
                              <span className={etichetta}>Prezzo €</span>
                              <input
                                type="number"
                                min="0"
                                step="50"
                                value={v.prezzo}
                                onChange={(e) => cambiaVoce(v.id, 'prezzo', Number(e.target.value))}
                                className="field mt-1.5"
                              />
                            </label>
                            <label className="w-24">
                              <span className={etichetta}>Sconto %</span>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={v.sconto}
                                onChange={(e) => cambiaVoce(v.id, 'sconto', Number(e.target.value))}
                                className="field mt-1.5"
                              />
                            </label>

                            <span className="ml-auto flex items-center gap-3">
                              <Importo
                                valore={rigaImponibile(v)}
                                className="font-semibold text-fg"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  aggiorna((p) => ({
                                    ...p,
                                    voci: p.voci.filter((altra) => altra.id !== v.id),
                                  }))
                                }
                                aria-label={`Togli la voce ${i + 1}`}
                                className="flex size-10 items-center justify-center rounded-lg text-fg-subtle transition-colors hover:bg-danger-subtle hover:text-danger"
                              >
                                <Icon name="x" size={15} />
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="note" className={etichetta}>
                  Note per il cliente
                </label>
                <textarea
                  id="note"
                  rows={4}
                  value={preventivo.note}
                  onChange={(e) => aggiorna({ note: e.target.value })}
                  className="field mt-1.5 resize-y"
                />
              </div>
              <div>
                <label htmlFor="condizioni" className={etichetta}>
                  Condizioni
                </label>
                <textarea
                  id="condizioni"
                  rows={4}
                  value={preventivo.condizioni}
                  onChange={(e) => aggiorna({ condizioni: e.target.value })}
                  className="field mt-1.5 resize-y"
                />
              </div>
            </div>
          </div>

          {/* ---------------- Riepilogo + foglio vivo ---------------- */}
          <aside
            className={`min-w-0 space-y-5 ${vista === 'compila' ? 'hidden xl:block' : ''} xl:sticky xl:top-40 xl:self-start`}
          >
            <div className="rounded-xl border border-line bg-canvas p-5">
              <p className={etichetta}>Totale</p>
              <Importo valore={totale} className="display mt-1 block text-3xl" />

              <dl className="mt-4 space-y-2 border-t border-line-muted pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-fg-muted">Imponibile</dt>
                  <dd>
                    <Importo valore={imponibile} className="text-fg" />
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-fg-muted">IVA {preventivo.iva}%</dt>
                  <dd>
                    <Importo valore={iva} className="text-fg" />
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-fg-muted">Valido fino al</dt>
                  <dd className="text-fg">{dataIt(scadenza(preventivo))}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-line-muted pt-4">
                <button
                  type="button"
                  onClick={() => {
                    const copia = duplica(preventivo.id)
                    if (copia) navigate(`/area/${copia.id}`)
                  }}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line px-3 text-sm text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
                >
                  <Icon name="plus" size={13} />
                  Duplica
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Eliminare il preventivo ${preventivo.numero}?`)) {
                      elimina(preventivo.id)
                      navigate('/area')
                    }
                  }}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line px-3 text-sm text-fg-muted transition-colors hover:border-danger hover:text-danger"
                >
                  <Icon name="x" size={13} />
                  Elimina
                </button>
              </div>
            </div>

            {/* Il foglio, vivo */}
            <div>
              <p className="mb-2 flex items-center gap-2 font-mono text-mini text-fg-subtle">
                <Icon name="browser" size={12} />
                anteprima · è la pagina che esce dalla stampante
              </p>
              <div className="overflow-hidden rounded-xl border border-line shadow-float">
                <AnteprimaFoglio preventivo={preventivo} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Copia da stampa: a schermo non esiste */}
      <article className="foglio hidden">
        <FoglioPreventivo preventivo={preventivo} />
      </article>
    </>
  )
}
