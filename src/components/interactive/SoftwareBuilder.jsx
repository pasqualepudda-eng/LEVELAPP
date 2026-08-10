import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { modules, softwareTypes } from '../../data/interactive'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import { StatusDot } from '../ui/Label'
import AnteprimaModulo from './ModulePreview'
import { EASE } from '../../lib/motion'

/**
 * Costruttore di gestionali: si sceglie il tipo di software, compaiono i
 * moduli disponibili e trascinandoli (o cliccandoli, che è l'unica strada sui
 * dispositivi touch) si compone un'anteprima navigabile.
 *
 * Tutto vive nello stato del componente: nessun salvataggio, nessun
 * localStorage. Ricaricare la pagina riporta la scrivania vuota, ed è
 * voluto — è una demo, non un configuratore che promette un preventivo.
 */

/* ------------------------------------------------------------------
   Costruttore
   ------------------------------------------------------------------ */

export default function SoftwareBuilder() {
  const [typeId, setTypeId] = useState(null)
  const [installedIds, setInstalledIds] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [annuncio, setAnnuncio] = useState('')

  const type = softwareTypes.find((item) => item.id === typeId) ?? null
  const accent = type?.accent ?? 'var(--color-accent)'
  const disponibili = type ? modules.filter((m) => m.types.includes(type.id)) : []
  const installati = installedIds.map((id) => modules.find((m) => m.id === id)).filter(Boolean)
  const attivo = installati.find((m) => m.id === activeId) ?? installati[0] ?? null

  // Cambiare tipo di software significa ricominciare: i moduli disponibili
  // sono altri e tenerne di vecchi darebbe un'anteprima incoerente.
  function scegliTipo(id) {
    setTypeId(id)
    setInstalledIds([])
    setActiveId(null)
    setAnnuncio(
      `Tipo selezionato: ${softwareTypes.find((t) => t.id === id)?.label}. Ora scegli i moduli.`,
    )
  }

  function aggiungi(id) {
    const modulo = modules.find((m) => m.id === id)
    if (!modulo || !type || !modulo.types.includes(type.id)) return

    setActiveId(id)

    if (installedIds.includes(id)) {
      setAnnuncio(`${modulo.label} è già nel tuo gestionale.`)
      return
    }

    setInstalledIds([...installedIds, id])
    setAnnuncio(`${modulo.label} aggiunto. Moduli installati: ${installedIds.length + 1}.`)
  }

  function rimuovi(id) {
    const modulo = modules.find((m) => m.id === id)
    setInstalledIds((precedenti) => precedenti.filter((voce) => voce !== id))
    setActiveId((corrente) => (corrente === id ? null : corrente))
    setAnnuncio(`${modulo?.label ?? 'Modulo'} rimosso.`)
  }

  function svuota() {
    setInstalledIds([])
    setActiveId(null)
    setAnnuncio('Scrivania svuotata.')
  }

  function onDrop(event) {
    event.preventDefault()
    setDragOver(false)
    aggiungi(event.dataTransfer.getData('text/plain'))
  }

  return (
    <div>
      {/* Passo 1 — tipo di software */}
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-fg-muted">
        <li className="flex items-center gap-2 font-medium text-fg">
          <span className="flex size-5 items-center justify-center rounded-full bg-fg text-[11px] font-semibold text-canvas">
            1
          </span>
          Scegli il tipo di software
        </li>
        <Icon name="chevronRight" size={12} className="text-fg-subtle" />
        <li className={`flex items-center gap-2 ${type ? 'font-medium text-fg' : ''}`}>
          <span
            className={`flex size-5 items-center justify-center rounded-full text-[11px] font-semibold ${
              type ? 'bg-fg text-canvas' : 'border border-line text-fg-subtle'
            }`}
          >
            2
          </span>
          Trascina i moduli sulla scrivania
        </li>
      </ol>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {softwareTypes.map((item) => {
          const selezionato = item.id === typeId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scegliTipo(item.id)}
              aria-pressed={selezionato}
              className="card card-hover flex h-full flex-row items-center gap-3 p-4 text-left transition-shadow sm:flex-col sm:items-stretch sm:p-5"
              style={
                selezionato
                  ? {
                      borderColor: item.accent,
                      boxShadow: `0 0 0 1px ${item.accent}`,
                    }
                  : undefined
              }
            >
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas"
                style={{ color: item.accent }}
              >
                <Icon name={item.icon} size={16} />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-semibold text-fg sm:mt-4">
                  {item.label}
                  {selezionato && <Icon name="check" size={14} style={{ color: item.accent }} />}
                </span>
                <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-fg-muted sm:mt-1.5 sm:line-clamp-none">
                  {item.desc}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Passo 2 — moduli e scrivania */}
      <AnimatePresence>
        {type && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-8 grid gap-5 lg:grid-cols-[20rem_1fr]"
          >
            {/* Catalogo dei moduli */}
            <div className="card flex max-h-[20rem] flex-col p-4 lg:max-h-[34rem]">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-fg">Moduli disponibili</h3>
                <span className="font-mono text-xs text-fg-subtle">{disponibili.length}</span>
              </div>
              <p className="mt-1 text-xs text-fg-muted">
                Trascinali sulla scrivania. Da telefono basta toccarli.
              </p>

              <ul className="mt-3 min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
                {disponibili.map((modulo) => {
                  const giaPresente = installedIds.includes(modulo.id)
                  return (
                    <li key={modulo.id}>
                      <button
                        type="button"
                        draggable={!giaPresente}
                        onDragStart={(event) => {
                          event.dataTransfer.setData('text/plain', modulo.id)
                          event.dataTransfer.effectAllowed = 'copy'
                        }}
                        onClick={() => aggiungi(modulo.id)}
                        disabled={giaPresente}
                        className={`flex w-full items-start gap-2.5 rounded-md border p-2.5 text-left transition-colors ${
                          giaPresente
                            ? 'cursor-default border-line-muted bg-canvas-subtle opacity-55'
                            : 'border-line bg-canvas hover:border-fg-subtle hover:bg-canvas-subtle'
                        }`}
                      >
                        <Icon
                          name={modulo.icon}
                          size={15}
                          className="mt-0.5 shrink-0"
                          style={{
                            color: giaPresente ? 'var(--color-fg-subtle)' : accent,
                          }}
                        />
                        <span className="min-w-0">
                          <span className="flex items-center gap-1.5 text-[13px] font-semibold text-fg">
                            {modulo.label}
                            {giaPresente && (
                              <Icon name="check" size={11} className="text-success" />
                            )}
                          </span>
                          <span className="mt-0.5 block text-[11.5px] leading-snug text-fg-muted">
                            {modulo.desc}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Scrivania: l'anteprima del gestionale composto */}
            <div>
              <div
                onDragOver={(event) => {
                  event.preventDefault()
                  setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                className={`overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
                  dragOver ? 'bg-canvas-subtle' : 'border-line-muted'
                }`}
                style={dragOver ? { borderColor: accent } : undefined}
              >
                {installati.length === 0 ? (
                  <div className="flex min-h-[24rem] flex-col items-center justify-center gap-3 p-8 text-center">
                    <span
                      className="flex size-12 items-center justify-center rounded-xl border border-line bg-canvas-subtle"
                      style={{ color: accent }}
                    >
                      <Icon name="plus" size={20} />
                    </span>
                    <p className="text-lg font-semibold text-fg">La tua scrivania è vuota</p>
                    <p className="max-w-sm text-sm text-fg-muted">
                      Trascina qui il primo modulo — o toccalo nell’elenco — e vedrai comparire il
                      tuo {type.label.toLowerCase()}.
                    </p>
                  </div>
                ) : (
                  /* Finestra applicativa costruita dall'utente */
                  <div className="overflow-hidden rounded-[10px] border border-line bg-canvas-inset">
                    <div className="flex items-center gap-3 border-b border-line bg-canvas-subtle px-3 py-2.5">
                      <div className="flex gap-1.5">
                        <span className="size-3 rounded-full bg-line" />
                        <span className="size-3 rounded-full bg-line" />
                        <span className="size-3 rounded-full bg-line" />
                      </div>
                      <div className="flex flex-1 items-center gap-2 rounded-md border border-line bg-canvas px-2.5 py-1 font-mono text-[11px] text-fg-subtle">
                        <Icon name="lock" size={11} />
                        {type.id}.tuaazienda.it
                      </div>
                      <span className="hidden items-center gap-1.5 text-[11px] text-fg-muted sm:flex">
                        <StatusDot tone="success" />
                        {installati.length} {installati.length === 1 ? 'modulo' : 'moduli'}
                      </span>
                    </div>

                    <div className="flex min-h-[22rem]">
                      {/* Menu: i moduli installati */}
                      <div className="hidden w-48 shrink-0 border-r border-line bg-canvas p-2 sm:block">
                        <p className="px-2 pt-1 pb-2 text-[10px] font-semibold tracking-wide text-fg-subtle uppercase">
                          {type.label}
                        </p>
                        <ul>
                          {installati.map((modulo) => {
                            const selezionato = attivo?.id === modulo.id
                            return (
                              <li key={modulo.id} className="group/voce relative">
                                <button
                                  type="button"
                                  onClick={() => setActiveId(modulo.id)}
                                  className={`flex w-full items-center gap-2 rounded-md py-1.5 pr-7 pl-2 text-left text-[11.5px] transition-colors ${
                                    selezionato
                                      ? 'bg-canvas-overlay text-fg'
                                      : 'text-fg-muted hover:text-fg'
                                  }`}
                                >
                                  <Icon
                                    name={modulo.icon}
                                    size={13}
                                    style={selezionato ? { color: accent } : undefined}
                                  />
                                  <span className="truncate">{modulo.label}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => rimuovi(modulo.id)}
                                  aria-label={`Rimuovi ${modulo.label}`}
                                  className="absolute top-1/2 right-1 flex size-5 -translate-y-1/2 items-center justify-center rounded text-fg-subtle opacity-0 transition hover:bg-canvas-raised hover:text-danger focus-visible:opacity-100 group-hover/voce:opacity-100"
                                >
                                  <Icon name="x" size={11} />
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </div>

                      {/* Contenuto del modulo selezionato */}
                      <div className="min-w-0 flex-1">
                        {/* Sotto i 640px il menu laterale sparisce: questa fila
                            scorrevole lo sostituisce. */}
                        <div className="flex gap-1.5 overflow-x-auto border-b border-line-muted bg-canvas px-3 py-2 sm:hidden">
                          {installati.map((modulo) => {
                            const selezionato = attivo?.id === modulo.id
                            return (
                              <button
                                key={modulo.id}
                                type="button"
                                onClick={() => setActiveId(modulo.id)}
                                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] whitespace-nowrap transition-colors ${
                                  selezionato
                                    ? 'border-line bg-canvas-overlay text-fg'
                                    : 'border-transparent text-fg-muted'
                                }`}
                              >
                                <Icon
                                  name={modulo.icon}
                                  size={12}
                                  style={selezionato ? { color: accent } : undefined}
                                />
                                {modulo.label}
                              </button>
                            )
                          })}
                        </div>

                        <div className="p-4">
                          {attivo && (
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={attivo.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25, ease: EASE }}
                              >
                                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                                  <div>
                                    <h4 className="text-sm font-semibold text-fg">
                                      {attivo.label}
                                    </h4>
                                    <p className="text-[11.5px] text-fg-muted">{attivo.desc}</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => rimuovi(attivo.id)}
                                    className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 text-[11px] text-fg-muted transition-colors hover:border-danger hover:text-danger sm:hidden"
                                  >
                                    <Icon name="x" size={10} />
                                    Rimuovi
                                  </button>
                                </div>

                                <AnteprimaModulo modulo={attivo} accent={accent} />
                              </motion.div>
                            </AnimatePresence>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Barra di stato sotto la scrivania */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-fg-muted">
                  {installati.length === 0
                    ? 'Niente viene salvato: se aggiorni la pagina, riparti da zero.'
                    : `Hai composto un ${type.label.toLowerCase()} con ${installati.length} ${
                        installati.length === 1 ? 'modulo' : 'moduli'
                      }. Ricaricando la pagina si azzera.`}
                </p>

                <div className="flex items-center gap-2">
                  {installati.length > 0 && (
                    <Button variant="invisible" size="sm" onClick={svuota} icon="dash">
                      Svuota
                    </Button>
                  )}
                  {installati.length > 0 && (
                    <Button to="/contatti" variant="default" size="sm" trailingIcon="arrowRight">
                      Costruiscilo davvero
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Le modifiche vanno annunciate: chi usa uno screen reader non "vede"
          la scrivania cambiare. */}
      <p aria-live="polite" className="sr-only">
        {annuncio}
      </p>
    </div>
  )
}
