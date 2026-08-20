import { useState } from 'react'
import { rimuoviChiave, salvaChiave, useChiave } from '../../lib/ai'
import Icon from '../ui/Icon'
import Button from '../ui/Button'

/**
 * Attivazione dell'assistente: senza chiave, compilazione e ricerca in rete
 * restano spente.
 *
 * Incollandola qui resta in questo browser e vale subito, senza ricostruire il
 * sito — utile quando si lavora sul sito già pubblicato. In alternativa la
 * chiave può stare nella configurazione (`VITE_ANTHROPIC_API_KEY` in
 * `.env.local`): in quel caso viaggia dentro il pacchetto pubblicato, e questo
 * pannello si limita a dirlo.
 */
export default function ChiaveAI() {
  const chiave = useChiave()
  const [valore, setValore] = useState('')
  const [aperto, setAperto] = useState(false)

  if (chiave.presente) {
    return (
      <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-mini text-fg-subtle">
        <Icon name="check" size={12} className="text-success" />
        chiave attiva ({chiave.mascherata}) ·{' '}
        {chiave.origine === 'locale' ? 'salvata in questo browser' : 'dalla configurazione del sito'}
        {chiave.origine === 'locale' && (
          <button
            type="button"
            onClick={rimuoviChiave}
            className="underline transition-colors hover:text-fg"
          >
            rimuovi
          </button>
        )}
      </p>
    )
  }

  if (!aperto) {
    return (
      <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-mini text-fg-subtle">
        <Icon name="lock" size={12} />
        assistente spento
        <button
          type="button"
          onClick={() => setAperto(true)}
          className="underline transition-colors hover:text-fg"
        >
          attivalo con la tua chiave
        </button>
      </p>
    )
  }

  return (
    <div className="mt-4 rounded-lg border border-line bg-canvas p-4">
      <label htmlFor="chiave-ai" className="block font-mono text-mini tracking-wider text-fg-subtle uppercase">
        Chiave API Anthropic
      </label>
      <div className="mt-1.5 flex flex-wrap gap-2">
        <input
          id="chiave-ai"
          type="password"
          autoComplete="off"
          value={valore}
          onChange={(e) => setValore(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && valore.trim() && salvaChiave(valore)}
          placeholder="sk-ant-…"
          className="field min-w-[16rem] flex-1"
        />
        <Button
          variant="primary"
          size="md"
          icon="check"
          onClick={() => valore.trim() && salvaChiave(valore)}
        >
          Attiva
        </Button>
      </div>
      <p className="mt-2.5 text-xs leading-relaxed text-fg-subtle">
        Resta in questo browser e non viene mandata a nessuno tranne che ad Anthropic, a ogni
        richiesta. Per averla su tutti i computer, mettila invece in <code>.env.local</code> come{' '}
        <code>VITE_ANTHROPIC_API_KEY</code> e ricostruisci il sito — ma da lì finisce nel pacchetto
        pubblico, leggibile da chiunque apra il sito.
      </p>
    </div>
  )
}
