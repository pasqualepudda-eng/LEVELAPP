import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

const format = (v, decimals) =>
  v.toLocaleString('it-IT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

/**
 * Counts up to `value` the first time it scrolls into view.
 * Uses a spring so the number decelerates instead of ticking linearly;
 * with reduced motion it simply renders the final figure.
 */
export default function Counter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 55, damping: 22, mass: 1 })
  const [display, setDisplay] = useState(() => format(0, decimals))

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, value, mv])

  useEffect(() => {
    if (reduced) return
    return spring.on('change', (v) => setDisplay(format(v, decimals)))
  }, [spring, decimals, reduced])

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      {reduced ? format(value, decimals) : display}
      {suffix}
    </span>
  )
}
