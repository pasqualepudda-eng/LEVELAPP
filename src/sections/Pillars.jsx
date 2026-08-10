import { pillars } from '../data/content'
import SectionHeading from '../components/ui/SectionHeading'
import Icon from '../components/ui/Icon'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'

/** Le tre promesse che ci distinguono da un prodotto preconfezionato. */
export default function Pillars() {
  return (
    <section id="perche" className="border-b border-line-muted py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Perché su misura"
          title="Tre differenze che si vedono dal secondo anno in poi"
          subtitle="Non è questione di funzioni: cambia chi possiede il software, chi può farlo evolvere e quanto regge negli anni di esercizio."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => (
            <RevealItem key={pillar.id}>
              <article
                className="card card-hover flex h-full flex-col overflow-hidden"
                style={{ '--accent': pillar.accent }}
              >
                <div className="accent-rule" />

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span
                      className="flex size-10 items-center justify-center rounded-lg border border-line bg-canvas"
                      style={{ color: pillar.accent }}
                    >
                      <Icon name={pillar.icon} size={18} />
                    </span>
                    <span className="font-mono text-sm text-fg-subtle">{pillar.index}</span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">{pillar.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-muted">
                    {pillar.body}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-line-muted pt-5">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-fg">
                        <Icon
                          name="check"
                          size={15}
                          className="mt-0.5 shrink-0"
                          style={{ color: pillar.accent }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
