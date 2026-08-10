import { services, faqs } from '../data/content'
import PageHeader from '../components/PageHeader'
import ServiceCard from '../components/ServiceCard'
import CtaBand from '../components/CtaBand'
import FaqList from '../components/FaqList'
import SectionHeading from '../components/ui/SectionHeading'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import ProcessSection from '../sections/ProcessSection'
import Integrations from '../sections/Integrations'

const compare = [
  {
    title: 'Software standard',
    tone: 'var(--color-fg-subtle)',
    points: [
      'Adatti i processi al software',
      'Funzioni che non userai mai',
      'Personalizzazioni solo se il fornitore le prevede',
      'Aggiornamenti quando decide qualcun altro',
      'Dati dentro un sistema di qualcun altro',
    ],
    good: false,
  },
  {
    title: 'Software LevelApp',
    tone: 'var(--color-success)',
    points: [
      'Il software segue i tuoi processi',
      'Solo le funzioni che servono davvero',
      'Evolutive quando servono a te',
      'Puoi far crescere il codice con chi vuoi',
      'Repository, dati e infrastruttura intestati a te',
    ],
    good: true,
  },
]

export default function Services() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Servizi' }]}
        eyebrow="Servizi"
        title="Costruiamo il software che la tua azienda userebbe ogni giorno — o quello che non esiste ancora"
        lead="Sei aree di lavoro, un solo modo di procedere: che si parta da un processo da sistemare o da un’idea da realizzare, in pochi giorni c’è un prototipo e in quattro settimane il software è in produzione."
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/contatti" variant="primary" size="lg" trailingIcon="arrowRight">
            Richiedi un'analisi
          </Button>
          <Button to="/progetti" variant="default" size="lg" icon="book">
            Guarda i progetti
          </Button>
        </div>
      </PageHeader>

      {/* Le aree di lavoro */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <RevealItem key={service.slug} className="flex">
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Standard vs su misura */}
      <section className="border-b border-line-muted py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            align="center"
            eyebrow="Quando conviene"
            title="Su misura non è sempre la risposta giusta"
            subtitle="Se un prodotto pronto copre l'80% dei tuoi processi te lo diciamo, e ti aiutiamo a sceglierlo. Il su misura serve quando il tuo modo di lavorare è un vantaggio da difendere."
            accent="var(--color-success)"
          />

          <RevealGroup className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
            {compare.map((column) => (
              <RevealItem key={column.title}>
                <div
                  className={`card h-full p-6 ${column.good ? 'card-accent' : ''}`}
                  style={{ '--accent': column.tone }}
                >
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: column.good ? 'var(--color-fg)' : 'var(--color-fg-muted)' }}
                  >
                    {column.title}
                  </h3>

                  <ul className="mt-5 space-y-3">
                    {column.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[15px]">
                        <span className="mt-0.5 shrink-0" style={{ color: column.tone }}>
                          <Icon name={column.good ? 'check' : 'chevronRight'} size={15} />
                        </span>
                        <span className={column.good ? 'text-fg' : 'text-fg-muted'}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-8 text-center">
            <p className="text-sm text-fg-muted">
              Non sei sicuro da che parte stai?{' '}
              <a href="#/contatti" className="text-accent hover:underline">
                Mezz'ora di call e lo capiamo insieme
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <ProcessSection />
      <Integrations />

      <section className="border-b border-line-muted py-20 md:py-28">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            eyebrow="Domande frequenti"
            title="Prima di scriverci"
            subtitle="Le risposte alle domande che arrivano più spesso su tempi, tecnologie e proprietà del codice."
          />
          <FaqList items={faqs} defaultOpen={0} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
