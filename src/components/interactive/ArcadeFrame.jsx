import Icon from '../ui/Icon'

/**
 * Cornice comune ai due classici: pannello sempre scuro (come le sezioni di
 * prodotto), insegna in alto, righe da cabinato sopra lo schermo e una riga di
 * comandi in basso.
 *
 * Resta scura anche in tema chiaro: un gioco a blocchi su fondo bianco perde
 * metà del suo effetto.
 */
export default function ArcadeFrame({
  title,
  subtitle,
  icon = 'play',
  accent = 'var(--color-success)',
  hud,
  children,
  footer,
}) {
  return (
    <div
      className="on-dark overflow-hidden rounded-xl border border-line"
      style={{ '--accent': accent }}
    >
      {/* Insegna */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line bg-canvas-subtle px-4 py-3">
        <span
          className="flex size-8 items-center justify-center rounded-lg border border-line bg-canvas"
          style={{ color: accent }}
        >
          <Icon name={icon} size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-fg">{title}</h3>
          {subtitle && <p className="text-[11.5px] text-fg-muted">{subtitle}</p>}
        </div>
        {hud}
      </div>

      {/* Schermo */}
      <div className="scanlines relative bg-canvas-inset p-3 sm:p-4">{children}</div>

      {footer && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-canvas-subtle px-4 py-3">
          {footer}
        </div>
      )}
    </div>
  )
}

/** Contatore della barra di stato: etichetta piccola, valore mono. */
export function Hud({ label, value, tone }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-line bg-canvas px-2.5 py-0.5">
      <span className="text-[10px] tracking-wide text-fg-subtle uppercase">{label}</span>
      <span className="font-mono text-[11px]" style={{ color: tone ?? 'var(--color-fg)' }}>
        {value}
      </span>
    </span>
  )
}

/** Pulsantiera per il touch: le frecce non ci sono, servono dei tasti veri. */
export function TouchPad({ onPress, onRelease, buttons }) {
  return (
    <div className="flex gap-2 sm:hidden">
      {buttons.map((b) => (
        <button
          key={b.id}
          type="button"
          aria-label={b.label}
          onPointerDown={(e) => {
            e.preventDefault()
            onPress(b.id)
          }}
          onPointerUp={() => onRelease(b.id)}
          onPointerLeave={() => onRelease(b.id)}
          onPointerCancel={() => onRelease(b.id)}
          className="flex size-11 items-center justify-center rounded-lg border border-line bg-canvas-overlay text-fg active:bg-canvas-raised"
        >
          {/* Una sola icona, ruotata o specchiata: evita di disegnarne quattro. */}
          <Icon name={b.icon} size={16} style={b.transform ? { transform: b.transform } : undefined} />
        </button>
      ))}
    </div>
  )
}
