import { Children, useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import Marquee from './Marquee'
import { usePrefersReducedMotion } from '../../lib/useMediaQuery'

/**
 * Fascia che scorre legata allo scroll della pagina: ferma la pagina, scorre
 * piano; scorri veloce e accelera, si inclina nel verso del movimento e, se
 * torni su, inverte la marcia. Col puntatore sopra rallenta quasi a fermarsi.
 *
 * Con `prefers-reduced-motion` torna la fascia normale a velocità costante.
 */

const avvolgi = (min, max, v) => {
  const ampiezza = max - min
  return ((((v - min) % ampiezza) + ampiezza) % ampiezza) + min
}

function Fascia({ children, speed, gap, className }) {
  const items = Children.toArray(children)
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocita = useVelocity(scrollY)
  const morbida = useSpring(velocita, { damping: 50, stiffness: 400 })
  const spinta = useTransform(morbida, [-1000, 0, 1000], [-5, 0, 5], { clamp: false })
  const inclinazione = useTransform(morbida, [-2500, 0, 2500], [7, 0, -7])
  const x = useTransform(base, (v) => `${avvolgi(-50, 0, v)}%`)

  const verso = useRef(1)
  const lento = useRef(false)
  const freno = useSpring(1, { stiffness: 120, damping: 20 })

  useAnimationFrame((_, delta) => {
    freno.set(lento.current ? 0.12 : 1)
    let passo = verso.current * speed * (delta / 1000)
    const s = spinta.get()
    if (s < 0) verso.current = -1
    else if (s > 0) verso.current = 1
    passo += verso.current * passo * s
    base.set(base.get() - passo * freno.get())
  })

  const Traccia = ({ nascosta }) => (
    <div
      className="flex shrink-0 items-center"
      style={{ gap, paddingRight: gap }}
      aria-hidden={nascosta || undefined}
    >
      {items}
    </div>
  )

  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      onMouseEnter={() => (lento.current = true)}
      onMouseLeave={() => (lento.current = false)}
    >
      <motion.div className="flex w-max will-change-transform" style={{ x, skewX: inclinazione }}>
        <Traccia />
        <Traccia nascosta />
      </motion.div>
    </div>
  )
}

/** `speed`: percentuale della traccia percorsa al secondo a pagina ferma. */
export default function VelocityMarquee({ speed = 0.8, gap = '3rem', className = '', children }) {
  const ridotto = usePrefersReducedMotion()
  if (ridotto) {
    return (
      <Marquee speed={70} gap={gap} className={className}>
        {children}
      </Marquee>
    )
  }
  return (
    <Fascia speed={speed} gap={gap} className={className}>
      {children}
    </Fascia>
  )
}
