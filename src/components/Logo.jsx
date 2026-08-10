/**
 * Marchio LevelApp: tre barre di livello crescenti dentro uno squircle,
 * monocromatico come le chrome di sistema. Il colore lo eredita dal testo.
 */
export default function Logo({ size = 32, withWordmark = false, className = '' }) {
  const mark = (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      {/* Le barre sono "buchi" nello squircle: prendono il colore del fondo
          pagina, così il marchio funziona sia sul tema chiaro sia sullo scuro. */}
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="9.5" fill="currentColor" />
      <rect x="7" y="18" width="4.5" height="7" rx="1.5" fill="var(--color-canvas)" />
      <rect x="13.75" y="13" width="4.5" height="12" rx="1.5" fill="var(--color-canvas)" />
      <rect x="20.5" y="7" width="4.5" height="18" rx="1.5" fill="var(--color-canvas)" />
    </svg>
  )

  if (!withWordmark) return <span className={className}>{mark}</span>

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {mark}
      <span className="text-[17px] font-semibold tracking-tight">LevelApp</span>
    </span>
  )
}
