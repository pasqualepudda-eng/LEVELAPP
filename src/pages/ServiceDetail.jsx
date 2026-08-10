import { services, cases, process } from '../data/content'
import PageHeader from '../components/PageHeader'
import CodeWindow from '../components/CodeWindow'
import CaseCard from '../components/CaseCard'
import CtaBand from '../components/CtaBand'
import FaqList from '../components/FaqList'
import NotFound from './NotFound'
import { Link } from '../lib/router'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'

/** Pagina di dettaglio di un servizio: /servizi/{slug} */
export default function ServiceDetail({ slug }) {
  const service = services.find((s) => s.slug === slug)
  if (!service) return <NotFound />

  const related = cases.find((c) => c.id === service.caseSlug)
  const others = services.filter((s) => s.slug !== slug)

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Servizi', to: '/servizi' },
          { label: service.title },
        ]}
        eyebrow={service.title}
        title={service.hero}
        lead={service.intro}
        accent={service.accent}
        aside={
          <Reveal delay={0.15}>
            <CodeWindow filename={service.code.filename} code={service.code.lines} />
          </Reveal>
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button to="/contatti" variant="primary" size="lg" trailingIcon="arrowRight">
            Parliamo del tuo caso
          </Button>
          {service.tempi && (
            <span
              className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium"
              style={{
                color: service.accent,
                borderColor: `color-mix(in oklab, ${service.accent} 40%, transparent)`,
                backgroundColor: `color-mix(in oklab, ${service.accent} 10%, transparent)`,
              }}
            >
              <Icon name="clock" size={14} />
              {service.tempi}
            </span>
          )}
          <div className="flex flex-wrap gap-1.5">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </PageHeader>

      {/* Cosa ottieni */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {service.highlights.map((highlight, i) => (
              <RevealItem key={highlight.title}>
                <article
                  className="card h-full overflow-hidden"
                  style={{ '--accent': service.accent }}
                >
                  <div className="accent-rule" />
                  <div className="p-6">
                    <span className="font-mono text-sm text-fg-subtle">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="mt-3 text-lg font-semibold">{highlight.title}</h2>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-fg-muted">
                      {highlight.body}
                    </p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Deliverable + stack */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="display text-3xl sm:text-4xl">Cosa ti resta in mano</h2>
            <p className="mt-4 text-fg-muted">
              Alla fine del progetto non ricevi solo un software che funziona: ricevi tutto quello
              che serve per farlo vivere anche senza di noi.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-lg border border-line bg-canvas-subtle px-4 py-3 text-[15px]"
                >
                  <Icon
                    name="check"
                    size={15}
                    className="mt-1 shrink-0"
                    style={{ color: service.accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-fg">
                <Icon name="terminal" size={15} className="text-fg-muted" />
                Stack tipico
              </h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {service.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-line bg-canvas px-2.5 py-1 font-mono text-xs text-fg-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 flex items-center gap-2 text-sm font-semibold text-fg">
                <Icon name="clock" size={15} className="text-fg-muted" />
                Come procediamo
              </h3>
              <ol className="mt-4 space-y-3">
                {process.map((phase) => (
                  <li key={phase.step} className="flex gap-3 text-sm">
                    <span className="font-mono text-fg-subtle">{phase.step}</span>
                    <span>
                      <span className="text-fg">{phase.title}</span>
                      <span className="block text-xs text-fg-muted">{phase.duration}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <Button to="/contatti" variant="default" size="lg" className="mt-8 w-full">
                Parliamo del tuo progetto
              </Button>
            </div>
          </Reveal>
        </div>
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

      {/* Altri servizi */}
      <section className="border-b border-line-muted py-16">
        <div className="shell">
          <h2 className="text-sm font-semibold text-fg-muted">Altri servizi</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  to={`/servizi/${other.slug}`}
                  className="card card-hover flex items-center gap-3 p-4 text-sm"
                >
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas"
                    style={{ color: other.accent }}
                  >
                    <Icon name={other.icon} size={16} />
                  </span>
                  <span className="min-w-0 flex-1 truncate font-medium text-fg">{other.title}</span>
                  <Icon name="arrowRight" size={14} className="shrink-0 text-fg-subtle" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
