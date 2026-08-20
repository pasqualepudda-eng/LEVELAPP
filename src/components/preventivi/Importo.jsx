import { useEffect, useState } from 'react'
import { useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { euro } from '../../lib/preventivi'

/**
 * Importo che si muove: quando il totale cambia, la cifra ci arriva scorrendo
 * invece di saltare. Serve a far vedere l'effetto di uno sconto o di una voce
 * tolta, non a fare spettacolo — con `prefers-reduced-motion` scatta e basta.
 */
export default function Importo({ valore, className = '' }) {
  const ridotto = useReducedMotion()
  const mv = useMotionValue(valore)
  const molla = useSpring(mv, { stiffness: 90, damping: 20, mass: 0.6 })
  const [testo, setTesto] = useState(() => euro(valore))

  useEffect(() => {
    mv.set(valore)
  }, [valore, mv])

  useEffect(() => {
    if (ridotto) return setTesto(euro(valore))
    return molla.on('change', (v) => setTesto(euro(v)))
  }, [molla, ridotto, valore])

  return (
    <span className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {testo}
    </span>
  )
}
