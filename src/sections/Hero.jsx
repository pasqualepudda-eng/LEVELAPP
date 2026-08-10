import { motion } from 'motion/react'
import { company, heroBullets, heroStats } from '../data/content'
import AppWindow from '../components/AppWindow'
import EmailSignup from '../components/EmailSignup'
import Counter from '../components/ui/Counter'
import Icon from '../components/ui/Icon'
import { StatusDot } from '../components/ui/Label'
import { EASE } from '../lib/motion'

/**
 * Hero della home, impaginata come quella di github.com: annuncio a pillola,
 * titolo display centrato, sottotitolo, campo email attaccato all'azione
 * primaria, azione secondaria testuale e mockup di prodotto sotto il glow.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line-muted">
      <div className="hero-glow pointer-events-none absolute inset-x-0 -top-48 h-[36rem] opacity-90" />
      <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-40" />

      <div className="shell relative pt-16 pb-0 text-center md:pt-24">
        {/* Annuncio */}
        <motion.a
          href="#/servizi/prodotto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas-subtle py-1 pr-3 pl-1.5 text-sm text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
        >
          <span className="flex items-center gap-1.5 rounded-full bg-canvas-overlay px-2.5 py-0.5 text-xs font-medium text-fg ring-1 ring-line">
            <StatusDot tone="success" />
            Novità
          </span>
          Hai un’idea? La portiamo online in quattro settimane
          <Icon name="arrowRight" size={14} />
        </motion.a>

        {/* Titolo */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          className="display display-hero mx-auto mt-7 max-w-5xl"
        >
          Il tuo processo, la tua idea,
          <br />
          <span className="text-gradient">il tuo software</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl"
        >
          Costruiamo software per chi vuole togliere attrito ai propri processi e per chi ha
          un’idea da mettere in produzione. In quattro settimane è online: codice esclusivo,
          scritto solo per te e mai rivenduto a nessun altro.
        </motion.p>

        {/* Azioni: campo email + primaria, secondaria testuale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
          className="mt-9 flex flex-col items-center gap-4"
        >
          <EmailSignup />
          <SecondaryAction />
        </motion.div>

        {/* Garanzie */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-fg-muted"
        >
          {heroBullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-1.5">
              <Icon name="check" size={14} className="text-success" />
              {bullet}
            </li>
          ))}
        </motion.ul>

        {/* Numeri */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
          className="mx-auto mt-12 grid max-w-2xl grid-cols-3 divide-x divide-line-muted rounded-xl border border-line bg-canvas-subtle py-5"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="px-3">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="display block text-3xl text-fg sm:text-4xl">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </span>
                <span className="mt-1 block text-xs text-fg-muted sm:text-sm">{stat.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Prodotto */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="spot-glow pointer-events-none absolute -inset-x-24 -top-16 bottom-0" />
          <AppWindow className="relative" />
          {/* Sfumatura che fonde il mockup col bordo inferiore della sezione */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-canvas to-transparent" />
        </motion.div>

        <p className="sr-only">
          {company.name} — {company.payoff}
        </p>
      </div>
    </section>
  )
}

/** Azione secondaria testuale, come il "Try GitHub Copilot" della hero. */
function SecondaryAction() {
  return (
    <a
      href="#/progetti"
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
    >
      Guarda i progetti già rilasciati
      <Icon
        name="arrowRight"
        size={14}
        className="transition-transform group-hover:translate-x-0.5"
      />
    </a>
  )
}
