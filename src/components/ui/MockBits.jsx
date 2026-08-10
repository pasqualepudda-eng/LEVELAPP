/**
 * Pezzi ricorrenti dei mockup: badge di stato, avatar con iniziali, barra di
 * avanzamento e micro-grafico. Li usano sia la finestra applicativa della home
 * sia le anteprime del costruttore, quindi vivono qui invece di essere
 * copiati due volte.
 *
 * Sono decorativi: chi li usa mette `aria-hidden` sull'involucro.
 */

export function Badge({ children, tono }) {
  return (
    <span
      className="rounded-full border px-1.5 py-0.5 text-[9.5px] leading-none font-medium whitespace-nowrap"
      style={{
        color: tono,
        borderColor: `color-mix(in oklab, ${tono} 40%, transparent)`,
        backgroundColor: `color-mix(in oklab, ${tono} 10%, transparent)`,
      }}
    >
      {children}
    </span>
  )
}

/* La misura arriva da `className` e non da una classe composta a runtime:
   Tailwind non vede le stringhe costruite al volo e non genererebbe la regola. */
export function Avatar({ nome, className = 'size-5 text-[8.5px]' }) {
  const iniziali = nome
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border border-line bg-canvas-subtle font-semibold text-fg-muted ${className}`}
    >
      {iniziali}
    </span>
  )
}

export function Avanzamento({ valore, tono, larghezza = 'w-12' }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-1 ${larghezza} overflow-hidden rounded-full bg-line-muted`}>
        <span
          className="block h-full rounded-full"
          style={{ width: `${valore}%`, backgroundColor: tono }}
        />
      </span>
      <span className="font-mono text-[9.5px] text-fg-subtle">{valore}%</span>
    </span>
  )
}

/** Micro-grafico a linea, per le caselle dei numeri. */
export function Sparkline({ punti, tono, className = 'h-4 w-14' }) {
  const max = Math.max(...punti)
  const min = Math.min(...punti)
  const percorso = punti
    .map((v, i) => {
      const x = (i / (punti.length - 1)) * 52
      const y = 16 - ((v - min) / (max - min || 1)) * 14
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg viewBox="0 0 52 18" className={`${className} shrink-0`} fill="none">
      <path d={percorso} stroke={tono} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
