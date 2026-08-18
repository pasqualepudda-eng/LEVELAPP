import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { aboutStory, values, timeline, stack, stats, company } from '../data/content'
import CtaBand from '../components/CtaBand'
import ProcessSection from '../sections/ProcessSection'
import Counter from '../components/ui/Counter'
import Icon from '../components/ui/Icon'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { EASE } from '../lib/motion'
import { usePrefersReducedMotion } from '../lib/useMediaQuery'

/**
 * Azienda. Il filo della pagina è il tempo: si apre su un righello degli anni,
 * la storia si attraversa in orizzontale trascinata dallo scorrimento, i valori
 * sono le clausole di un patto firmato e lo stack è la sala macchine, a strati.
 *
 * Niente in comune con le altre pagine: qui non ci sono griglie di schede.
 */

/* Un colore per tappa: la linea del tempo cambia tinta mentre la si percorre. */
const TONI = [
  'var(--color-accent)',
  'var(--color-purple)',
  'var(--color-success)',
  'var(--color-attention)',
]

const ANNI = [2022, 2023, 2024, 2025, 2026]

/* ------------------------------------------------------------------ */

/** Righello degli anni: l'azienda misurata sul tempo che ha alle spalle. */
function Righello() {
  const passo = 12 // una tacca alta ogni anno
  const tacche = passo * (ANNI.length - 1) + 1

  return (
    <div aria-hidden="true" className="relative">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{ transformOrigin: 'left' }}
        className="flex h-8 items-end justify-between"
      >
        {Array.from({ length: tacche }, (_, i) => {
          const anno = i % passo === 0
          return (
            <span
              key={i}
              className={anno ? 'h-8 w-0.5 bg-fg-muted' : 'h-2.5 w-px bg-line'}
            />
          )
        })}
      </motion.div>

      <div className="mt-2 flex justify-between font-mono text-[11px] text-fg-subtle">
        {ANNI.map((anno) => (
          <span key={anno} className={anno === 2026 ? 'text-fg' : undefined}>
            {anno}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

/** Apertura: righello, dichiarazione, racconto e cruscotto dei numeri. */
function Apertura() {
  return (
    <section className="relative overflow-hidden border-b border-line-muted">
      <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-30" />

      <div className="shell relative pt-16 pb-14 md:pt-20 md:pb-16">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.25em] text-fg-subtle uppercase">
            Chi siamo · {company.foundedIn} {company.founded}
          </p>
          <div className="mt-6">
            <Righello />
          </div>
        </Reveal>

        <Reveal delay={0.1} as="h1" className="display display-section mt-12 max-w-4xl">
          Da due dipendenti a ventiquattro sviluppatori, senza cambiare modo di lavorare
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
          {/* Anagrafica: i fatti nudi, in colonna */}
          <Reveal delay={0.16}>
            <dl className="space-y-4 border-t border-line pt-5">
              {[
                ['Fondata', `${company.foundedIn}, ${company.founded}`],
                ['Soci', 'Pasqualino Pudda · Kayo Willian Dionizio Venturino'],
                ['Squadra', 'oltre 24 sviluppatori'],
                ['Commerciali', 'nessuno'],
              ].map(([voce, valore]) => (
                <div key={voce}>
                  <dt className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">
                    {voce}
                  </dt>
                  <dd className="mt-1 text-[15px] text-fg">{valore}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.22} className="max-w-2xl space-y-5">
            {aboutStory.map((paragrafo, i) => (
              <p
                key={paragrafo}
                className={
                  i === 0
                    ? 'text-xl leading-relaxed text-fg'
                    : 'text-[17px] leading-relaxed text-fg-muted'
                }
              >
                {paragrafo}
              </p>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Cruscotto: i numeri su una riga sola, divisi da filetti */}
      <RevealGroup className="shell relative grid grid-cols-2 border-t border-line-muted lg:grid-cols-4">
        {stats.map((stat, i) => (
          <RevealItem
            key={stat.label}
            className={`py-7 ${i % 2 === 1 ? 'border-l border-line-muted pl-6' : 'pr-6'} ${
              i < 2 ? 'border-b border-line-muted lg:border-b-0' : ''
            } ${i === 2 ? 'lg:border-l lg:border-line-muted lg:pl-6' : ''}`}
          >
            <p className="display text-4xl" style={{ color: TONI[i] }}>
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1.5 text-sm text-fg-muted">{stat.label}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}

/* ------------------------------------------------------------------ */

/** Una tappa, nella versione in colonna (mobile e movimento ridotto). */
function TappaVerticale({ tappa, tono, indice }) {
  return (
    <RevealItem as="li" className="relative border-l-2 pl-6 pb-10" style={{ borderColor: tono }}>
      <span
        className="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-canvas"
        style={{ backgroundColor: tono }}
      />
      <p className="font-mono text-sm" style={{ color: tono }}>
        {tappa.year} · 0{indice + 1}
      </p>
      <h3 className="mt-1.5 text-xl font-semibold">{tappa.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{tappa.body}</p>
      {tappa.link && <CollegamentoTappa link={tappa.link} tono={tono} />}
    </RevealItem>
  )
}

function CollegamentoTappa({ link, tono }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
      style={{ color: tono }}
    >
      {link.label}
      <Icon name="arrowUpRight" size={13} />
    </a>
  )
}

/**
 * La storia si attraversa in orizzontale: la sezione è alta quanto serve, il
 * riquadro resta fermo e le tappe scorrono di lato mentre si scende. L'anno
 * gigante sul fondo cambia insieme alla tappa.
 */
function Linea() {
  const ridotto = usePrefersReducedMotion()
  const pista = useRef(null)
  const [tappa, setTappa] = useState(0)

  const { scrollYProgress } = useScroll({ target: pista, offset: ['start start', 'end end'] })

  /* Ogni tappa si ferma davanti a chi legge per un tratto di scorrimento e poi
     scivola via: senza queste soste la corsa sarebbe un trascinamento continuo
     e nessuna tappa resterebbe mai al centro abbastanza da leggerla. */
  const soste = []
  const posizioni = []
  timeline.forEach((_, i) => {
    const centro = i / (timeline.length - 1)
    const sosta = 0.36 / (timeline.length - 1)
    soste.push(Math.max(0, centro - sosta), Math.min(1, centro + sosta))
    posizioni.push(`-${i * 74}vw`, `-${i * 74}vw`)
  })

  const x = useTransform(scrollYProgress, soste, posizioni)
  const avanzamento = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setTappa(Math.min(timeline.length - 1, Math.round(v * (timeline.length - 1))))
  })

  const tonoAttivo = TONI[tappa % TONI.length]

  /* Versione in colonna: sotto i 1024px e quando il movimento non è gradito. */
  const colonna = (
    <div className="shell py-20">
      <Reveal as="h2" className="display display-section max-w-2xl">
        Quattro anni, un passo alla volta
      </Reveal>
      <RevealGroup as="ol" className="mt-10">
        {timeline.map((t, i) => (
          <TappaVerticale key={t.year} tappa={t} tono={TONI[i % TONI.length]} indice={i} />
        ))}
      </RevealGroup>
    </div>
  )

  if (ridotto) return <section className="border-b border-line-muted">{colonna}</section>

  return (
    <section className="border-b border-line-muted">
      <div className="lg:hidden">{colonna}</div>

      {/* Corsa orizzontale */}
      <div
        ref={pista}
        className="relative hidden lg:block"
        style={{ height: `${(timeline.length + 0.4) * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          {/* Anno gigante sul fondo, cambia con la tappa */}
          <span
            aria-hidden="true"
            className="display text-outline pointer-events-none absolute right-2 -bottom-10 text-[20rem] leading-[0.75] opacity-70"
          >
            {timeline[tappa].year}
          </span>

          {/* Testata fissa: titolo e barra degli anni */}
          <div className="shell relative z-10 pt-24">
            <div className="flex items-end justify-between gap-8">
              <h2 className="display text-3xl sm:text-4xl">Quattro anni, un passo alla volta</h2>
              <p className="font-mono text-xs text-fg-subtle">
                0{tappa + 1} / 0{timeline.length} · scorri
              </p>
            </div>

            <div className="relative mt-6 h-px w-full bg-line">
              <motion.span
                className="absolute inset-y-0 left-0 block"
                style={{ width: avanzamento, backgroundColor: tonoAttivo }}
              />
              {timeline.map((t, i) => (
                <span
                  key={t.year}
                  className="absolute -top-[3px] size-[7px] rounded-full transition-colors duration-500"
                  style={{
                    left: `${(i / (timeline.length - 1)) * 100}%`,
                    marginLeft: i === timeline.length - 1 ? -7 : 0,
                    backgroundColor: i <= tappa ? tonoAttivo : 'var(--color-line)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Le tappe che scorrono di lato */}
          <motion.ol style={{ x }} className="relative z-10 flex flex-1 items-center will-change-transform">
            {timeline.map((t, i) => {
              const tono = TONI[i % TONI.length]
              const attiva = i === tappa
              return (
                <li
                  key={t.year}
                  className="w-[74vw] shrink-0 px-[max(1.5rem,calc((100vw-72rem)/2))]"
                >
                  <motion.article
                    animate={{ opacity: attiva ? 1 : 0.35, scale: attiva ? 1 : 0.94 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="max-w-2xl rounded-2xl border bg-canvas p-9"
                    style={{
                      borderColor: attiva
                        ? `color-mix(in oklab, ${tono} 45%, var(--color-line))`
                        : 'var(--color-line)',
                      boxShadow: attiva
                        ? `0 22px 60px color-mix(in oklab, ${tono} 15%, transparent)`
                        : 'none',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="display text-5xl" style={{ color: tono }}>
                        {t.year}
                      </span>
                      <span className="h-px flex-1" style={{ backgroundColor: tono, opacity: 0.4 }} />
                      <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                    </div>

                    <h3 className="mt-5 text-2xl leading-tight font-semibold">{t.title}</h3>
                    <p className="mt-3 text-[17px] leading-relaxed text-fg-muted">{t.body}</p>
                    {t.link && <CollegamentoTappa link={t.link} tono={tono} />}
                  </motion.article>
                </li>
              )
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

/** I valori come clausole di un patto: numerate, sottoscritte in fondo. */
function Patto() {
  return (
    <section id="valori" className="border-b border-line-muted py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.25em] text-fg-subtle uppercase">
              Il patto
            </p>
            <h2 className="display display-section mt-3 max-w-2xl">
              Quattro regole che non tradiamo a progetto in corso
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="font-mono text-[11px] text-fg-subtle">
            valide dal {company.founded} · rev. 2026
          </Reveal>
        </div>

        <RevealGroup as="ol" className="mt-2">
          {values.map((valore, i) => (
            <RevealItem
              key={valore.title}
              as="li"
              className="group relative grid gap-4 border-b border-line-muted py-8 transition-colors hover:bg-canvas-subtle md:grid-cols-[5rem_minmax(0,18rem)_minmax(0,1fr)] md:items-start md:gap-8"
            >
              {/* Filetto che si tira sotto la clausola al passaggio */}
              <span
                aria-hidden="true"
                className="absolute -bottom-px left-0 h-px w-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                style={{ backgroundColor: TONI[i % TONI.length] }}
              />

              <span className="display text-outline text-4xl">0{i + 1}</span>

              <h3 className="flex items-center gap-2.5 text-lg font-semibold">
                <Icon
                  name={valore.icon}
                  size={16}
                  className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: TONI[i % TONI.length] }}
                />
                {valore.title}
              </h3>

              <p className="text-[15px] leading-relaxed text-fg-muted">{valore.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
          <Icon name="verified" size={15} className="text-success" />
          <p className="font-mono text-[12px] text-fg-muted">
            sottoscritto da Pasqualino Pudda e Kayo Willian Dionizio Venturino — soci fondatori
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

/** Lo stack come sala macchine: quattro strati sovrapposti, si alzano al passaggio. */
function SalaMacchine() {
  return (
    <section id="stack" className="border-b border-line-muted py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.25em] text-fg-subtle uppercase">
              La sala macchine
            </p>
            <h2 className="display display-section mt-3">
              Rust dove serve reggere, tecnologie diffuse per il resto
            </h2>
          </Reveal>
          <Reveal delay={0.08} as="p" className="text-[17px] leading-relaxed text-fg-muted">
            Rust per i servizi che devono restare veloci e prevedibili sotto carico; attorno
            strumenti che qualsiasi software house saprebbe riprendere in mano. È la forma più
            concreta di non-lock-in.
          </Reveal>
        </div>

        <RevealGroup className="mt-14 space-y-3">
          {stack.map((strato, i) => (
            <RevealItem
              key={strato.group}
              className="group relative grid cursor-default gap-4 rounded-xl border border-line bg-canvas p-6 transition-all duration-400 hover:-translate-y-1.5 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:items-center"
              style={{ marginLeft: `${i * 1.5}rem` }}
            >
              <span
                className="absolute inset-y-0 left-0 w-1 rounded-l-xl opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                style={{ backgroundColor: TONI[i % TONI.length] }}
              />

              <div className="flex items-center gap-3 pl-3">
                <span className="font-mono text-[11px] text-fg-subtle">livello 0{i + 1}</span>
                <h3 className="text-lg font-semibold">{strato.group}</h3>
              </div>

              <ul className="flex flex-wrap gap-2 pl-3 md:justify-end">
                {strato.items.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-lg border border-line bg-canvas-subtle px-3 py-1.5 font-mono text-[13px] text-fg-muted transition-colors group-hover:text-fg"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

export default function About() {
  return (
    <>
      <Apertura />
      <Linea />
      <Patto />
      <SalaMacchine />
      <ProcessSection />
      <CtaBand
        title="Lavoriamo con poche aziende alla volta"
        subtitle="Se hai un progetto in mente, il momento giusto per parlarne è prima che diventi urgente."
      />
    </>
  )
}
