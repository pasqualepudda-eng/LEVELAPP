import { cases, services } from '../data/content'
import PageHeader from '../components/PageHeader'
import CaseCard from '../components/CaseCard'
import CtaBand from '../components/CtaBand'
import NotFound from './NotFound'
import Counter from '../components/ui/Counter'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'

/** Pagina di un singolo case study: /progetti/{id} */
export default function CaseStudy({ id }) {
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
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Progetti', to: '/progetti' },
          { label: `${item.type} · ${item.client}` },
        ]}
        eyebrow={item.kicker}
        title={item.title}
        lead={item.body}
        accent={item.accent}
        aside={
          <Reveal delay={0.15}>
            <dl className="card divide-y divide-line-muted overflow-hidden">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-center justify-between gap-4 px-5 py-3">
                  <dt className="text-sm text-fg-muted">{fact.label}</dt>
                  <dd className="text-sm font-medium text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        }
      />

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

      {/* Racconto */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="space-y-12">
            <Reveal>
              <h2 className="flex items-center gap-2.5 text-2xl font-semibold">
                <Icon name="graph" size={18} style={{ color: item.accent }} />
                Il punto di partenza
              </h2>
              {item.challenge.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[17px] leading-relaxed text-fg-muted">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal>
              <h2 className="flex items-center gap-2.5 text-2xl font-semibold">
                <Icon name="rocket" size={18} style={{ color: item.accent }} />
                Cosa abbiamo costruito
              </h2>
              {item.solution.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[17px] leading-relaxed text-fg-muted">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal>
              <blockquote
                className="card card-accent p-6 md:p-8"
                style={{ '--accent': item.accent }}
              >
                <p className="text-xl leading-relaxed text-fg md:text-2xl">“{item.quote}”</p>
                <footer className="mt-5 text-sm text-fg-muted">— {item.author}</footer>
              </blockquote>
            </Reveal>
          </div>

          {/* Colonna laterale */}
          <div className="space-y-6">
            <Reveal delay={0.08}>
              <div className="card p-6">
                <h2 className="text-sm font-semibold text-fg">Risultati concreti</h2>
                <ul className="mt-4 space-y-3">
                  {item.results.map((result) => (
                    <li key={result} className="flex items-start gap-2.5 text-[15px] text-fg">
                      <Icon
                        name="check"
                        size={15}
                        className="mt-1 shrink-0"
                        style={{ color: item.accent }}
                      />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="card p-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-fg">
                  <Icon name="terminal" size={15} className="text-fg-muted" />
                  Tecnologie usate
                </h2>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-line bg-canvas px-2.5 py-1 font-mono text-xs text-fg-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {service && (
              <Reveal delay={0.16}>
                <div className="card p-6">
                  <h2 className="text-sm font-semibold text-fg">Servizio collegato</h2>
                  <p className="mt-2 text-[15px] text-fg-muted">{service.short}</p>
                  <Button
                    to={`/servizi/${service.slug}`}
                    variant="default"
                    size="lg"
                    trailingIcon="arrowRight"
                    className="mt-5 w-full"
                  >
                    {service.title}
                  </Button>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Altri progetti */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          <h2 className="display text-3xl">Altri progetti</h2>
          <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2">
            {others.map((other) => (
              <RevealItem key={other.id}>
                <CaseCard item={other} compact />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        title={item.cta}
        subtitle="Partiamo da un'analisi dei tuoi processi: in pochi giorni hai perimetro e architettura, in quattro settimane il primo rilascio."
      />
    </>
  )
}
