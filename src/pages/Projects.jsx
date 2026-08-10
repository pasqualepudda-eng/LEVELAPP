import { cases, stats, clients } from '../data/content'
import PageHeader from '../components/PageHeader'
import CaseCard from '../components/CaseCard'
import CtaBand from '../components/CtaBand'
import Counter from '../components/ui/Counter'
import Icon from '../components/ui/Icon'
import Marquee from '../components/ui/Marquee'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

const sectors = [
  { label: 'Metalmeccanica', count: 41 },
  { label: 'Costruzioni e impianti', count: 28 },
  { label: 'Distribuzione e retail', count: 33 },
  { label: 'Servizi professionali', count: 25 },
  { label: 'Food & beverage', count: 19 },
  { label: 'Sanità e benessere', count: 14 },
]

export default function Projects() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Progetti' }]}
        eyebrow="Progetti"
        title="Oltre 200 progetti attivi. Tre raccontati per intero."
        lead="Non una gallery di screenshot: il problema di partenza, le scelte tecniche e cosa è cambiato davvero nei numeri dell'azienda."
        accent="var(--color-purple)"
      />

      {/* Numeri */}
      <section className="border-b border-line-muted bg-canvas-inset py-12">
        <RevealGroup className="shell grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="text-center">
              <p className="display text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-fg-muted">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Case study */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((item) => (
              <RevealItem key={item.id}>
                <CaseCard item={item} />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-8">
            <p className="rounded-lg border border-line bg-canvas-subtle px-5 py-4 text-sm text-fg-muted">
              <Icon name="lock" size={14} className="mr-2 inline text-fg-subtle" />
              Molti progetti sono coperti da accordo di riservatezza: possiamo raccontarteli a voce,
              in call, con i numeri alla mano.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Settori */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Settori"
            title="Dove lavoriamo più spesso"
            subtitle="Aziende con processi specifici e reparti che devono parlarsi. Le percentuali sono sui progetti degli ultimi tre anni."
            accent="var(--color-purple)"
          />

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <RevealItem key={sector.label}>
                <div className="card p-5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-[15px] font-medium text-fg">{sector.label}</h3>
                    <span className="font-mono text-sm text-purple">{sector.count}</span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-canvas-overlay">
                    <div
                      className="h-full rounded-full bg-purple"
                      style={{ width: `${(sector.count / 41) * 100}%` }}
                    />
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Clienti */}
      <section className="border-b border-line-muted py-14">
        <div className="shell">
          <h2 className="text-center text-sm text-fg-muted">Alcune delle aziende con cui lavoriamo</h2>
        </div>
        <Marquee speed={55} pauseOnHover className="mask-fade-x mt-8" gap="4rem">
          {clients.map((name) => (
            <span
              key={name}
              className="text-xl font-semibold whitespace-nowrap text-fg-subtle transition-colors hover:text-fg"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </section>

      <CtaBand
        title="Il tuo progetto potrebbe essere il prossimo"
        subtitle="Raccontaci il processo che oggi vive su fogli di calcolo e telefonate: ti diciamo se e come conviene metterlo a sistema."
      />
    </>
  )
}
