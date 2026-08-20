import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { cases, services } from '../data/content'
import Counter from '../components/ui/Counter'
import { Link } from '../lib/router'
import { EASE } from '../lib/motion'
import CtaBand from '../components/CtaBand'
import NotFound from './NotFound'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'

/** Pagina di un singolo case study: /progetti/{id} */
export default function CaseStudy({ id }) {
  const articolo = useRef(null)
  const { scrollYProgress } = useScroll({
    target: articolo,
    offset: ['start 75%', 'end 60%'],
  })
  const avanzamento = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  const item = cases.find((c) => c.id === id)
  if (!item) return <NotFound />

  const others = cases.filter((c) => c.id !== id)
  const service = services.find((s) => s.caseSlug === item.id)

  const facts = [
    { label: 'Cliente', value: item.client },
    { label: 'Settore', value: item.sector },
    { label: 'Tipo', value: item.type },
    { label: 'Durata', value: item.duration },
    { label: 'Team', value: item.team },
    { label: 'Anno', value: item.year },
  ]

  return (
    <>
      {/* Intestazione: nessuna tabella in un riquadro. Il nome del cliente
          corre in grande a contorno dietro al titolo, e i dati del progetto
          diventano una targa tecnica a tutta larghezza. */}
      <header className="relative overflow-hidden border-b border-line-muted">
        <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-30" />

        {/* Il cliente, scritto enorme a contorno */}
        <span
          aria-hidden="true"
          className="display text-outline pointer-events-none absolute -top-4 right-0 hidden translate-x-[12%] text-[clamp(6rem,14vw,13rem)] leading-none whitespace-nowrap lg:block"
        >
          {item.client}
        </span>

        <div className="shell relative pt-10 pb-14 md:pt-14 md:pb-20">
          <Reveal as="nav" className="flex items-center gap-2 text-sm text-fg-muted">
            <Link to="/" className="-my-2 py-2 hover:text-fg">
              Home
            </Link>
            <Icon name="chevronRight" size={12} className="text-fg-subtle" />
            <Link to="/progetti" className="-my-2 py-2 hover:text-fg">
              Progetti
            </Link>
            <Icon name="chevronRight" size={12} className="text-fg-subtle" />
            <span className="text-fg">{item.client}</span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.04}
            className="mt-10 flex items-center gap-2 text-sm font-semibold"
            style={{ color: item.accent }}
          >
            <span className="inline-block h-px w-8" style={{ backgroundColor: item.accent }} />
            {item.type}
          </Reveal>

          <Reveal as="h1" delay={0.08} className="display display-hero-split mt-5 max-w-4xl leading-[1.04]">
            {item.title}
          </Reveal>

          <Reveal as="p" delay={0.14} className="mt-7 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {item.body}
          </Reveal>

          {/* Targa tecnica: una riga sola, valori sotto le etichette */}
          <Reveal delay={0.2} className="mt-14 border-t border-line-muted">
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {facts
                .filter((f) => f.label !== 'Cliente')
                .map((fact) => (
                  <div key={fact.label} className="border-b border-line-muted py-5 pr-6 lg:border-b-0">
                    <dt className="font-mono text-mini tracking-[0.18em] text-fg-subtle uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-[15px] leading-snug font-medium text-fg">
                      {fact.value}
                    </dd>
                  </div>
                ))}
            </dl>
          </Reveal>
        </div>
      </header>

      {/* Risultati */}
      <section className="border-b border-line-muted bg-canvas-inset py-12">
        <RevealGroup className="shell grid grid-cols-1 gap-8 sm:grid-cols-3">
          {item.metrics.map((metric) => (
            <RevealItem key={metric.label} className="text-center">
              <p className="display text-5xl" style={{ color: item.accent }}>
                <Counter value={metric.value} suffix={metric.suffix} />
              </p>
              <p className="mt-2 text-sm text-fg-muted">{metric.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Il racconto, impaginato come un articolo: tre capitoli a piena
          larghezza, una banda di numeri che li separa, e nessuna colonna di
          schede laterali — erano lo stesso riquadro ripetuto tre volte. */}
      <article ref={articolo} className="relative border-b border-line-muted">
        {/* Binario che si riempie mentre si legge */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-6 hidden w-px bg-line-muted lg:block xl:left-[max(1.5rem,calc((100vw-80rem)/2-1.5rem))]">
          <motion.span
            style={{ scaleY: avanzamento }}
            className="block h-full w-px origin-top"
            aria-hidden="true"
          >
            <span className="block h-full w-px" style={{ backgroundColor: item.accent }} />
          </motion.span>
        </div>

        {/* Capitolo 01 — il problema */}
        <section className="border-b border-line-muted py-20 md:py-24">
          <div className="shell grid gap-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <p className="display text-6xl text-danger opacity-40">01</p>
              <p className="mt-2 font-mono text-mini tracking-wide text-fg-subtle uppercase">
                il problema
              </p>
            </Reveal>

            <div className="max-w-3xl">
              <Reveal as="h2" className="display display-sub">
                Com’era prima
              </Reveal>
              {item.challenge.map((paragrafo) => (
                <Reveal key={paragrafo} as="p" className="mt-5 text-[19px] leading-relaxed text-fg-muted">
                  {paragrafo}
                </Reveal>
              ))}

              {/* Gli strumenti che c'erano al posto del software */}
              <Reveal className="mt-8 flex flex-wrap gap-2">
                {['Excel', 'Email', 'WhatsApp', 'Carta', 'Gestionale storico'].map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-dashed border-line px-2.5 py-1 font-mono text-mini text-fg-subtle"
                  >
                    {s}
                  </span>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* Banda dei numeri, a piena larghezza e col colore del progetto */}
        <section
          className="border-b border-line-muted py-14"
          style={{
            backgroundColor: `color-mix(in oklab, ${item.accent} 8%, transparent)`,
          }}
        >
          <RevealGroup className="shell grid grid-cols-2 gap-8 md:grid-cols-4">
            {item.metrics.map((m) => (
              <RevealItem key={m.label}>
                <p className="display text-4xl sm:text-5xl" style={{ color: item.accent }}>
                  <Counter value={m.value} suffix={m.suffix} />
                </p>
                <p className="mt-2 text-sm text-fg-muted">{m.label}</p>
              </RevealItem>
            ))}
            <RevealItem>
              <p className="display text-4xl sm:text-5xl text-fg">{item.duration}</p>
              <p className="mt-2 text-sm text-fg-muted">tempo di rilascio</p>
            </RevealItem>
          </RevealGroup>
        </section>

        {/* Capitolo 02 — la soluzione */}
        <section className="border-b border-line-muted py-20 md:py-24">
          <div className="shell grid gap-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <p className="display text-6xl opacity-40" style={{ color: item.accent }}>
                02
              </p>
              <p className="mt-2 font-mono text-mini tracking-wide text-fg-subtle uppercase">
                la soluzione
              </p>
            </Reveal>

            <div className="max-w-3xl">
              <Reveal as="h2" className="display display-sub">
                Cosa abbiamo costruito
              </Reveal>
              {item.solution.map((paragrafo) => (
                <Reveal key={paragrafo} as="p" className="mt-5 text-[19px] leading-relaxed text-fg-muted">
                  {paragrafo}
                </Reveal>
              ))}

              <Reveal className="mt-8 flex flex-wrap items-center gap-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line px-3 py-1 font-mono text-mini text-fg-muted"
                  >
                    {tech}
                  </span>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* Capitolo 03 — cosa è cambiato */}
        <section className="py-20 md:py-24">
          <div className="shell grid gap-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <p className="display text-6xl text-success opacity-40">03</p>
              <p className="mt-2 font-mono text-mini tracking-wide text-fg-subtle uppercase">
                il risultato
              </p>
            </Reveal>

            <div className="max-w-4xl">
              <Reveal as="h2" className="display display-sub">
                Cosa è cambiato
              </Reveal>

              <ul className="mt-8 border-t border-line-muted">
                {item.results.map((risultato, i) => (
                  <motion.li
                    key={risultato}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-12% 0px' }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                    className="relative flex items-start gap-4 border-b border-line-muted py-5"
                  >
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 + 0.15, ease: EASE }}
                      className="absolute bottom-0 left-0 h-px w-full origin-left"
                      style={{ backgroundColor: item.accent, opacity: 0.5 }}
                    />
                    <Icon
                      name="check"
                      size={18}
                      className="mt-1 shrink-0"
                      style={{ color: item.accent }}
                    />
                    <span className="text-[19px] leading-snug text-fg">{risultato}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Citazione, quando il cliente ce l'ha data */}
              {item.quote && (
                <Reveal>
                  <figure className="mt-12 border-l-2 pl-6" style={{ borderColor: item.accent }}>
                    <blockquote className="display text-2xl leading-snug text-fg md:text-3xl">
                      “{item.quote}”
                    </blockquote>
                    {item.author && (
                      <figcaption className="mt-4 text-sm text-fg-muted">— {item.author}</figcaption>
                    )}
                  </figure>
                </Reveal>
              )}

              {/* Chiusura: il sito del prodotto e il servizio collegato */}
              <Reveal className="mt-12 flex flex-wrap items-center gap-3">
                {item.link && (
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-fg-subtle"
                  >
                    <Icon name="globe" size={15} style={{ color: item.accent }} />
                    {item.link.label}
                    <Icon name="arrowUpRight" size={14} className="text-fg-subtle" />
                  </a>
                )}
                {service && (
                  <Button to={`/servizi/${service.slug}`} variant="default" size="md" trailingIcon="arrowRight">
                    {service.title}
                  </Button>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      </article>

      {/* Altri progetti come pellicola: si scorre di lato, una lastra per
          progetto, con il numero in grande e i bordi sfumati. Niente griglia
          di card — quella è già la pagina Progetti. */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell flex items-end justify-between gap-4">
          <h2 className="display text-3xl">Altri progetti</h2>
          <p className="hidden font-mono text-mini text-fg-subtle sm:block">
            scorri di lato →
          </p>
        </div>

        <div className="mask-fade-x mt-10">
          <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1rem,calc((100vw-80rem)/2))] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {others.map((altro, i) => (
              <li key={altro.id} className="w-[20rem] shrink-0 snap-start sm:w-[24rem]">
                <Link
                  to={`/progetti/${altro.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-canvas p-6 transition-all duration-500 hover:-translate-y-1"
                  style={{ '--accent': altro.accent }}
                >
                  {/* Tinta che entra dal basso al passaggio */}
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-0 transition-all duration-500 group-hover:h-full"
                    style={{
                      background: `linear-gradient(0deg, color-mix(in oklab, ${altro.accent} 14%, transparent), transparent)`,
                    }}
                  />

                  <span className="relative flex items-baseline justify-between">
                    <span className="display text-4xl opacity-25 transition-opacity duration-500 group-hover:opacity-60" style={{ color: altro.accent }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-mini text-fg-subtle">{altro.year}</span>
                  </span>

                  <span className="relative mt-6 block text-mini font-semibold tracking-wide uppercase" style={{ color: altro.accent }}>
                    {altro.type}
                  </span>

                  <span className="relative mt-2 block text-lg leading-snug font-semibold text-fg">
                    {altro.title}
                  </span>

                  <span className="relative mt-3 block flex-1 text-sm leading-relaxed text-fg-muted">
                    {altro.client} · {altro.sector}
                  </span>

                  <span className="relative mt-6 flex items-center gap-1.5 text-sm font-semibold text-fg">
                    Leggi
                    <Icon
                      name="arrowRight"
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={item.cta}
        subtitle="Partiamo da un'analisi dei tuoi processi: in pochi giorni hai perimetro e architettura, in quattro settimane il primo rilascio."
      />
    </>
  )
}
