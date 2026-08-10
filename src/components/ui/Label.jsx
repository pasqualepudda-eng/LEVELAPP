/**
 * Etichetta a pillola, come i label delle issue: bordo del colore del tono,
 * testo dello stesso colore, fondo trasparente (o pieno con `filled`).
 */

const tones = {
  neutral: { fg: 'var(--color-fg-muted)', line: 'var(--color-line)' },
  accent: { fg: 'var(--color-accent)', line: 'var(--color-accent)' },
  success: { fg: 'var(--color-success)', line: 'var(--color-success)' },
  purple: { fg: 'var(--color-purple)', line: 'var(--color-purple)' },
  attention: { fg: 'var(--color-attention)', line: 'var(--color-attention)' },
  danger: { fg: 'var(--color-danger)', line: 'var(--color-danger)' },
  pink: { fg: 'var(--color-pink)', line: 'var(--color-pink)' },
  orange: { fg: 'var(--color-orange)', line: 'var(--color-orange)' },
}

export default function Label({
  children,
  tone = 'neutral',
  filled = false,
  className = '',
  ...rest
}) {
  const t = tones[tone] ?? tones.neutral

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${className}`}
      style={{
        color: filled ? '#fff' : t.fg,
        borderColor: filled ? 'transparent' : `color-mix(in oklab, ${t.line} 45%, transparent)`,
        backgroundColor: filled
          ? t.fg
          : `color-mix(in oklab, ${t.line} 12%, transparent)`,
      }}
      {...rest}
    >
      {children}
    </span>
  )
}

/** Pallino di stato colorato, usato accanto alle etichette "in linea". */
export function StatusDot({ tone = 'success', className = '' }) {
  const t = tones[tone] ?? tones.success
  return (
    <span
      className={`inline-block size-2 shrink-0 rounded-full animate-pulse-dot ${className}`}
      style={{ backgroundColor: t.fg }}
    />
  )
}
