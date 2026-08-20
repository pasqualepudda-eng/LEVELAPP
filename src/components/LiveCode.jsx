import { useEffect, useRef, useState } from 'react'
import { tokenize, TOKEN_COLORS } from '../lib/highlight'
import Icon from './ui/Icon'
import { usePrefersReducedMotion } from '../lib/useMediaQuery'

/**
 * Finestra di codice che si scrive da sola: quando entra nello schermo le
 * righe compaiono una alla volta con il cursore che lampeggia, e alla fine la
 * barra in basso passa da "scrivendo" a "compilato".
 *
 * È il mockup che dice cosa facciamo — scriviamo codice — invece di essere una
 * fotografia ferma di codice già scritto.
 *
 * Con `prefers-reduced-motion` compare tutto subito, senza battitura.
 */
export default function LiveCode({ filename, code = [], accent = 'var(--color-accent)', className = '' }) {
  const riquadro = useRef(null)
  const ridotto = usePrefersReducedMotion()
  const [visibili, setVisibili] = useState(ridotto ? code.length : 0)

  useEffect(() => {
    if (ridotto) {
      setVisibili(code.length)
      return
    }

    const nodo = riquadro.current
    if (!nodo) return

    let timer
    const osservatore = new IntersectionObserver(
      ([voce]) => {
        if (!voce.isIntersecting) return
        osservatore.disconnect()

        // Le righe vuote scorrono via in fretta: sono respiro, non contenuto.
        const scrivi = (i) => {
          setVisibili(i + 1)
          if (i + 1 >= code.length) return
          timer = setTimeout(() => scrivi(i + 1), code[i + 1]?.trim() ? 150 : 60)
        }
        timer = setTimeout(() => scrivi(0), 250)
      },
      { threshold: 0.3 },
    )

    osservatore.observe(nodo)
    return () => {
      osservatore.disconnect()
      clearTimeout(timer)
    }
  }, [code, ridotto])

  const finito = visibili >= code.length

  return (
    <div
      ref={riquadro}
      aria-hidden="true"
      className={`overflow-hidden rounded-xl border border-line bg-canvas-inset ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line bg-canvas-subtle px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-line" />
          <span className="size-3 rounded-full bg-line" />
          <span className="size-3 rounded-full bg-line" />
        </div>
        <span className="rounded-md bg-canvas px-2.5 py-1 font-mono text-xs text-fg">{filename}</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-mini text-fg-subtle">
          <span
            className="size-1.5 rounded-full transition-colors duration-500"
            style={{ backgroundColor: finito ? 'var(--color-success)' : accent }}
          />
          {finito ? 'salvato' : 'in scrittura'}
        </span>
      </div>

      {/* Altezza fissa: le righe che arrivano non fanno saltare la pagina */}
      <div className="p-4 font-mono text-[12.5px] leading-6" style={{ minHeight: `${code.length * 1.5 + 2}rem` }}>
        {code.slice(0, visibili).map((riga, i) => (
          <div key={i} className="flex gap-4">
            <span className="w-5 shrink-0 text-right text-fg-subtle select-none">{i + 1}</span>
            <span className="min-w-0 flex-1 whitespace-pre">
              {riga ? (
                tokenize(riga).map((token, k) => (
                  <span key={k} style={{ color: TOKEN_COLORS[token.kind] ?? TOKEN_COLORS.plain }}>
                    {token.text}
                  </span>
                ))
              ) : (
                <>&nbsp;</>
              )}
              {/* Il cursore sta sull'ultima riga scritta */}
              {!finito && i === visibili - 1 && (
                <span
                  className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] animate-pulse"
                  style={{ backgroundColor: accent }}
                />
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-line bg-canvas-subtle px-3 py-2 font-mono text-[10.5px] text-fg-subtle">
        {finito ? (
          <>
            <Icon name="check" size={11} className="text-success" />
            compilato · nessun errore
          </>
        ) : (
          <>
            <Icon name="code" size={11} />
            {visibili}/{code.length} righe
          </>
        )}
      </div>
    </div>
  )
}
