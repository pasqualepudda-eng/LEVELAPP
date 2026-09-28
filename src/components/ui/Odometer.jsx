import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

/**
 * Contatore meccanico: ogni cifra è un rullo 0–9 che gira fino al suo posto,
 * come il contachilometri di un'auto. Le colonne partono sfalsate da destra
 * (le unità girano per prime e più a lungo), e ogni rullo fa qualche giro in
 * più prima di fermarsi con una molla, così si sente il "clic" dell'arrivo.
 *
 * Con `prefers-reduced-motion` mostra subito il numero finale.
 */

const GIRI = 2 // giri completi prima di fermarsi
const CIFRE = Array.from({ length: 10 * (GIRI + 1) }, (_, i) => i % 10)

function Rullo({ cifra, indice, totale, acceso }) {
  // Le cifre più a destra girano di più: da destra a sinistra un giro in meno.
  const dalFondo = totale - 1 - indice
  const giri = Math.max(GIRI - Math.floor(dalFondo / 2), 0)
  const arrivo = giri * 10 + cifra

  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-top">
      {/* Cifra fantasma: dà al rullo la larghezza giusta */}
      <span className="invisible">{cifra}</span>
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={{ y: '0em' }}
        animate={{ y: acceso ? `-${arrivo}em` : '0em' }}
        transition={{
          type: 'spring',
          stiffness: 38,
          damping: 13,
          mass: 1,
          delay: dalFondo * 0.09,
        }}
      >
        {CIFRE.map((c, i) => (
          <span key={i} className="block h-[1em] leading-[1em]">
            {c}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

export default function Odometer({ value, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const ridotto = useReducedMotion()
  const acceso = useInView(ref, { once: true, amount: 0.6 })
  const cifre = String(Math.round(value)).split('').map(Number)

  if (ridotto) {
    return (
      <span className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
        {prefix}
        {value}
        {suffix}
      </span>
    )
  }

  return (
    <span
      ref={ref}
      className={`inline-flex items-start leading-none ${className}`}
      style={{ fontVariantNumeric: 'tabular-nums' }}
      aria-label={`${prefix}${value}${suffix}`}
    >
      <span aria-hidden="true" className="inline-flex">
        {prefix}
        {cifre.map((c, i) => (
          <Rullo key={i} cifra={c} indice={i} totale={cifre.length} acceso={acceso} />
        ))}
        <motion.span
          initial={{ opacity: 0, y: '0.3em' }}
          animate={acceso ? { opacity: 1, y: '0em' } : {}}
          transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {suffix}
        </motion.span>
      </span>
    </span>
  )
}
