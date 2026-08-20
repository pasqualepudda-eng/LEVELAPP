import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { esci, useSessione } from '../lib/auth'
import {
  STATI,
  conti,
  dataIt,
  duplica,
  elimina,
  euro,
  salva,
  statoDi,
  usePreventivi,
  vuoto,
} from '../lib/preventivi'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import { Link, navigate } from '../lib/router'
import { EASE } from '../lib/motion'

/**
 * Cruscotto dell'area riservata: quanto vale il lavoro in giro, l'elenco dei
 * preventivi con ricerca e filtro, e il pulsante che ne apre uno nuovo.
 */
export default function Area() {
  const sessione = useSessione()
  const lista = usePreventivi()
  const [cerca, setCerca] = useState('')
  const [filtro, setFiltro] = useState('tutti')

  /* Chi non ha una sessione non sta qui. */
  useEffect(() => {
    if (!sessione) navigate('/accedi')
  }, [sessione])

  const totali = useMemo(() => {
    const valore = (p) => conti(p).totale
    return {
      quanti: lista.length,
      inGioco: lista.filter((p) => p.stato === 'inviato').reduce((t, p) => t + valore(p), 0),
      accettato: lista.filter((p) => p.stato === 'accettato').reduce((t, p) => t + valore(p), 0),
      conversione: (() => {
        const decisi = lista.filter((p) => ['accettato', 'rifiutato'].includes(p.stato))
        if (decisi.length === 0) return null
        return Math.round(
          (decisi.filter((p) => p.stato === 'accettato').length / decisi.length) * 100,
        )
      })(),
    }
  }, [lista])

  const visibili = useMemo(() => {
    const q = cerca.trim().toLowerCase()
    return lista
      .filter((p) => filtro === 'tutti' || p.stato === filtro)
      .filter(
        (p) =>
          !q ||
          [p.numero, p.oggetto, p.cliente?.azienda, p.cliente?.referente]
            .filter(Boolean)
            .some((v) => v.toLowerCase().includes(q)),
      )
      .sort((a, b) => new Date(b.aggiornato) - new Date(a.aggiornato))
  }, [lista, cerca, filtro])

  if (!sessione) return null

  function nuovo() {
    const p = salva(vuoto())
    navigate(`/area/${p.id}`)
  }

  return (
    <section className="border-b border-line-muted">
      {/* Barra dell'applicazione */}
      <div className="border-b border-line-muted bg-canvas-subtle">
        <div className="shell flex flex-wrap items-center gap-4 py-4">
          <span className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg border border-line bg-canvas text-accent">
              <Icon name="file" size={17} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-fg">Studio preventivi</span>
              <span className="block font-mono text-mini text-fg-subtle">{sessione.email}</span>
            </span>
          </span>

          <button
            type="button"
            onClick={() => {
              esci()
              navigate('/')
            }}
            className="ml-auto inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line bg-canvas px-3 text-sm text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
          >
            <Icon name="lock" size={13} />
            Esci
          </button>
        </div>
      </div>

      <div className="shell py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="display text-3xl sm:text-4xl">I tuoi preventivi</h1>
            <p className="mt-2 text-fg-muted">
              {totali.quanti === 0
                ? 'Non ce n’è ancora nessuno: il primo si scrive in due minuti.'
                : `${totali.quanti} ${totali.quanti === 1 ? 'documento' : 'documenti'}, ultimo aggiornamento ${dataIt(visibili[0]?.aggiornato ?? new Date().toISOString())}.`}
            </p>
          </div>
          <Button variant="primary" size="lg" icon="plus" onClick={nuovo}>
            Nuovo preventivo
          </Button>
        </div>

        {/* Cruscotto */}
        <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Documenti', String(totali.quanti), 'var(--color-fg)'],
            ['In attesa di risposta', euro(totali.inGioco), 'var(--color-accent)'],
            ['Accettato', euro(totali.accettato), 'var(--color-success)'],
            [
              'Conversione',
              totali.conversione === null ? '—' : `${totali.conversione}%`,
              'var(--color-purple)',
            ],
          ].map(([voce, valore, tono]) => (
            <div key={voce} className="bg-canvas p-5">
              <dt className="font-mono text-mini tracking-wider text-fg-subtle uppercase">{voce}</dt>
              <dd className="display mt-2 text-2xl" style={{ color: tono }}>
                {valore}
              </dd>
            </div>
          ))}
        </dl>

        {/* Ricerca e filtri */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <label className="relative flex-1 sm:max-w-xs">
            <Icon
              name="search"
              size={14}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-fg-subtle"
            />
            <input
              value={cerca}
              onChange={(e) => setCerca(e.target.value)}
              placeholder="Cerca numero, cliente, oggetto…"
              className="field pl-10"
              aria-label="Cerca fra i preventivi"
            />
          </label>

          <div className="flex flex-wrap gap-1.5">
            {[{ id: 'tutti', label: 'Tutti' }, ...STATI].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setFiltro(s.id)}
                aria-pressed={filtro === s.id}
                className={`min-h-10 rounded-full border px-3.5 text-sm transition-colors ${
                  filtro === s.id
                    ? 'border-fg bg-fg text-canvas'
                    : 'border-line text-fg-muted hover:border-fg-subtle hover:text-fg'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Elenco */}
        {visibili.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-line p-10 text-center">
            <p className="text-fg-muted">
              {lista.length === 0
                ? 'Qui compariranno i preventivi che scrivi.'
                : 'Nessun preventivo corrisponde a questa ricerca.'}
            </p>
          </div>
        ) : (
          <ul className="mt-6 overflow-hidden rounded-xl border border-line">
            {visibili.map((p, i) => {
              const stato = statoDi(p.stato)
              const { totale } = conti(p)
              return (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03, ease: EASE }}
                  className="group border-b border-line-muted bg-canvas last:border-0"
                >
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 p-4 transition-colors group-hover:bg-canvas-subtle">
                    <Link to={`/area/${p.id}`} className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="font-mono text-mini text-fg-subtle">{p.numero}</span>
                        <span
                          className="rounded-full px-2 py-0.5 font-mono text-mini"
                          style={{
                            color: stato.tono,
                            backgroundColor: `color-mix(in oklab, ${stato.tono} 12%, transparent)`,
                          }}
                        >
                          {stato.label}
                        </span>
                      </span>
                      <span className="mt-1 block truncate font-semibold text-fg">
                        {p.cliente?.azienda || 'Cliente da indicare'}
                      </span>
                      <span className="block truncate text-sm text-fg-muted">
                        {p.oggetto || 'Oggetto da scrivere'}
                      </span>
                    </Link>

                    <span className="text-right">
                      <span className="block font-semibold text-fg">{euro(totale)}</span>
                      <span className="block font-mono text-mini text-fg-subtle">
                        {dataIt(p.aggiornato)}
                      </span>
                    </span>

                    <span className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          const copia = duplica(p.id)
                          if (copia) navigate(`/area/${copia.id}`)
                        }}
                        aria-label={`Duplica ${p.numero}`}
                        className="flex size-10 items-center justify-center rounded-lg text-fg-subtle transition-colors hover:bg-canvas hover:text-fg"
                      >
                        <Icon name="plus" size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Eliminare il preventivo ${p.numero}?`)) elimina(p.id)
                        }}
                        aria-label={`Elimina ${p.numero}`}
                        className="flex size-10 items-center justify-center rounded-lg text-fg-subtle transition-colors hover:bg-danger-subtle hover:text-danger"
                      >
                        <Icon name="x" size={15} />
                      </button>
                    </span>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
