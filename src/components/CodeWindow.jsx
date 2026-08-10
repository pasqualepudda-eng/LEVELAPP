import { tokenize, TOKEN_COLORS } from '../lib/highlight'

/**
 * Finestra di codice: chrome con tab, numeri di riga e colori del tema.
 * Il markup è decorativo (`aria-hidden`), quindi non sporca la lettura a voce.
 * L'evidenziazione arriva da lib/highlight.js, condivisa col gioco del bug.
 */

export default function CodeWindow({
  filename = 'index.ts',
  tabs,
  code = [],
  footer,
  className = '',
  showLineNumbers = true,
}) {
  const tabList = tabs ?? [filename]

  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-canvas-inset ${className}`}
      aria-hidden="true"
    >
      {/* Chrome */}
      <div className="flex items-center gap-3 border-b border-line bg-canvas-subtle px-3 py-2">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-line" />
          <span className="size-3 rounded-full bg-line" />
          <span className="size-3 rounded-full bg-line" />
        </div>
        <div className="flex min-w-0 gap-1 overflow-hidden">
          {tabList.map((tab, i) => (
            <span
              key={tab}
              className={`truncate rounded-md px-2.5 py-1 font-mono text-xs ${
                i === 0 ? 'bg-canvas text-fg' : 'text-fg-subtle'
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      {/* Codice */}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-6 sm:text-[13px]">
        <code>
          {code.map((line, i) => (
            // Ogni riga è già un blocco flex: aggiungere un "\n" raddoppierebbe
            // l'interlinea dentro il <pre>.
            <span key={i} className="flex">
              {showLineNumbers && (
                <span className="mr-4 w-6 shrink-0 select-none text-right text-fg-subtle">
                  {i + 1}
                </span>
              )}
              <span className="whitespace-pre">
                {tokenize(line).map((token, j) => (
                  <span key={j} style={{ color: TOKEN_COLORS[token.kind] ?? TOKEN_COLORS.plain }}>
                    {token.text}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </code>
      </pre>

      {footer && (
        <div className="flex items-center gap-2 border-t border-line bg-canvas-subtle px-4 py-2.5 font-mono text-xs text-fg-muted">
          {footer}
        </div>
      )}
    </div>
  )
}
