import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { company } from '../data/content'
import EmailSignup from '../components/EmailSignup'
import ParticleTitle from '../components/ParticleTitle'
import Icon from '../components/ui/Icon'
import { EASE } from '../lib/motion'
import { usePrefersReducedMotion } from '../lib/useMediaQuery'

/**
 * Hero cinematografica: fondo scuro in entrambi i temi, poche cose in pagina,
 * e tutta l'innovazione nel comportamento invece che nel numero di elementi.
 *
 * - lo sfondo è vivo: tre macchie di colore si muovono lentissime (`.aurora`)
 * - il reticolo si illumina solo attorno al puntatore (`.grid-spot`)
 * - la seconda riga del titolo si "decodifica" al caricamento
 * - la finestra del gestionale entra inclinata e si raddrizza scorrendo
 *
 * Con `prefers-reduced-motion` restano solo le dissolvenze.
 */

/* Quello che costruiamo, scritto in grande dietro alla hero. */
const COSE = ['gestionali', 'portali', 'e-commerce', 'app mobile', 'assistenti AI', 'MVP']

export default function Hero() {
  const sezione = useRef(null)
  const ridotto = usePrefersReducedMotion()
  const [particelle, setParticelle] = useState(false)

  // Le particelle costano: solo su schermi larghi e se il movimento è gradito.
  useEffect(() => {
    if (ridotto) return setParticelle(false)
    const mq = window.matchMedia('(min-width: 768px)')
    const aggiorna = () => setParticelle(mq.matches)
    aggiorna()
    mq.addEventListener('change', aggiorna)
    return () => mq.removeEventListener('change', aggiorna)
  }, [ridotto])

  const { scrollYProgress } = useScroll({
    target: sezione,
    offset: ['start start', 'end start'],
  })
  // La fascia di parole scorre insieme alla pagina, non da sola.
  const scorrimento = useTransform(scrollYProgress, [0, 1], ['0%', '-28%'])

  /* Posizione del puntatore per la luce sul reticolo. */
  function illumina(event) {
    if (ridotto) return
    const r = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - r.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - r.top}px`)
  }

  return (
    <section
      ref={sezione}
      onPointerMove={illumina}
      className="on-dark relative overflow-hidden border-b border-line-muted"
    >
      {/* Sfondo vivo */}
      <div aria-hidden="true" className="aurora">
        <span />
        <span />
        <span />
      </div>
      {/* Reticolo di base + reticolo acceso attorno al cursore */}
      <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-25" />
      <div className="grid-lines grid-spot pointer-events-none absolute inset-0 opacity-90" />

      {/* Impianto tipografico: il titolo è la scena, e sotto scorrono in
          controluce le cose che costruiamo. Nessun mockup: la prova del lavoro
          arriva subito dopo, nelle sezioni che seguono. */}
      <div className="shell relative pt-24 pb-16 md:pt-32 md:pb-20">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-36 -left-2 hidden font-mono text-mini tracking-[0.25em] text-fg-subtle uppercase xl:block"
          style={{ writingMode: 'vertical-rl' }}
        >
          Software house
        </span>

        {/* Il titolo: particelle da 768px in su, testo pieno sotto.
            La versione leggibile resta comunque nella pagina per screen
            reader e motori di ricerca. */}
        <h1 className="sr-only">Il software che ti serve, in quattro settimane</h1>

        {particelle ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE }}
            aria-hidden="true"
            className="-mx-2"
          >
            <ParticleTitle
              righe={['Il software', 'che ti serve,', 'in quattro settimane']}
              colori={['var(--color-fg)', 'var(--color-fg)', '#7aa7ff']}
              className="block h-[clamp(13rem,30vw,26rem)] w-full"
            />
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            aria-hidden="true"
            className="display display-hero max-w-5xl leading-[0.98]"
          >
            Il software
            <br />
            che ti serve,
            <br />
            <span className="text-gradient">in quattro settimane</span>
          </motion.p>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: EASE }}
            className="max-w-md text-lg leading-relaxed text-fg-muted"
          >
            Gestionali, piattaforme, siti e AI applicata. Codice esclusivo, scritto sul tuo modo di
            lavorare e intestato alla tua azienda.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.26, ease: EASE }}
            className="flex flex-col items-start gap-5 lg:items-end"
          >
            <EmailSignup />
            <a
              href="#/progetti"
              className="group inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              Guarda i progetti già rilasciati
              <Icon
                name="arrowRight"
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Le cose che costruiamo, in controluce: scorrono con la pagina */}
      <div className="relative overflow-hidden pb-10">
        <motion.div
          style={{ x: scorrimento }}
          className="flex w-max gap-10 will-change-transform"
          aria-hidden="true"
        >
          {[...COSE, ...COSE].map((cosa, i) => (
            <span
              key={`${cosa}-${i}`}
              className="display text-outline text-[clamp(3rem,9vw,7rem)] leading-none whitespace-nowrap"
            >
              {cosa}
            </span>
          ))}
        </motion.div>
      </div>

      <p className="sr-only">
        {company.name} — {company.payoff}
      </p>
    </section>
  )
}
