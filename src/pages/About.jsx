import { aboutStory, values, timeline, team, stack, company, stats } from '../data/content'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import ProcessSection from '../sections/ProcessSection'
import Counter from '../components/ui/Counter'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'

export default function About() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Azienda' }]}
        eyebrow="Chi siamo"
        title="Da due persone a una squadra, senza cambiare modo di lavorare"
        lead="Nata a Roma nel 2022 da due dipendenti, oggi una squadra di oltre 24 sviluppatori tra Roma e Milano al servizio di più di 70 clienti. Nessun commerciale: la prima persona con cui parli è quella che poi seguirà il progetto."
        aside={
          <Reveal delay={0.15}>
            <dl className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="card p-4">
                  <dd className="display text-3xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-1 text-xs text-fg-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        }
      />

      {/* Storia */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal>
            <h2 className="display text-3xl sm:text-4xl">Come siamo arrivati fin qui</h2>
            <p className="mt-4 text-fg-muted">
              Una software house nata da un fastidio preciso: vedere aziende sane piegare i propri
              processi a software che non le rappresentavano.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="space-y-5">
            {aboutStory.map((paragraph) => (
              <p key={paragraph} className="text-[17px] leading-relaxed text-fg-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Valori */}
      <section id="valori" className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          <SectionHeading
            align="center"
            eyebrow="Come lavoriamo"
            title="Quattro regole che non tradiamo a progetto in corso"
            accent="var(--color-success)"
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((value) => (
              <RevealItem key={value.title}>
                <article className="card card-hover flex h-full gap-4 p-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas text-success">
                    <Icon name={value.icon} size={18} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{value.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{value.body}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Tappe */}
      <section id="storia" className="border-b border-line-muted py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading eyebrow="Le tappe" title="Quattro anni, un passo alla volta" />

          <RevealGroup className="relative">
            {/* Filo verticale della timeline */}
            <div className="absolute top-2 bottom-2 left-[7px] w-px bg-line" aria-hidden="true" />

            <ol className="space-y-8">
              {timeline.map((entry) => (
                <RevealItem key={entry.year} as="li" className="relative pl-8">
                  <span className="absolute top-1.5 left-0 size-[15px] rounded-full border-2 border-accent bg-canvas" />
                  <p className="font-mono text-sm text-accent">{entry.year}</p>
                  <h3 className="mt-1 text-lg font-semibold">{entry.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{entry.body}</p>
                  {entry.link && (
                    <a
                      href={entry.link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                    >
                      {entry.link.label}
                      <Icon name="arrowUpRight" size={13} />
                    </a>
                  )}
                </RevealItem>
              ))}
            </ol>
          </RevealGroup>
        </div>
      </section>

      <ProcessSection />

      {/* Team */}
      <section id="team" className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          <SectionHeading
            align="center"
            eyebrow="Il team"
            title="Chi tocca il tuo progetto"
            subtitle="Squadre piccole e stabili: le stesse persone dall'analisi all'assistenza. TODO — sostituire con nomi, ruoli e foto reali."
            accent="var(--color-purple)"
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <RevealItem key={person.role}>
                <article className="card card-hover h-full p-6">
                  <span className="flex size-12 items-center justify-center rounded-full border border-line bg-canvas-overlay text-fg-muted">
                    <Icon name="users" size={18} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{person.role}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{person.name}</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-fg-subtle">{person.focus}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-8 text-center">
            <p className="text-sm text-fg-muted">
              Cerchiamo persone che sappiano parlare con i clienti, non solo con il compilatore.{' '}
              <a href={`mailto:${company.email}`} className="text-accent hover:underline">
                Scrivici
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Stack"
            title="Rust dove serve reggere, tecnologie diffuse per il resto"
            subtitle="Rust per i servizi che devono restare veloci e prevedibili sotto carico; attorno strumenti che qualsiasi software house saprebbe riprendere in mano. È la forma più concreta di non-lock-in."
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((group) => (
              <RevealItem key={group.group}>
                <div className="card h-full p-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-fg">
                    <Icon name="code" size={14} className="text-fg-muted" />
                    {group.group}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((tech) => (
                      <li key={tech} className="font-mono text-[13px] text-fg-muted">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Sedi */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Dove siamo"
            title="Roma e Milano, clienti in tutta Italia"
            subtitle="Lavoriamo in remoto ma veniamo in azienda quando serve: la fase di analisi si fa meglio guardando i processi dal vivo."
            accent="var(--color-orange)"
          />

          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {company.offices.map((office) => (
              <RevealItem key={office.city}>
                <div className="card h-full p-6">
                  <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-canvas text-orange">
                    <Icon name="pin" size={18} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{office.city}</h3>
                  <p className="mt-1 text-sm text-fg-muted">
                    {office.address}
                    <br />
                    {office.zip}
                  </p>
                </div>
              </RevealItem>
            ))}

            <RevealItem className="sm:col-span-2">
              <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
                <div>
                  <h3 className="text-base font-semibold">Vuoi conoscerci di persona?</h3>
                  <p className="mt-1 text-sm text-fg-muted">
                    Fissiamo mezz'ora in video o veniamo da te.
                  </p>
                </div>
                <Button to="/contatti" variant="primary" size="lg" trailingIcon="arrowRight">
                  Fissa un incontro
                </Button>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        title="Lavoriamo con poche aziende alla volta"
        subtitle="Se hai un progetto in mente, il momento giusto per parlarne è prima che diventi urgente."
      />
    </>
  )
}
