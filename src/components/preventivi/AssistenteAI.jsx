import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { compilaPreventivo, useChiave } from '../../lib/ai'
import { euro } from '../../lib/preventivi'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import ChiaveAI from './ChiaveAI'
import { EASE } from '../../lib/motion'

/**
 * Si descrive il lavoro a parole e torna un preventivo compilato: oggetto,
 * consegna, note e voci con quantità e prezzo.
 *
 * La proposta non entra mai da sola nel documento — arriva come elenco di voci
 * spuntabili, si toglie quello che non serve e solo allora si applica. Chi
 * scrive resta l'ultimo a decidere.
 */

const ESEMPI = [
  'Gestionale commesse per un’azienda metalmeccanica di 40 persone: anagrafiche, ordini, avanzamento in officina e collegamento al gestionale contabile che hanno già.',
  'E-commerce per un produttore di vini con catalogo, spedizioni e pagamenti, più una landing per la campagna di Natale.',
  'Assistente AI che risponde ai clienti su WhatsApp leggendo i nostri manuali, con passaggio a una persona quando serve.',
]

export default function AssistenteAI({ onApplica }) {
  const [descrizione, setDescrizione] = useState('')
  const [attesa, setAttesa] = useState(false)
  const [errore, setErrore] = useState('')
  const [esito, setEsito] = useState(null)
  const [escluse, setEscluse] = useState(new Set())

  const conAi = useChiave().presente

  async function compila() {
    if (descrizione.trim().length < 15) {
      setErrore('Scrivi qualche riga in più: con due parole viene fuori un preventivo generico.')
      return
    }
    setAttesa(true)
    setErrore('')
    setEsito(null)
    try {
      const risultato = await compilaPreventivo(descrizione)
      setEsito(risultato)
      setEscluse(new Set())
    } catch (e) {
      setErrore(
        e?.status === 401
          ? 'La chiave non è valida: controlla VITE_ANTHROPIC_API_KEY.'
          : (e?.message ?? 'Non è riuscita la chiamata al modello.'),
      )
    } finally {
      setAttesa(false)
    }
  }

  function applica(modo) {
    const voci = esito.dati.voci.filter((_, i) => !escluse.has(i))
    onApplica({ ...esito.dati, voci }, modo)
    setEsito(null)
    setDescrizione('')
  }

  const totale = esito
    ? esito.dati.voci.reduce(
        (t, v, i) => (escluse.has(i) ? t : t + Number(v.quantita || 0) * Number(v.prezzo || 0)),
        0,
      )
    : 0

  return (
    <div className="rounded-xl border border-line bg-canvas-subtle p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg border border-line bg-canvas text-purple">
          <Icon name="sparkle" size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-fg">Dettalo, lo compilo io</h2>
          <p className="text-sm text-fg-muted">
            Descrivi il lavoro a parole tue: torna un preventivo con voci, giornate e prezzi da
            correggere.
          </p>
        </div>
        <span
          className="rounded-full border border-line px-2.5 py-1 font-mono text-mini"
          style={{ color: conAi ? 'var(--color-purple)' : 'var(--color-fg-subtle)' }}
        >
          {conAi ? 'Claude Opus 5' : 'bozza locale · senza AI'}
        </span>
      </div>

      <textarea
        value={descrizione}
        onChange={(e) => setDescrizione(e.target.value)}
        rows={4}
        placeholder="Es. Portale fornitori per un’azienda di servizi: area riservata per 200 fornitori, caricamento documenti, scadenze e notifiche, collegato al gestionale che hanno già."
        className="field mt-4 resize-y"
        aria-label="Descrizione del lavoro da preventivare"
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button
          variant="primary"
          size="md"
          icon={attesa ? undefined : 'sparkle'}
          onClick={compila}
          disabled={attesa}
        >
          {attesa ? 'Sto scrivendo…' : 'Compila il preventivo'}
        </Button>

        {!descrizione && (
          <span className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-mini text-fg-subtle">esempi:</span>
            {ESEMPI.map((e, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setDescrizione(e)}
                className="min-h-9 rounded-full border border-line bg-canvas px-3 text-[13px] text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
              >
                {['gestionale', 'e-commerce', 'assistente AI'][i]}
              </button>
            ))}
          </span>
        )}
      </div>

      <ChiaveAI />

      {errore && (
        <p
          role="alert"
          className="mt-3 flex items-start gap-2 rounded-lg border border-danger-emphasis/40 bg-danger-subtle px-3 py-2.5 text-sm text-danger"
        >
          <Icon name="x" size={14} className="mt-0.5 shrink-0" />
          {errore}
        </p>
      )}

      {/* Proposta: si sfoltisce e poi si applica */}
      <AnimatePresence>
        {esito && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-5 rounded-xl border border-line bg-canvas p-5">
              <p className="font-mono text-mini tracking-wider text-fg-subtle uppercase">
                {esito.fonte === 'ai' ? 'Proposta del modello' : 'Bozza dal catalogo interno'}
              </p>

              <p className="mt-2 text-lg font-semibold text-fg">{esito.dati.oggetto}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-fg-muted">
                <Icon name="clock" size={13} />
                {esito.dati.consegna}
              </p>

              <ul className="mt-4 divide-y divide-line-muted border-y border-line-muted">
                {esito.dati.voci.map((v, i) => {
                  const dentro = !escluse.has(i)
                  return (
                    <li key={i} className="py-3">
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={dentro}
                          onChange={() =>
                            setEscluse((precedenti) => {
                              const nuove = new Set(precedenti)
                              if (nuove.has(i)) nuove.delete(i)
                              else nuove.add(i)
                              return nuove
                            })
                          }
                          className="mt-1 size-4 shrink-0 accent-[var(--color-accent-emphasis)]"
                        />
                        <span className={`min-w-0 flex-1 ${dentro ? '' : 'opacity-45'}`}>
                          <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                            <span className="font-medium text-fg">{v.descrizione}</span>
                            <span className="font-mono text-[13px] text-fg-muted">
                              {v.quantita} × {euro(v.prezzo)} ={' '}
                              <span className="text-fg">
                                {euro(Number(v.quantita) * Number(v.prezzo))}
                              </span>
                            </span>
                          </span>
                          <span className="mt-0.5 block text-[13px] leading-relaxed text-fg-muted">
                            {v.dettaglio}
                          </span>
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>

              {esito.dati.note && (
                <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">
                  <span className="font-semibold text-fg">Note: </span>
                  {esito.dati.note}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="mr-auto font-mono text-mini text-fg-subtle">
                  imponibile proposto {euro(totale)}
                </span>
                <Button variant="default" size="md" onClick={() => applica('aggiungi')}>
                  Aggiungi alle voci
                </Button>
                <Button variant="primary" size="md" icon="check" onClick={() => applica('sostituisci')}>
                  Sostituisci il preventivo
                </Button>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-fg-subtle">
                {esito.fonte === 'ai'
                  ? 'Scritto da un modello: prezzi e giornate sono una stima da controllare riga per riga prima di mandarlo.'
                  : 'Nessuna AI in mezzo: le voci arrivano dal catalogo dei servizi in base alle parole che hai usato.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
