import { aiFeatures, services, stats } from '../data/content'
import AiConsole from '../components/AiConsole'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Link } from '../lib/router'

/**
 * Sezione AI costruita come il blocco sicurezza di github.com: resta scura in
 * entrambi i temi (`.on-dark` riscrive i token della sola sezione), titolo e
 * azione al centro, la dimostrazione grande subito sotto, poi tre colonne di
 * approfondimento e due numeri di sintesi.
 */

const ai = services.find((service) => service.slug === 'ai')

// I numeri arrivano da `stats`: nessun dato inventato solo per questa sezione.
// TODO: come per il resto di `content.js`, sostituirli con i valori reali.
const figures = [
  stats.find((stat) => stat.label === 'Progetti rilasciati') ?? stats[0],
  stats.find((stat) => stat.label === 'Esperienza media senior') ?? stats[3],
]

export default function AiSection() {
  return (
    <section
      id="ai"
      className="on-dark relative overflow-hidden border-y border-line-muted py-20 md:py-28"
      style={{ '--accent': 'var(--color-success)' }}
    >
      <div className="hero-glow pointer-events-none absolute inset-x-0 -top-40 h-96 opacity-70" />
      <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-30" />

      <div className="shell relative">
        <Reveal as="p" className="flex items-center justify-center gap-2 text-sm font-semibold text-success">
          <span className="inline-block h-px w-6 bg-success" />
          AI applicata
        </Reveal>

        <Reveal as="h2" delay={0.05} className="display display-section mx-auto mt-5 max-w-4xl text-center">
          AI che lavora sui tuoi dati,
          <br />
          <span className="text-success">non su Internet</span>
        </Reveal>

        <Reveal
          as="p"
          delay={0.1}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-fg-muted"
        >
          Assistenti addestrati sulle tue procedure, sui tuoi listini e sul tuo archivio
          documentale, con gli stessi permessi del gestionale e la fonte citata in ogni risposta.
          L'innovazione che serve è quella che entra nei processi che hai già, non il progetto
          pilota che resta in una presentazione.
        </Reveal>

        <Reveal delay={0.14} className="mt-9 flex justify-center">
          <Button to="/servizi/ai" variant="marketing" size="xl" trailingIcon="arrowRight">
            Come funziona l'AI applicata
          </Button>
        </Reveal>

        {/* Dimostrazione */}
        <Reveal delay={0.1} y={36} className="relative mx-auto mt-14 max-w-3xl">
          <div className="spot-glow pointer-events-none absolute -inset-x-20 -top-12 bottom-0" />
          <AiConsole className="relative shadow-float" />
          <p className="mt-4 text-center text-xs text-fg-subtle">
            Elaborazione su infrastruttura europea · nessun addestramento sui tuoi dati
          </p>
        </Reveal>

        {/* Tre approfondimenti, come i tre "pilastri" della sezione sicurezza */}
        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-3" delay={0.05}>
          {ai.highlights.map((highlight, i) => (
            <RevealItem key={highlight.title}>
              <article className="card card-hover group relative flex h-full flex-col p-6">
                <span className="flex size-9 items-center justify-center rounded-lg border border-line bg-canvas text-success">
                  <Icon name={aiFeatures[i]?.icon ?? 'sparkle'} size={16} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-fg">{highlight.title}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-fg-muted">
                  {highlight.body}
                </p>
                <Link
                  to="/servizi/ai"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-success after:absolute after:inset-0"
                >
                  Approfondisci
                  <Icon
                    name="arrowRight"
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Due numeri, come la coppia di metriche in fondo al blocco */}
        <Reveal
          delay={0.1}
          className="mx-auto mt-14 grid max-w-3xl gap-8 border-t border-line-muted pt-10 sm:grid-cols-2 sm:gap-12"
        >
          {figures.map((figure) => (
            <div key={figure.label} className="text-center sm:text-left">
              <p className="display text-5xl text-fg">
                {figure.value}
                {figure.suffix}
              </p>
              <p className="mt-2 text-sm text-fg-muted">{figure.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
