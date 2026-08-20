import { useEffect, useRef, useState } from 'react'
import FoglioPreventivo from './FoglioPreventivo'

/**
 * Anteprima fedele: il foglio viene disegnato alla larghezza vera di un A4
 * (794px a 96dpi) e poi rimpicciolito con una scala fino a entrare nella
 * colonna. Così l'impaginazione che vedi è quella che esce dalla stampante,
 * non un'approssimazione riflusso.
 */
const A4 = 794

export default function AnteprimaFoglio({ preventivo, className = '' }) {
  const contenitore = useRef(null)
  const foglio = useRef(null)
  const [scala, setScala] = useState(1)
  const [altezza, setAltezza] = useState(0)

  useEffect(() => {
    const misura = () => {
      const larghezza = contenitore.current?.clientWidth ?? A4
      const s = Math.min(1, larghezza / A4)
      setScala(s)
      setAltezza((foglio.current?.scrollHeight ?? 0) * s)
    }

    misura()
    const osservatore = new ResizeObserver(misura)
    if (contenitore.current) osservatore.observe(contenitore.current)
    if (foglio.current) osservatore.observe(foglio.current)
    return () => osservatore.disconnect()
  }, [preventivo])

  return (
    <div ref={contenitore} className={`overflow-hidden ${className}`} style={{ height: altezza }}>
      <div
        ref={foglio}
        className="foglio-a4"
        style={{ transform: `scale(${scala})`, transformOrigin: 'top left' }}
      >
        <FoglioPreventivo preventivo={preventivo} />
      </div>
    </div>
  )
}
