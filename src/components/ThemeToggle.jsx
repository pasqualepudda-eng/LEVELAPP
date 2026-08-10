import { useColorMode } from '../lib/theme'
import Icon from './ui/Icon'

/**
 * Selettore del tema, come l'"Appearance" di GitHub: tre stati espliciti —
 * chiaro, scuro e "come il sistema" — dentro un unico controllo segmentato.
 */

const OPTIONS = [
  { mode: 'light', icon: 'sun', label: 'Tema chiaro' },
  { mode: 'dark', icon: 'moon', label: 'Tema scuro' },
  { mode: 'auto', icon: 'device', label: 'Come il sistema' },
]

export default function ThemeToggle({ className = '' }) {
  const { preference, setMode } = useColorMode()

  return (
    <div
      role="group"
      aria-label="Tema del sito"
      className={`inline-flex items-center gap-0.5 rounded-full border border-line bg-canvas-subtle p-0.5 ${className}`}
    >
      {OPTIONS.map((option) => {
        const active = preference === option.mode
        return (
          <button
            key={option.mode}
            type="button"
            onClick={() => setMode(option.mode)}
            aria-pressed={active}
            title={option.label}
            className={`flex size-7 items-center justify-center rounded-full transition-colors ${
              active
                ? 'bg-canvas-overlay text-fg shadow-card ring-1 ring-line'
                : 'text-fg-muted hover:text-fg'
            }`}
          >
            <Icon name={option.icon} size={14} />
            <span className="sr-only">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
