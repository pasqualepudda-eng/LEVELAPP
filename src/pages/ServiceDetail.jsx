import { motion } from 'motion/react'
import { services, cases, process } from '../data/content'
import LiveCode from '../components/LiveCode'
import ServiziFisarmonica from '../components/ServiziFisarmonica'
import CaseCard from '../components/CaseCard'
import CtaBand from '../components/CtaBand'
import FaqList from '../components/FaqList'
import NotFound from './NotFound'
import { Link } from '../lib/router'
import { EASE } from '../lib/motion'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'

/** Pagina di dettaglio di un servizio: /servizi/{slug} */
export default function ServiceDetail({ slug }) {
  const service = services.find((s) => s.slug === slug)
  if (!service) return <NotFound />

  const related = cases.find((c) => c.id === service.caseSlug)
  const others = services.filter((s) => s.slug !== slug)

  /* Dalla frase dei tempi ("Online in 5 giorni", "…in 4 settimane") tiriamo
     fuori il numero da mettere in grande e la sua unità. */
  const [, numero = '4', unita = 'settimane'] = service.tempi?.match(/(\d+)\s+(giorni|settimane)/i) ?? []

  return (
    <>
      {/* Testata: il tempo di consegna è il soggetto. Il numero occupa la
          scena, il titolo gli sta accanto e sotto scorre la sequenza delle
          fasi di questo servizio. */}
      <header className="relative overflow-hidden border-b border-line-muted">
        <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-25" />
        <div
          className="hero-glow pointer-events-none absolute inset-x-0 -top-40 h-96 opacity-60"
          style={{ '--color-glow-1': service.accent }}
        />

        <div className="shell relative pt-10 pb-16 md:pt-14 md:pb-20">
          <Reveal as="nav" className="flex items-center gap-2 text-sm text-fg-muted">
            <Link to="/" className="-my-2 py-2 hover:text-fg">
              Home
            </Link>
            <Icon name="chevronRight" size={12} className="text-fg-subtle" />
            <Link to="/servizi" className="-my-2 py-2 hover:text-fg">
              Servizi
            </Link>
            <Icon name="chevronRight" size={12} className="text-fg-subtle" />
            <span className="text-fg">{service.title}</span>
          </Reveal>

          {/* Il numero e il titolo, sulla stessa riga di base */}
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
            <Reveal className="shrink-0">
              <p
                className="display leading-[0.8] tracking-tight"
                style={{ color: service.accent, fontSize: 'clamp(5.5rem, 13vw, 11rem)' }}
              >
                {numero}
              </p>
              <p className="mt-2 font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase">
                {unita} al primo rilascio
              </p>
            </Reveal>

            <Reveal delay={0.06} className="md:pb-3">
              <h1 className="display max-w-2xl text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
                {service.hero}
              </h1>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16">
            <div>
              <Reveal as="p" className="text-lg leading-relaxed text-fg-muted">
                {service.intro}
              </Reveal>

              <Reveal delay={0.08} className="mt-8 flex flex-wrap items-center gap-3">
                <Button to="/contatti" variant="primary" size="lg" trailingIcon="arrowRight">
                  Parliamo del tuo caso
                </Button>
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg-muted"
                  >
                    {tag}
                  </span>
                ))}
              </Reveal>

              {/* Le altre aree, in coda: si salta senza tornare all'elenco */}
              <Reveal delay={0.14} className="mt-10 border-t border-line-muted pt-6">
                <p className="font-mono text-mini tracking-[0.18em] text-fg-subtle uppercase">
                  altre aree
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .map((s) => (
                      <Link
                        key={s.slug}
                        to={`/servizi/${s.slug}`}
                        className="group flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
                      >
                        <Icon name={s.icon} size={13} style={{ color: s.accent }} />
                        {s.title}
                      </Link>
                    ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} y={28} className="relative lg:-mr-[calc((100vw-min(100vw,80rem))/2+3rem)]">
              <div className="spot-glow pointer-events-none absolute -inset-x-16 -top-12 bottom-0" />
              <LiveCode
                filename={service.code.filename}
                code={service.code.lines}
                accent={service.accent}
                className="relative shadow-float"
              />
            </Reveal>
          </div>
        </div>
      </header>

      {/* Cosa ottieni: righe alternate, con il numero in grande a contorno che
          scavalca il filetto. Nessuna card — le card le ha già mezzo sito. */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          {service.highlights.map((highlight, i) => {
            const destra = i % 2 === 1
            return (
              <motion.article
                key={highlight.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="group relative border-t border-line-muted py-12 first:border-t-0 first:pt-0 md:py-16"
              >
                {/* Filetto che si accende da sinistra */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="absolute top-0 right-0 left-0 h-px origin-left"
                  style={{ backgroundColor: service.accent, opacity: i === 0 ? 0 : 0.45 }}
                />

                <div
                  className={`flex flex-col gap-6 md:items-center md:gap-14 ${
                    destra ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  {/* Il numero, a contorno e fuori scala */}
                  <span
                    aria-hidden="true"
                    className="display text-outline shrink-0 leading-none transition-all duration-500 group-hover:opacity-100"
                    style={{
                      fontSize: 'clamp(4.5rem, 10vw, 9rem)',
                      WebkitTextStrokeColor: `color-mix(in oklab, ${service.accent} 55%, transparent)`,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className={`max-w-2xl ${destra ? 'md:text-right' : ''}`}>
                    <h2 className="display text-2xl leading-snug md:text-3xl">{highlight.title}</h2>
                    <p className="mt-4 text-[17px] leading-relaxed text-fg-muted">
                      {highlight.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      {/* Le quattro fasi, in fila */}
      <section className="border-b border-line-muted py-16">
        <Reveal className="shell">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line-muted pb-6">
            <p className="font-mono text-mini tracking-[0.2em] text-fg-subtle uppercase">
              stack tipico
            </p>
            <div className="flex flex-wrap gap-1.5">
              {service.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-line px-2.5 py-1 font-mono text-mini text-fg-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-10 font-mono text-mini tracking-[0.2em] text-fg-subtle uppercase">
            come procediamo
          </p>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((fase, i) => (
              <li key={fase.step} className="relative pt-5">
                <span
                  className="absolute top-0 left-0 h-0.5 w-8 rounded-full"
                  style={{ backgroundColor: service.accent, opacity: 1 - i * 0.18 }}
                />
                <p className="font-mono text-mini text-fg-subtle">{fase.step}</p>
                <p className="mt-1.5 font-semibold text-fg">{fase.title}</p>
                <p className="mt-1 text-[13px] text-fg-muted">{fase.duration}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Progetto correlato */}
      {related && (
        <section className="border-b border-line-muted py-20 md:py-24">
          <div className="shell grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <p
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: service.accent }}
              >
                <span
                  className="inline-block h-px w-6"
                  style={{ backgroundColor: service.accent }}
                />
                Progetto correlato
              </p>
              <h2 className="display mt-4 text-3xl sm:text-4xl">
                Com'è andata in un'azienda come la tua
              </h2>
              <p className="mt-4 text-fg-muted">
                {related.client} — {related.sector}. Il problema di partenza, la soluzione e i
                numeri dopo il rilascio.
              </p>
              <Button
                to={`/progetti/${related.id}`}
                variant="default"
                size="lg"
                trailingIcon="arrowRight"
                className="mt-6"
              >
                Leggi il case study
              </Button>
            </Reveal>

            <Reveal delay={0.08}>
              <CaseCard item={related} />
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQ del servizio */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell-narrow">
          <h2 className="display text-3xl sm:text-4xl">Domande su questo servizio</h2>
          <FaqList items={service.faqs} defaultOpen={0} className="mt-8" />
        </div>
      </section>

      {/* Le altre aree, con la stessa fisarmonica della home */}
      <section className="border-b border-line-muted py-16 md:py-20">
        <div className="shell">
          <Reveal as="h2" className="display display-section max-w-2xl">
            Le altre aree
          </Reveal>
          <Reveal as="p" delay={0.06} className="mt-4 max-w-xl text-fg-muted">
            Spesso un progetto ne tocca più di una: apri un’area per vedere cosa comprende e in
            quanto tempo va in produzione.
          </Reveal>

          <ServiziFisarmonica servizi={others} className="mt-10" />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
