import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { usePrefersReducedMotion } from '../../lib/useMediaQuery'

/**
 * Testo che si accende parola per parola mentre scorre nello schermo: la
 * lettura segue il pollice. Ogni parola parte in grigio e sfocata e arriva
 * piena quando il blocco è a metà schermo; tornando su si rispegne.
 *
 * Accetta solo testo semplice: tutto il resto viene mostrato così com'è.
 */

function Parola({ progresso, da, a, children }) {
  const opacita = useTransform(progresso, [da, a], [0.14, 1])
  const sfocatura = useTransform(progresso, [da, a], ['blur(6px)', 'blur(0px)'])
  const y = useTransform(progresso, [da, a], ['0.18em', '0em'])
  return (
    <motion.span className="inline-block" style={{ opacity: opacita, filter: sfocatura, y }}>
      {children}
    </motion.span>
  )
}

export default function ScrollWords({ children, as: Tag = 'p', className = '' }) {
  const ref = useRef(null)
  const ridotto = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'start 0.4'] })

  if (ridotto || typeof children !== 'string') {
    return (
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    )
  }

  const parole = children.split(' ')
  // Ogni parola si accende in una finestra che si sovrappone alle vicine;
  // l'ultima finisce esattamente a fine corsa.
  const finestra = Math.min(0.35, 2.5 / parole.length)
  const passo = (1 - finestra) / Math.max(parole.length - 1, 1)

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {parole.map((parola, i) => (
          <span key={i}>
            <Parola progresso={scrollYProgress} da={i * passo} a={i * passo + finestra}>
              {parola}
            </Parola>
            {i < parole.length - 1 && ' '}
          </span>
        ))}
      </span>
    </Tag>
  )
}
